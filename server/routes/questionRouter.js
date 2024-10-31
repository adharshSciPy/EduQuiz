import { Router } from "express"
import { questionPost, questionsGet, deleteQuestions } from "../controller/questioncontroller.js";

const questionRouter = Router()

questionRouter.route("/createquestions").post(questionPost)
questionRouter.route("/getquestions").get(questionsGet)
questionRouter.route("/deletequestions/:id").delete(deleteQuestions)



export default questionRouter