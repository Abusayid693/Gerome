import mongoose, { Model, Schema } from "mongoose"
import bcrypt from "bcryptjs"

interface IUser {
    username: string;
    email: string;
    password: string;
    resetPasswordToken: string;
    resetPasswordExpire: string;
}

const UserSchema: Schema = new Schema<IUser>({
    username: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: true,
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minlength: 6,
        select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified["password"])
        next()
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

export const User = mongoose.model("User", UserSchema)

