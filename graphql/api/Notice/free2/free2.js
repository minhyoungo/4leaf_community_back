import mongoose from "mongoose";
import Free2 from "../../../../model/Free2";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
  Query: {
    getFree2: async (_, args) => {
      try {
        const result = await Free2.find({}, {});
        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
  Mutation: {
    createFree2: async (_, args) => {
      const { title, description, userId } = args;
      try {
        const current = await CURRENT_TIME();
        const user = mongoose.Types.ObjectId(userId);
        const result = await Free2.create({
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
    deleteFree2: async (_, args) => {
      const { id } = args;
      try {
        const result = await Free2.deleteOne({ _id: id });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    updateFree2: async (_, args) => {
      const { id, title, description } = args;
      try {
        const result = await Free2.updateOne(
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
