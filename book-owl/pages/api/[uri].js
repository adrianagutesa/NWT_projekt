import * as users from "../../lib/user";
import * as userID from "../../lib/userByID";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { uri } = req.query;
      const parameters = uri.split(" ");

      if(parameters[1] == 1) {
        return res
          .status(200)
          .json(await userID.list(parameters[0]));
      } else {
        return res
        .status(200)
        .json(await users.list(parameters[0], parameters[1]));

      }
    default:
      return res.status(405).send("Method not allowed!");
  }
}
