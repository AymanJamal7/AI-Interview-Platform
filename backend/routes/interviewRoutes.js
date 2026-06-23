const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createInterview, getInterviews, getQuestionsBySession, getAnalytics, evaluateInterviewAnswer, deleteInterview
} = require("../controllers/interviewController");

/**
 * @swagger
 * /api/interview/generate:
 *   post:
 *     summary: Generate AI interview questions
 *     tags:
 *       - Interview
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *                 example: Frontend Developer
 *               skills:
 *                 type: string
 *                 example: React, JavaScript, Node.js
 *               difficulty:
 *                 type: string
 *                 example: Intermediate
 *     responses:
 *       201:
 *         description: Interview generated successfully
 */
router.post("/generate",authMiddleware, createInterview);

/**
 * @swagger
 * /api/interview/analytics:
 *  get:
 *     summary: Get interview analytics
 *     tags:
 *       - Interview
 *     responses:
 *       200:
 *         description: Analytics data
 */
router.get("/analytics",authMiddleware, getAnalytics);


/**
 * @swagger
 * /api/interview/evaluate:
 *   post:
 *     summary: Evaluate answer using Gemini AI
 *     tags:
 *       - Interview
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionId:
 *                 type: integer
 *               question:
 *                 type: string
 *               answer:
 *                 type: string
 *             example:
 *               sessionId: 1
 *               question: "What is React Virtual DOM?"
 *               answer: "Virtual DOM is a lightweight copy of the real DOM used by React."
 *     responses:
 *       200:
 *         description: Evaluation successful
 */
router.post(
  "/evaluate",
  authMiddleware,
  evaluateInterviewAnswer
);


/**
 * @swagger
 * /api/interview:
 *   get:
 *     summary: Get all interview sessions
 *     tags:
 *       - Interview
 *     responses:
 *       200:
 *         description: List of interview sessions
 */
router.get("/", authMiddleware, getInterviews);

/**
 * @swagger
 * /api/interview/{id}:
 *   delete:
 *    summary: Delete an interview session
 *    tags:
 *      - Interview
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Interview deleted successfully
 */
router.delete("/:id", authMiddleware, deleteInterview);

/**
 * @swagger
 * /api/interview/{id}:
 *   get:
 *     summary: Get questions for a specific interview session
 *     tags:
 *       - Interview
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of questions for the interview session
 */
router.get("/:id/questions", authMiddleware, getQuestionsBySession);

module.exports = router;