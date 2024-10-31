import { Question } from "../models/questionsmodel.js";

const questionPost = async (req, res) => {
    const { category, question, option1, option2, option3, option4, score, correctAns } = req.body
    try {
        const result = await Question.create({
            category, question, option1, option2, option3, option4, score, correctAns
        })
        res.status(200).json({ message: "Questions created successfully", data: result })


    } catch (error) {
        res.status(400).json({ message: `Internal server error due to ${error}` })
    }
}

const questionsGet = async (req, res) => {
    try {
        const getQuestions = await Question.find();
        res.status(200).json({ message: "Questions fetched successfully", data: getQuestions })
    } catch (error) {
        res.status(500).json({ message: `Internal server error due to ${error}` })
    }
}

const deleteQuestions = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedQuestions = await Question.findByIdAndDelete(id);
        res.status(200).json({ message: "Questions deleted successfully", data: deletedQuestions })
    } catch (error) {
        res.status(400).json({ message: `Internal server error due to ${error}` })
    }
}

export {
    questionPost, questionsGet, deleteQuestions
}