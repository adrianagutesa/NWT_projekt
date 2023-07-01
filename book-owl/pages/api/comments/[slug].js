import * as comments from "../../../lib/comments";

export default async function handler(req, res) {
  const { slug } = req.query;
  switch (req.method) {
    case "GET":
      // Fetch comments associated with the specific slug
      const commentsList = await comments.list(slug);

      if (!commentsList) {
        res.status(404).json({ message: 'No comments found for this slug.' });
      } else {
        res.status(200).json(commentsList);
      }
      break;
      
    case "POST":
      // Add a comment associated with the specific slug
      const newComment = await comments.add(slug, req.body.email, req.body.text);
      
      if (!newComment) {
        res.status(400).json({ message: 'Failed to add comment.' });
      } else {
        res.status(201).json(newComment);
      }
      break;

    case "PUT":
      // Edit a comment associated with the specific slug
      const editedComment = await comments.edit(req.body.id, req.body.text);

      if (!editedComment) {
        res.status(400).json({ message: 'Failed to edit comment.' });
      } else {
        res.status(201).json(editedComment);
      }
      break;

    default:
      res.status(405).send("Method not allowed!");
      break;
  }
}
