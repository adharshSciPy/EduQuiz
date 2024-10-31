import { Admin } from '../models/adminmodel.js'
import { passwordValidator } from '../utils/passwordValidator.js';

// POST /admin/register

const registerAdmin = async (req, res) => {
    const { fullName, email, password } = req.body

    try {
        const isEmptyFields = [fullName, email, password].some(
            (field) => field.trim() === '' || field === undefined
        );
        if (isEmptyFields) {
            return res.status(401).json({ message: 'Please fill in all fields' });
        }

        const isValidPassword = passwordValidator(password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }

        const existingAdmin = await Admin.findOne({ email: email });
        if (existingAdmin) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const role = process.env.ADMIN_ROLE;
        const admin = await Admin.create({
            fullName,
            email,
            password,
            role
        })

        const createdAdmin = await Admin.findOne({ _id: admin._id }).select("-password")
        if (!createdAdmin) {
            return res.status(500).json({ message: 'Admin Registeration Failed' })
        }

        res.status(200).json({ message: 'Admin registered successfully', data: createdAdmin })

    } catch (error) {
        return res.error(500).json({ message: `Internal server error due to ${error.message}` })
    }
}

// POST /admin/login
const adminlogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const isEmptyField = [email, password].some(
            (field) => field.trim() === '' || field === undefined
        )
        if (isEmptyField) {
            return res.status(401).json({ message: 'All fields required    ' });
        }
        const admin = await Admin.findOne({ email: email });
        if (!admin) {
            return res.status(401).json({ message: 'Admin Doesnt exist' });
        }
        const isPasswordCorrect = await admin.isPasswordCorrect(password)
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Incorrect Password' });
        }
        //generate access token
        const accessToken = await admin.generateAccessToken();

        //generate refresh token
        const refreshToken = await admin.generateRefreshToken();
        //store refresh token in cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: false, // when going to production change boolean to true
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({ message: "Admin Login Successfull", token: accessToken })
    } catch (error) {
        return res.status(500).json({ message: `Internal server due to ${error.message}` })
    }
}

//admin logout

const adminlogout = async (req, res) => {
    try {
        const { refreshToken } = req.cookies;
        if (!refreshToken) {
            return res.status(204).json({ message: "Invalid Cookie" })
        }
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,//Secure only in production
            sameSite: "None"
        })
        return res.status(200).json({ message: "Logout Successfully" })
    } catch (error) {
        return res.status(500).json({ message: `Internal server error due to ${error.message}` })
    }
}

export {
    registerAdmin, adminlogin, adminlogout
}