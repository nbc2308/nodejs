import mongoose, { Schema } from "mongoose";

const categoryShema = new Schema(
  {
    name: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", categoryShema);
