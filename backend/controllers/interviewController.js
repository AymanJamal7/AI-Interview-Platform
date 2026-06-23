const pool = require("../db");
const {
  generateQuestions, evaluateAnswer
} = require("../services/geminiService");

const createInterview = async (req, res) => {
  try {
    const { role, skills, difficulty } = req.body;
    const userId = req.user.id;
    const session = await pool.query(
      `
      INSERT INTO interview_sessions
      (role, skills, difficulty, user_id)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [role, skills, difficulty, userId]
    );

    const questionsRaw =
      await generateQuestions(
        role,
        skills,
        difficulty
      );

    const cleaned =
      questionsRaw.replace(/```json|```/g, "");

    const questions = JSON.parse(cleaned);

    for (const q of questions) {
      await pool.query(
        `
        INSERT INTO generated_questions
        (session_id, question, category)
        VALUES ($1,$2,$3)
        `,
        [
          session.rows[0].id,
          q.question,
          q.category,
        ]
      );
    }

    res.status(201).json({
      session: session.rows[0],
      questions,
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

const getInterviews = async (req, res) => {
    const userId = req.user.id;
    try{
        const result = await pool.query(
            `
            SELECT *
            FROM interview_sessions
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
            [userId]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
};

const getQuestionsBySession = async (req,res) => {
    try{
        const { id } = req.params;
        const result = await pool.query(
            `
            SELECT *
            FROM generated_questions
            WHERE session_id = $1
            ORDER BY id
            `,
            [id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message,
        });
    }
};

const getAnalytics = async (req, res) => {
    const userId = req.user.id;
  try {
    const interviews = await pool.query(
      "SELECT COUNT(*) FROM interview_sessions WHERE user_id = $1",
      [userId]
    );

    const questions = await pool.query(
      "SELECT COUNT(*) FROM generated_questions WHERE session_id IN (SELECT id FROM interview_sessions WHERE user_id = $1)",
      [userId]
    );

    const topRole = await pool.query(`
      SELECT role, COUNT(*) as count
      FROM interview_sessions
      WHERE user_id = $1
      GROUP BY role
      ORDER BY count DESC
      LIMIT 1
    `, [userId]);

    res.json({
      totalInterviews:
        interviews.rows[0].count,

      totalQuestions:
        questions.rows[0].count,

      mostUsedRole:
        topRole.rows[0]?.role || "N/A",
    });

  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

const evaluateInterviewAnswer =
  async (req, res) => {

  try {

    const {
      sessionId,
      question,
      answer,
    } = req.body;

     if (!answer || !answer.trim()) {
      return res.status(400).json({
        error: "Answer cannot be empty",
      });
    }

    const result =
      await evaluateAnswer(
        question,
        answer
      );

    const cleaned =
      result.replace(
        /```json|```/g,
        ""
      );

    const parsed =
      JSON.parse(cleaned);

    await pool.query(
      `
      INSERT INTO answer_feedback
      (
        session_id,
        question,
        answer,
        score,
        feedback,
        ideal_answer
      )
      VALUES
      ($1,$2,$3,$4,$5,$6)
      `,
      [
        sessionId,
        question,
        answer,
        parsed.score,
        parsed.feedback,
        parsed.idealAnswer,
      ]
    );

    res.json(parsed);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: err.message,
    });

  }
};

const deleteInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Delete feedback first
    await pool.query(
      "DELETE FROM answer_feedback WHERE session_id = $1",
      [id]
    );

    // Delete generated questions
    await pool.query(
      "DELETE FROM generated_questions WHERE session_id = $1",
      [id]
    );

    // Delete interview session
    await pool.query(
      "DELETE FROM interview_sessions WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    res.json({
      message: "Interview deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  createInterview, getInterviews, getQuestionsBySession, getAnalytics, evaluateInterviewAnswer, deleteInterview
};