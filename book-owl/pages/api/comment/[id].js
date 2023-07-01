import * as comments from "../../../lib/comments";

export default async function handler(req, res) {
  const { id } = req.query;
  switch (req.method) {
    case "DELETE":
      return res.status(201).json(await comments.remove(id));
    default:
      return res.status(405).send("Method not allowed!");
  }
}
