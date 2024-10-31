import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema({
    category: {
        type: String
    },
    question: {
        type: String
    },
    option1: {
        type: String
    },
    option2: {
        type: String
    },
    option3: {
        type: String
    },
    option4: {
        type: String
    },
    score: {
        type: Number,
        default: 1
    },
    correctAns: {
        type: String
    }

})

export const Question = mongoose.model("questions", questionSchema)