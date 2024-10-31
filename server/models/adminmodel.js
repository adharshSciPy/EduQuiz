import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import mongoose, { Schema } from "mongoose";
const defaultRole = process.env.ADMIN_ROLE
const adminSchema = new Schema({
    fullName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: defaultRole
    }
}, { timestamps: true })


// hashing admin password

adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
})

//generate access token
adminSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            fullName: this.firstName,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    )
}

// generate refresh token
adminSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// matching admin password
adminSchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password);
    }
    next();

}

export const Admin = mongoose.model("admin", adminSchema)