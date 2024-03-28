import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { signinSchema, signupSchema } from "../validations/auth";

export const signup = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((item) => item.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      messages,
    });
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      messages: ["Email đã tồn tại"],
    });
  }

  const hashedPassword = await bcryptjs.hash(password, 12);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";

  const user = await User.create({
    ...req.body,
    password: hashedPassword,
    role,
  });

  return res.status(StatusCodes.CREATED).json({
    user,
  });
};
export const signin = async (req, res) => {
  const { email, password } = req.body;

  //B1: Validate: email, password
  const { error } = signinSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((err) => err.message);
    return res.status(400).json({
      message: errors,
    });
  }
  // Check xem có email có trong database
  const checkUser = await User.findOne({ email });
  if (!checkUser) {
    return res.status(404).json({
      message: "email hoặc password không đúng",
    });
  }
  // So sánh password: bcryptjs
  const checkPassword = await bcryptjs.compare(password, checkUser.password);
  if (!checkPassword) {
    return res.status(404).json({
      message: "email hoặc password không đúng",
    });
  }
  // Mã hóa token
  const token = jwt.sign({ id: checkUser._id }, "khoa-bi-mat", {
    expiresIn: "1h",
  });

  // Trả về thông tin User và Token
  res.status(200).json({
    message: "Login Successfuly ",
    user: { ...checkUser.toObject(), password: undefined },
    token,
  });
};
export const logout = async (req, res) => {};
