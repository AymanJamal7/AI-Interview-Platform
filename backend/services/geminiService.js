const {GoogleGenAI} = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

const generateQuestions = async (
    role,
    skills,
    difficulty
) => {
    const prompt = `
    Generate exactly 10 interview questions.
    Role: ${role}
    Skills: ${skills}
    Difficulty: ${difficulty}
    
    Return ONLY valid JSON in this format:
    
    [
        {
            "question": "What is React Virtual DOM?",
            "category": "Technical"
        }
    ]
    `;

    const response =
        await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });
    console.log(response);
    return response.text; 
};

const evaluateAnswer = async (
  question,
  answer
) => {

  const prompt = `
You are a strict senior technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Scoring Rules:
- Empty answer = 0/10
- One sentence answer = 1-4/10
- Partially correct answer = 5-7/10
- Good answer = 8-9/10
- Excellent detailed answer = 10/10

Return ONLY valid JSON.

{
  "score":"8/10",
  "feedback":"Detailed feedback here",
  "idealAnswer":"Ideal answer here"
}
`;

  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

  return response.text;
};

module.exports= {generateQuestions, evaluateAnswer};