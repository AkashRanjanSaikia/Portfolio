import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { rateLimit } from 'express-rate-limit'
import { getAns } from './test.js'


const app = express();

const minitlimiter = rateLimit({
	windowMs: 60 * 1000, // 1 minute
	max: 5, // Limit each IP to 5 requests per `window` (here, per 1 minute)
    message: { error: 'Too many requests, please try again after a minute.' },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
const hourLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // 20 requests per hour
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again after an hour.' },
});
app.use(
  cors({
    origin: `${process.env.Frontend_URL}`
  })
);
app.use(express.json());

const predefinedAnswers = {
    'q1': "Akash Ranjan Saikia is a 3rd-year B.Tech Computer Science student and Full-Stack Developer focused on backend development, scalable web applications, and Generative AI.",
    'q2': "His core technical skills include React.js, Node.js, Express, MongoDB, and Python. He also works with Large Language Models such as Gemini and tools like Pinecone to build RAG-based applications and AI agents.",
    'q3': "Akash has worked on several projects, including VideoMeet, a real-time video meeting website; CozyStay, a hotel booking platform; and PDFChat, a RAG-based PDF question-answering system. You can explore more about these projects in the Projects section.",
    'q4': "You can reach out to Akash via email at akashranjansaikia21@gmail.com or through his LinkedIn profile linked in the contact section."
};


app.post('/api/chat', hourLimiter , minitlimiter , async (req, res) => {
    try {
        const { message, questionId, history, summary } = req.body;
        
        // Check if it's a predefined question
        if (questionId && predefinedAnswers[questionId]) {
            return res.json({ answer: predefinedAnswers[questionId], summary });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        const { answer, summary: newSummary } = await getAns(message, history, summary);
        res.json({ answer, summary: newSummary });
    } catch (error) {
        console.error('Error in /api/chat:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/health', (req, res) => {
    res.json({ message: 'Server is healthy' });
});


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});