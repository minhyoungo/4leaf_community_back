import Notice from "../../../model/Notice";
import mongoose from "mongoose";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import User from "../../../model/User";
export default {
  Query: {
    viewAllNotice: async (_, args) => {
      const { searchValue, limit, currentPage } = args;
      try {
        const result = await Notice.find({
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
    getNoticeBoardDetail: async (_, args) => {
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
    getNoticeBoardBeforeId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Notice.findOne({
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

    getNoticeBoardNextId: async (_, args) => {
      const { id } = args;
      console.log(id);

      try {
        const result = await Notice.findOne({
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
    getNoticeBoardTotalPage: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Notice.find({
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

    getNoticeBoardTotalPageOnlyCnt: async (_, args) => {
      const { searchValue, limit } = args;

      try {
        const result = await Notice.find({
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
    createNotice: async (_, args) => {
      const { title, description, userId } = args;
      try {
        const current = await CURRENT_TIME();
        const user = mongoose.Types.ObjectId(userId);
        const result = await Notice.create({
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
    updateNotice: async (_, args) => {
      const { id, title, description } = args;
      try {
        const result = await Notice.updateOne(
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
    deleteNotice: async (_, args) => {
      const { id } = args;
      try {
        const result = await Notice.deleteOne({ _id: id });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};
