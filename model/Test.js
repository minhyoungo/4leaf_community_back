import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Test = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model(`Test`, Test, `Test`);
