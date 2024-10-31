// import { mongoose, Schema } from "mongoose";

// const McqSchema = new Schema({
//     category: {
//         type: String
//     },
//     question: {
//         type: String
//     },
//     option1: {
//         type: String
//     },
//     option2: {
//         type: String
//     },
//     option3: {
//         type: String
//     },
//     option4: {
//         type: String
//     },
//     score: {
//         type: Number,
//         default: 1
//     },
//     correctAns: {
//         type: String
//     }

// })

// const ShortSchema = new Schema({
//     question: {
//         type: String
//     },
//     answer: {
//         type: String
//     },
//     mark: {
//         type: Number
//     },
//     questionCategory: {
//         type: String
//     }
// })

// const SectionSchema = new Schema({
//     sectionName: {
//         type: String
//     },
//     date: {
//         type: String
//     },
//     questionType: {
//         type: String
//     },
//     Questions: [ShortSchema],
//     MCQ: [McqSchema]

// })


// export const Section = mongoose.model("Section", SectionSchema);