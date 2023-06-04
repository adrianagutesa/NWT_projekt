import * as users from "../../lib/user";

export default async function handler(req, res) {
  const { uri } = req.query;
  const parameters = uri.split(" ");
  
  switch (req.method) {
    case "GET":
      if(parameters[1] == 1) {
        return res
          .status(200)
          .json(await users.listID(parameters[0]));
      } else {
        return res
        .status(200)
        .json(await users.list(parameters[0], parameters[1]));
      }
    case "POST":
      return res
      .status(201)
      .json(await users.add(parameters[0], parameters[1], parameters[2]));
    case "PUT":
      if(parameters.length === 3) {
        return res
          .status(201)
          .json(await users.editPassword(parameters[0], parameters[1], parameters[2]));
      } else {
        return res
          .status(201)
          .json(await users.editUsername(parameters[0], parameters[1]));
      }
    case "DELETE":
      return res
      .status(201)
      .json(await users.remove(parameters[0], parameters[1]));
    default:
      return res.status(405).send("Method not allowed!");
  }
}
