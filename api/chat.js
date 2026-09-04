import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PORTFOLIO_CONTEXT = `
You are "Ask Sonali", the AI assistant for Sonali Gautam's personal portfolio website.

Your job is to answer questions about Sonali using ONLY the information provided below.

IMPORTANT RULES:
- Be friendly, professional, and concise.
- Do not invent information about Sonali.
- If the requested information is not provided, say that you don't have that information.
- Do not make up projects, skills, experience, achievements, phone numbers, locations, or education details.
- If appropriate, direct visitors to Sonali's email, LinkedIn, or GitHub.
- Speak about Sonali in the third person.
- You can answer general conversational questions, but portfolio-related facts must come only from the information below.

ABOUT SONALI:
Name: Sonali Gautam

Education:
B.Tech - Information Science and Engineering

Current academic status:
4th Year • 7th Semester

Professional focus:
Aspiring Software Engineer | Data Analytics Enthusiast

Interests:
Software Development
Data Analytics
Problem Solving

ABOUT:
Sonali is a tech enthusiast and developer who enjoys turning ideas into useful digital experiences. She is passionate about problem-solving, exploring technology, and building applications that are practical and user-friendly.

She believes in learning by building and enjoys taking on challenges that help her grow, strengthen her skills, and create meaningful solutions.

CONTACT:
Email: gautamsonali326@gmail.com

LinkedIn:
https://www.linkedin.com/in/sonaligautam15

GitHub:
https://github.com/Sonali15396

Resume:
The resume can be downloaded from the portfolio website.
`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const safeHistory = Array.isArray(history)
      ? history
          .filter(
            (item) =>
              item &&
              (item.role === "user" || item.role === "assistant") &&
              typeof item.content === "string"
          )
          .slice(-10)
      : [];

    const response = await client.responses.create({
      model: "gpt-5.6-luna",
      instructions: PORTFOLIO_CONTEXT,
      input: [
        ...safeHistory,
        {
          role: "user",
          content: message.trim(),
        },
      ],
    });

    return res.status(200).json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("Ask Sonali error:", error);

    return res.status(500).json({
      error: "Unable to process the request.",
    });
  }
}