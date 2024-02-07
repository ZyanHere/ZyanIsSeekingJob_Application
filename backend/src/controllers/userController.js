import { asyncHandler } from "../middleswares/asyncHandler.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middleswares/error.js";
import { sendToken } from "../utils/jwtTokens.js";


export const register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  sendToken(
    user,
    200,
    res,
    "User registered successfully"
  )
});
