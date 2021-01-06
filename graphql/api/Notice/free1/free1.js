import mongoose from "mongoose";
import Free1 from "../../../../model/Free1";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
  Query: {
    getFree1: async (_, args) => {
      try {
        const result = await Free1.find({}, {});
        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
  Mutation: {
    createFree1: async (_, args) => {
      const { title, description, userId } = args;
      try {
        const current = await CURRENT_TIME();
        const user = mongoose.Types.ObjectId(userId);
        const result = await Free1.create({
          title,
          description,
          author: user,
          createdAt: current,
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    deleteFree1: async (_, args) => {
      const { id } = args;
      try {
        const result = await Free1.deleteOne({ _id: id });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    updateFree1: async (_, args) => {
      const { id, title, description } = args;
      try {
        const result = await Free1.updateOne(
          { _id: id },
          {
            $set: {
              title,
              description,
            },
          }
        );
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
