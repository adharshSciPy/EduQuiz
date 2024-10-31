import { mongoose, Schema } from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const defaultRole = process.env.USER_ROLE
const userSchema = new Schema({
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
    },
    hasLoggedIn: {
        type: Boolean,
        default: false
    },
    score: {
        type: Number
    },
    performance: {
        type: String
    },
    userStrength: {
        type: String
    },
    batch:{
        type:String
    },
    date:{
        type:String
    }

}, { timestamps: true })

//hashing password
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, 10)
        next();
    } catch (error) {
        return next(error)
    }

})

//generate access token
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            fullName: this.fullName,
            email: this.email,
            role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '7d' }
    )
}

// generate refresh token
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            email: this.email,
            role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '7d' }
    );
}

// matching admin password
userSchema.methods.isPasswordCorrect = async function (password) {
    if (password) {
        return await bcrypt.compare(password, this.password)
    }
    next()
}

export const User = mongoose.model("user", userSchema)