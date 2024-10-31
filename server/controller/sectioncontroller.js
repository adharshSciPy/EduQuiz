// import { Section } from "../models/sectionmodel.js";

// const sectionPost = async (req, res) => {
//     const { sectionName, date, questionType } = req.body;
//     try {
//         const newSection = await Section.create({
//             sectionName, date, questionType, Questions: []
//         })
//         res.status(200).json({ message: "Sections created successfully", data: newSection })

//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", err: error.message })
//     }
// }

// const questionsSection = async (req, res) => {
//     const { sectionId } = req.params;
//     const { question, answer, mark, questionCategory } = req.body;
//     console.log(sectionId)
//     try {
//         const result = await Section.findByIdAndUpdate(sectionId, {
//             $push: {
//                 Questions: [{
//                     question: req.body.question,
//                     answer: req.body.answer,
//                     mark: req.body.mark,
//                     questionCategory: req.body.questionCategory
//                 }]
//             }
//         }, { new: true })

//         res.status(200).json({ message: "Question added successfully", data: result })
//     }
//     catch (error) {
//         res.status(500).json({ message: "Internal Server Error ", err: error.message })
        
//     }
// }

// const McqSection = async (req, res) => {
//     const { sectionId } = req.params;
//     const { category, question, option1, option2, option3, option4, score, correctAns, questionCategory } = req.body
//     console.log(sectionId)
//     try {
//         const result = await Section.findByIdAndUpdate(sectionId, {
//             $push: {
//                 MCQ: [{
//                     category: req.body.category,
//                     question: req.body.question,
//                     option1: req.body.option1,
//                     option2: req.body.option2,
//                     option3: req.body.option3,
//                     option4: req.body.option4,
//                     score: req.body.score,
//                     correctAns: req.body.correctAns,
//                     questionCategory: req.body.questionCategory
//                 }]
//             }
//         }, { new: true })

//         res.status(200).json({ message: "Question added successfully", data: result })
//     }
//     catch (error) {
//         res.status(500).json({ message: "Internal Server Error", err: error.message })
//     }
// }

// const getSections = async (req, res) => {
//     try {
//         const sections = await Section.find();
//         res.status(200).json({ message: "Sections retrieved successfully", data: sections })
//     } catch (error) {
//         res.status(500).json({ message: "Internal Server Error", err: error.message })
//     }
// }

// const deleteSections = async (req, res) => {
//     const { sectionId } = req.params;
//     try {
//         const deletedSection = await Section.findByIdAndDelete(sectionId);
//         res.status(200).json({ message: "Section deleted successfully", data: deletedSection })
//     } catch (error) {
//         res.status(500).json({ message: "Internal server error due to", err: error.message })
//     }
// }

// export { sectionPost, questionsSection, getSections, McqSection, deleteSections }