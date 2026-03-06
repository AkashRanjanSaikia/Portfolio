import dotenv from "dotenv";

dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const embeddingModel = genAI.getGenerativeModel({
  model: "gemini-embedding-001",
});
// Pinecone query
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY,
});

const index = pinecone.index(process.env.PINECONE_INDEX_NAME);

export async function getAns(message, history = [], currentSummary = "") {
  // Embed user question
  const embeddingResponse = await embeddingModel.embedContent(message);
  const queryEmbedding = embeddingResponse.embedding.values;

  const queryResponse = await index.query({
    vector: queryEmbedding,
    topK: 3,
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

  console.log(context);

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

Your role is to help visitors learn about Akash's background, skills, projects, education, and experience.

Guidelines:
- Be polite, friendly, and professional.
- Keep answers SHORT, clear, and factual.
- Do not exaggerate or use promotional language.
- Do not repeat the question.

Conversation Handling:
- If the user greets you, greet them politely and offer help.
- If the user thanks you, respond politely.

Information Rules:
- Use ONLY the retrieved context below as the main source.
- You may also use the conversation summary or recent history if relevant.
- Do NOT invent or assume information.

Fallback:
- If the question is unrelated to Akash or his portfolio, respond:
"Sorry, I'm just a portfolio assistant and can't answer that. Please ask something related to Akash Ranjan Saikia's projects, skills, or experience."
- If the question is about Akash but the information is not available in the provided context:
"Sorry, I am not aware of the answer to that question."

Example Q&A:
Q: Who is Akash Ranjan Saikia?
A: Akash Ranjan Saikia is a 3rd-year B.Tech Computer Science student and full-stack developer focused on backend development, scalable web applications, and Generative AI.

Q: What technologies does Akash use?
A: He works with React.js, Node.js, Express, MongoDB, Python, and also builds RAG applications using LLMs like Gemini and tools such as Pinecone.

Conversation Summary:
${currentSummary || "None"}

Recent Conversation:
${historyText || "None"}

Context:
${context}

User Question:
${message}

Answer:
`;

  const result = await chatModel.generateContent(prompt);
  const answer = result.response.text();

  // Generate a new summary if needed (e.g., after every 4 user messages)
  let newSummary = currentSummary;
  try {
    const userMessageCount = history.filter(msg => msg.sender === 'user').length;
    if (userMessageCount > 0 && userMessageCount % 4 === 0) {
      const summaryPrompt = `
Summarize the following conversation history and the previous summary into a single, very short paragraph (max 2 sentences).
Focus on what the user has asked so far and what they are interested in.

Previous Summary: ${currentSummary}
Recent History: ${historyText}
New User Message: ${message}
New Assistant Answer: ${answer}

New Summary:
`;
      console.log("creating summery");
      const summaryResult = await chatModel.generateContent(summaryPrompt);
      newSummary = summaryResult.response.text().trim();
    }
  } catch (summaryError) {
    console.error("Error generating summary:", summaryError);
    
  }

  return { answer, summary: newSummary };
}
