import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Free1 = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createdAt: {
      type: String,
      required: true,
    },
    author: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { versionKey: false }
);

export default mongoose.model(`Free1`, Free1, `Free1`);
