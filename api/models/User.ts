import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import mongoose, {Schema} from 'mongoose';

interface IUser {
  username: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
}

const UserSchema: Schema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, 'Username is required']
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'Please fill a valid email address'
      ]
    },
    password: {
      type: String,
      required: [true, 'Please enter the password'],
      minlength: 6,
      select: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
  },
  {
    timestamps: true
  }
);

// Auto save
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this?.password);
};

// Need the manually save the changes
UserSchema.methods.getResetToken = async function () {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

export const User = mongoose.model('User', UserSchema);
