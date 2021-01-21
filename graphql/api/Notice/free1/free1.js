import mongoose from "mongoose";
import Free1 from "../../../model/Free1";
import { CURRENT_TIME } from "../../../../utils/commonUtils";

export default {
  Query: {
    getAllFree1: async (_, args) => {
      const { searchValue, limit, currentPage } = args;
      try {
        const result = await Free1.find({
          // $or: [
          //   { title: { $sregx: `.*${search}.*` } },
          //   { description: { $sregx: `.*${searchValue}.*` } },
          // ],
        })
          .sort({
            createdAt: -1,
          })
          .limit(limit)
          .skip(currentPage * limit);

        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
    getFree1BoardDetail: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Notice.findOne({
          _id: id,
        });

        return result;
      } catch (e) {
        console.log(e);
        return {};
      }
    },
    getFree1BoardBeforeId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Free1.findOne({
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

    getFree1BoardNextId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Free1.findOne({
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
    getFree1BoardTotalPage: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Free1.find({
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

    getFree1BoardTotalPageOnlyCnt: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Free1.find({
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
  },
};
