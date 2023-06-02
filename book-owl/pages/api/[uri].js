import * as users from "../../lib/user";
import * as userID from "../../lib/userByID";

export default async function handler(req, res) {
  const { uri } = req.query;
  const parameters = uri.split(" ");
  
  switch (req.method) {
    case "GET":
      if(parameters[1] == 1) {
        return res
          .status(200)
          .json(await userID.list(parameters[0]));
      } else {
        return res
        .status(200)
        .json(await users.list(parameters[0], parameters[1]));
      }
    case "POST":
      return res
      .status(201)
      .json(await users.add(parameters[0], parameters[1], parameters[2]));
    default:
      return res.status(405).send("Method not allowed!");
  }
}
