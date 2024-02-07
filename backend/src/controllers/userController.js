import { asyncHandler } from "../middleswares/asyncHandler.js";
import { User } from "../models/userSchema.js";
import ErrorHandler, { errorMiddleware } from "../middleswares/error.js";
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

export const login = asyncHandler(async (req,res,next) => {
  const {
    email,
    password,
    role,
  } = req.body;

  if(!email || !password || !role){
    return next(new ErrorHandler("Please fill all fields.",400))
  }
  const user = await User.findOne({ email }).select("+password")
  if((!user)){
    return new ErrorHandler("Invalid Email or Password", 400);
  }

  const isPasswordMatched = await user.comparePassword(password);

  if(!isPasswordMatched){
    return new ErrorHandler("Invalid Emial or Password",400)
  }

  if(user.role !== role){
    return new ErrorHandler("user with this role not exist",400)
  }

  sendToken(user, 200, res, "User logged in successfully")
});

export const logout = asyncHandler(async (req,res, next) => {
  res.status(201).cookie("token", "",{
    httpOnly: true,
    expires: new Date(Date.now()),
  })
  .json({
    success: true,
    message: "Use logged out successfully"
  })
})