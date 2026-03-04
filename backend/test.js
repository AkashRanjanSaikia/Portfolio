import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

export async function getAns(message, history = [], currentSummary = "") {
  console.log(message, history, currentSummary);

  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

  const embeddingModel = genAI.getGenerativeModel({
    model: "gemini-embedding-001",
  });

  // Embed user question
  const embeddingResponse = await embeddingModel.embedContent(message);
  const queryEmbedding = embeddingResponse.embedding.values;

  // Pinecone query
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 5,
    includeMetadata: true,
  });

  const matches = queryResponse.matches;

  if (!matches || matches.length === 0) {
    return {
      answer: "No relevant information found in the document.",
      summary: currentSummary,
    };
  }

  // Build context from retrieved chunks
  const context = matches.map((match) => match.metadata.text).join("\n\n");

  // Generate final answer using Gemini
  const chatModel = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  // Format history for prompt
  const historyText = history
    .slice(-4)
    .map(
      (msg) => `${msg.sender === "user" ? "User" : "Assistant"}: ${msg.text}`,
    )
    .join("\n");

  const prompt = `
You are the AI assistant for Akash Ranjan Saikia's portfolio website.

Your job is to help visitors learn about Akash's background, skills, projects, education, and experience.

Behavior Guidelines:
- Be polite, friendly, and professional.
- Keep responses SHORT, clear, and concise.
- Avoid repeating the question in the answer.

Conversation Handling:
- If the user greets you (hi, hello, good morning, etc.), greet them politely and offer help.
- If the user thanks you, respond politely.

Information Rules:
- Use the **retrieved context below as the primary source of information**.
- You may also use the **conversation summary and recent conversation history** if they contain relevant information needed to answer the user's question.
- Do NOT use outside knowledge or assumptions.
- Do NOT fabricate or guess information.
- If the answer is not present in the context, summary, or history, respond with:
  "Sorry, I am not aware of the answer to that question."

Conversation Summary so far:
${currentSummary || "No summary yet."}

Recent Conversation History:
${historyText || "No recent history."}

Context:
${context}

User Question:
${message}

Answer:
`;

  const result = await chatModel.generateContent(prompt);
  const answer = result.response.text();

  // Generate a new summary if needed (e.g., after every few messages)
  let newSummary = currentSummary;
  try {
    if (history.length >= 2) {
      const summaryPrompt = `
Summarize the following conversation history and the previous summary into a single, very short paragraph (max 2 sentences).
Focus on what the user has asked so far and what they are interested in.

Previous Summary: ${currentSummary}
Recent History: ${historyText}
New User Message: ${message}
New Assistant Answer: ${answer}

New Summary:
`;
      const summaryResult = await chatModel.generateContent(summaryPrompt);
      newSummary = summaryResult.response.text().trim();
    }
  } catch (summaryError) {
    console.error("Error generating summary:", summaryError);
    // Keep the old summary if generation fails
  }

  return { answer, summary: newSummary };
}
