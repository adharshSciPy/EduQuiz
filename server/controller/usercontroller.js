
import { User } from "../models/usermodel.js";
import { Admin } from "../models/adminmodel.js";
import { Question } from "../models/questionsmodel.js";
import jwt from "jsonwebtoken";
import { passwordValidator } from "../utils/passwordValidator.js";

// @POST
// user/register
// desc: API for creating new users
const registerUser = async (req, res) => {
    const { fullName, email, password, batch, date } = req.body;

    try {
        // Sanitizing inputs
        if (!fullName || !email || !password || !batch || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (!email.trim()) {
            return res.status(400).json({ message: "Email cannot be empty" });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validate password
        const isValidPassword = passwordValidator(password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, and one number",
            });
        }

        // Prevent duplicate accounts
        const existingUser = await User.findOne({ email });
        const existingAdmin = await Admin.findOne({ email });
        if (existingUser || existingAdmin) {
            return res.status(409).json({ message: "Email is already in use" });
        }

        // User creation
        const role = process.env.USER_ROLE || 'user'; // Default to 'user' if environment variable is not set
        const user = await User.create({ fullName, email, password, role, batch, date });
        const createdUser = await User.findById(user._id).select("-password");
        if (!createdUser) {
            return res.status(500).json({ message: "User registration failed" });
        }

        return res.status(201).json({ message: "User Registration Successful", data: createdUser });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(409).json({ message: "Email is already in use" });
        }
        console.error("Error during registration:", err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

// @POST
// user/login
// desc: Login API for user with credentials
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Sanitize and validate input
        if (!email?.trim() || !password?.trim()) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user
        const models = [User, Admin];
        let user = null;

        for (const model of models) {
            user = await model.findOne({ email });
            if (user) break;
        }

        if (!user) {
            return res.status(404).json({ message: "Email doesn't exist" });
        }

        // Check if the user has already logged in
        if (user.hasLoggedIn) {
            return res.status(403).json({ message: "You have already submitted." });
        }

        // Verify password
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        // // Mark user as logged in
        // user.hasLoggedIn = true;
        // await user.save();

        // Generate tokens
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        // Set refresh token in cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({ message: "Login successful", token: accessToken });
    } catch (err) {
        console.error("Error during login:", err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

// @POST
// user/refresh
// desc: To create new access token once it has expired
const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized API request" });
    }

    try {
        // Verify refresh token
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ message: "Refresh token expired. Please log in again." });
                }
                return res.status(403).json({ message: "Forbidden. Invalid token." });
            }

            let user;
            const role = Number(decoded.role);

            // Retrieve user based on role from decoded token
            if (!role) {
                return res.status(403).json({ message: "Forbidden. Invalid user role." });
            }

            const adminRole = Number(process.env.ADMIN_ROLE);
            const userRole = Number(process.env.USER_ROLE);

            switch (role) {
                case adminRole:
                    user = await Admin.findById(decoded.id);
                    break;
                case userRole:
                    user = await User.findById(decoded.id);
                    break;
                default:
                    return res.status(404).json({ message: "Invalid role" });
            }

            if (!user) {
                return res.status(404).json({ message: "Cannot find user" });
            }

            // Generate new access token
            const accessToken = await user.generateAccessToken();

            return res.status(200).json({ message: "User validation successful", data: accessToken });
        });

    } catch (err) {
        console.error("Error during token refresh:", err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

// @POST
// user/logout
// desc: To logout a user and clear cookies
const logoutUser = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;

        if (!refreshToken) {
            return res.status(204).json({ message: "No refresh token found" });
        }

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: "None",
        });

        return res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: `Internal Server Error: ${err.message}` });
    }
};

// @GET
// get the questions from admin
const getQuestions = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    try {
        // Pagination logic for quiz questions
        const totalQuestions = await Question.countDocuments({});
        const totalPages = Math.ceil(totalQuestions / limitNumber);
        const hasNextPage = pageNumber < totalPages;

        // Find questions with pagination
        const questions = await Question.find({})
            .select("question option1 option2 option3 option4")
            .skip(skip)
            .limit(limitNumber);

        if (questions.length === 0) {
            return res.status(404).json({ message: "No questions available" });
        }

        // Respond with question data and pagination info
        return res.status(200).json({
            message: "Questions fetched successfully",
            data: {
                questions,
                hasNextPage,
                total: totalQuestions,
                currentPage: pageNumber,
            },
        });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

// @POST
// user/submit-quiz
// desc: Submit quiz answers and calculate score
// @POST
// user/submit-quiz
// desc: Submit quiz answers and calculate score
const submitQuiz = async (req, res) => {
    try {
        const { userId } = req.params;
        const { answers, disqualified } = req.body;

        if (disqualified) {
            // Handle disqualified users
            const user = await User.findById(userId);
            if (user) {
                user.score = 0; // Optionally set score to 0
                user.performance = 'Disqualified'; // Mark performance as disqualified
                user.userStrength = null; // Optionally reset user strength
                user.hasLoggedIn = true;
                await user.save();
            } else {
                return res.status(404).json({ message: "User not found" });
            }

            // Respond with disqualified status
            return res.status(200).json({
                message: "Quiz submitted successfully",
                data: {
                    score: 0,
                    percentageScore: 0,
                    performance: 'Disqualified',
                    totalQuestions: 0,
                    evaluation: [],
                    userStrength: null
                }
            });
        }

        if (!answers || answers.length === 0) {
            return res.status(400).json({ message: "No answers submitted" });
        }

        // Find all questions
        const questionIds = answers.map(answer => answer.questionId);
        const questions = await Question.find({ _id: { $in: questionIds } });

        if (questions.length === 0) {
            return res.status(404).json({ message: "Questions not found" });
        }

        // Calculate score
        let score = 0;
        let technicalCorrect = 0;
        let nonTechnicalCorrect = 0;
        const totalQuestions = questions.length;

        const evaluation = questions.map(question => {
            const submittedAnswer = answers.find(answer => answer.questionId === question._id.toString());
            let isCorrect = false;
            let selectedOption = null;

            // Check if question was skipped
            if (!submittedAnswer || !submittedAnswer.selectedOption) {
                isCorrect = false;
            } else {
                selectedOption = submittedAnswer.selectedOption;
                isCorrect = question.correctAns === selectedOption;
                if (isCorrect) {
                    score += 1;
                    if (question.category === "Technical") {
                        technicalCorrect += 1;
                    } else if (question.category === "NonTechnical") {
                        nonTechnicalCorrect += 1;
                    }
                }
            }

            return {
                category: question.category,
                questionId: question._id.toString(),
                question: question.question,
                selectedOption: selectedOption, // Null for skipped questions
                correctAnswer: question.correctAns,
                isCorrect: isCorrect,
                isSkipped: !submittedAnswer || !submittedAnswer.selectedOption // Mark as skipped if no answer
            };
        });

        // Determine user's strength based on correct answers by category
        let strength = "Equal";
        if (technicalCorrect > nonTechnicalCorrect) {
            strength = "Technical";
        } else if (nonTechnicalCorrect > technicalCorrect) {
            strength = "NonTechnical";
        }

        // Convert the score to a percentage
        const percentageScore = (score / totalQuestions) * 100;

        // Classify the score based on the range
        let performance;
        if (percentageScore >= 80) {
            performance = 'High';
        } else if (percentageScore >= 50) {
            performance = 'Medium';
        } else if (percentageScore >= 30) {
            performance = 'Low';
        } else {
            performance = 'Very Low';
        }

        // Save score, performance, and strength in the user's record
        const user = await User.findById(userId);
        if (user) {
            user.score = score;
            user.performance = performance;
            user.userStrength = strength;
            user.hasLoggedIn = true;
            await user.save();
        } else {
            return res.status(404).json({ message: "User not found" });
        }

        // Respond with the score and detailed evaluation
        return res.status(200).json({
            message: "Quiz submitted successfully",
            data: {
                score,
                percentageScore,
                performance,
                totalQuestions,
                evaluation,
                userStrength: strength
            }
        });
    } catch (error) {
        console.error("Error submitting quiz:", error);
        return res.status(500).json({ message: `Internal Server Error: ${error.message}` });
    }
};

// get all  users
const getAllUsers = async (request, response) => {

    try {
        const userData = await User.find();
        response.status(200).json({ message: "userdata fetched succesfully", data: userData })

    } catch (error) {
        response.status(400).json({ message: `internal server error due to ${error}` })
    }
}

export {
    registerUser,
    loginUser,
    refreshAccessToken,
    logoutUser,
    getQuestions,
    submitQuiz,
    getAllUsers
};

