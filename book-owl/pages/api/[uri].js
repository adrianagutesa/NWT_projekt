import * as users from "../../lib/user";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const { uri } = req.query;
      const parameters = uri.split(" ");
      return res
        .status(200)
        .json(await users.list(parameters[0], parameters[1]));
    default:
      return res.status(405).send("Method not allowed!");
  }
}
