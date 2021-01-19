import Popular from "../../../model/Popular";

export default {
  Query: {
    getPopular: async (_, args) => {
      try {
        const result = await Popular.find({}, {});
        return result;
      } catch (e) {
        console.log(e);
        return [];
      }
    },
  },
};
