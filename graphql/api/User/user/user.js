import User from "../../../model/User";
import { CURRENT_TIME } from "../../../../utils/commonUtils";
import nodemailer from "nodemailer";
import smtpPool from "nodemailer-smtp-pool";

export default {
  Mutation: {
    checkSecretCode: async (_, args) => {
      const { email, code } = args;

      try {
        const tryUser = await User.findOne({ email });
        if (tryUser.secretCode === code) {
          await User.updateOne(
            { email },
            {
              $set: { secretCode: `` },
            }
          );

          return true;
        } else {
          return false;
          console.log("에러");
        }
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    registUser: async (_, args) => {
      const {
        // notice,
        userName,
        email,
        // createdAt,
        mobile,
      } = args;
      try {
        const current = await CURRENT_TIME();
        const prevResult = await User.create({
          // notice,
          userName,
          email,
          mobile,
          createdAt: current,
        });
        return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    tryLogin: async (_, args) => {
      const { email } = args;

      try {
        // 이메일이 가입되어있는가?

        const exist = await User.find({ email });

        if (exist.length > 0) {
          // 가입되어있다면 해당 이메일로 인증코드 생성
          const randomCode = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];

          const code =
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)] +
            randomCode[Math.floor(Math.random() * 10)];

          const smtpTransport = nodemailer.createTransport(
            smtpPool({
              service: "Gmail",
              host: "localhost",
              port: "465",
              tls: {
                rejectUnauthorize: false,
              },

              auth: {
                user: "4leaf.ysh@gmail.com",
                pass: "nvpdqofovkebects",
              },
              maxConnections: 5,
              maxMessages: 10,
            })
          );

          const mailOpt = {
            from: "4leaf.omh@gmail.com",
            to: email,
            subject: "🔐인증코드 전송 [www.sopy.com]",
            html: `인증코드는 ${code} 입니다.`,
          };

          await smtpTransport.sendMail(mailOpt, function (err, info) {
            if (err) {
              console.error("Send Mail error : ", err);
              smtpTransport.close();
            } else {
              console.log("Message sent : ", info);
              smtpTransport.close();
            }
          });

          const updateResult = await User.updateOne(
            { email },
            {
              $set: {
                secretCode: code,
              },
            }
          );

          return true;
        } else {
          // 가입되어 있지 않다면 리턴 false
          return false;
        }

        // 가입되어있다면 해당 이메일로 인증코드 전송
        // 전송 후 return true;
      } catch (e) {
        console.log(e);
        return false;
      }
    },
    checkSecretCode: async (_, args) => {
      const { email, code } = args;

      try {
        const tryUser = await User.findOne({ email });

        if (tryUser.secretCode === code) {
          await User.updateOne(
            { email },
            {
              $set: { secretCode: `` },
            }
          );
          return {
            result: true,
            objectId: tryUser._id,
          };
        } else {
          return {
            result: false,
            objectId: "-",
          };
        }
      } catch (e) {
        console.log(e);
        return {
          result: false,
          objectId: "-",
        };
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
