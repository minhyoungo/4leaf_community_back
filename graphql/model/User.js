import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    // notice: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Notice",
    //   },
    // ],
    userName: {
      type: String,
      required: true,
    },
    nickName: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    secretCode: {
      type: String,
      required: true,
      default: "-",
    },
  },
  { versionKey: false }
);

export default mongoose.model(`User`, User, `User`);
