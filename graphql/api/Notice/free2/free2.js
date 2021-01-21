import mongoose from "mongoose";
import Free2 from "../../../model/Free2";
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

    getFree2Detail: async (_, args) => {
      const { id } = args;

      console.log(id);
      try {
        const result = await Free2.findOne({ _id: id });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    getFree2BeforeId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Free2.findOne({
          _id: { $gt: id },
        })
          .sort({
            createdAt: 1,
          })
          .limit(1);

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },

    getFree2NextId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Free2.findOne({
          _id: { $lt: id },
        })
          .sort({
            createdAt: -1,
          })
          .limit(1);

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    getFree2TotalPage: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Free2.find({
          title: { $regex: `.*${searchValue}.*` },
        }).sort({
          createdAt: -1,
        });

        const cnt = result.length;

        const realTotalPage = cnt % limit > 0 ? cnt / limit + 1 : cnt / limit;

        return parseInt(realTotalPage);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },

    getFree2TotalPageOnlyCnt: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Free2.find({
          title: { $regex: `.*${searchValue}.*` },
        }).sort({
          createdAt: -1,
        });

        const cnt = result.length;
        console.log(result);
        return parseInt(cnt);
      } catch (e) {
        console.log(e);
        return 0;
      }
    },
  },
  Mutation: {
    createFree2: async (_, args) => {
      const { title, description, author } = args;
      try {
        const current = await CURRENT_TIME();
        const user = mongoose.Types.ObjectId(author);
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
  },
};
