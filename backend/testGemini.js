require("dotenv").config();

const { generateQuestions } = require("./services/geminiService");

(async () => {
  try {
    console.log("Starting Gemini test...");

    const result = await generateQuestions(
      "Frontend Developer",
      "React, JavaScript",
      "Intermediate"
    );

    console.log("RESULT:");
    console.log(result);
  } catch (err) {
    console.error("ERROR:");
    console.error(err);
  }
})();