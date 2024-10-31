import { Router } from 'express'
import { registerUser, loginUser, refreshAccessToken, logoutUser, getQuestions, submitQuiz, getAllUsers } from '../controller/usercontroller.js'

const userRouter = Router()

userRouter.route('/register').post(registerUser)
userRouter.route('/login').post(loginUser)
userRouter.route('/refresh').get(refreshAccessToken)
userRouter.route('/logout').post(logoutUser)
userRouter.route('/getQuestions').get(getQuestions)
userRouter.route('/quizSubmit/:userId').patch(submitQuiz)
userRouter.route('/getUsers').get(getAllUsers)

export default userRouter