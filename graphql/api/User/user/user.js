import User from "../../../../model/User";

export default {
  Mutation: {
    registUser: async (_, args) => {
      const { notice, userName, email, createdAt } = args;
      try {
        const prevResult = await User.create({
          notice,
          userName,
          email,
          mobile,
          createdAt,
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
  },
};

// if (prevResult.length !== 0) {
//     console.log("Exist User Email Yet....!");
//     return false;
//   } else {
//     const result = await User.create({
//       notice,
//       userName,
//       userPassword,
//       email,
//       createdAt,
//     });
//     return true;
