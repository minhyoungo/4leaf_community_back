import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Popular = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export default mongoose.model(`Popular`, Popular, `Popular`);
