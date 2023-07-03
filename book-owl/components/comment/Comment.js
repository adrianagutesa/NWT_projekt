import { useState, useEffect } from "react";
import { AiOutlineUser } from "react-icons/ai";
import api from "../../api";
import useAuth from "../../hooks/useAuth";

const Comment = ({ comment, slug, commentChange }) => {
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [msg, setMsg] = useState({ message: '', isError: false });

    useEffect(() => {
      if (!token) {
          return;
      }

      api.self(token)
          .then(({ user }) => {
          setCurrentUser(user);
          })
          .catch((err) => {
              setMsg({ message: err.message, isError: true })
          });
  }, [token])

  const [isEditing, setIsEditiong] = useState(false);
  const [newComment, setNewComment] = useState(comment.text);

  const handleEditComment = async () => {
    await fetch(`http://localhost:3000/api/comments/${slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: comment.id, text: newComment }),
    });

    setIsEditiong(false);
    commentChange();
  };

  const handleDeleteComment = async () => {
    await fetch(`http://localhost:3000/api/comment/${comment.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    commentChange();
  };

  return (
    <div className="py-5 flex align-middle">
      <div>
        <AiOutlineUser className="w-10 h-10 mt-1.5" />
      </div>
      <div className="flex flex-col px-5">
        <p className="font-light text-l">{comment.useremail.split('@')[0]} on: {comment.date.split('T')[0]}</p>
        {!isEditing ? (
          <p className="font-middle text-xl">{comment.text}</p>
        ) : (
          <input
            type="text"
            name="comment"
            className="border-2 w-full mt-2 px-2 py-1 "
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        )}

        <div className="flex flex-wrap mt-4">
          {currentUser && currentUser.email == comment.useremail && (
            <>
              <button
                className="flex justify-center bg-bckgrnd-light hover:bg-[#799633] text-black font-medium mb-2 py-2 px-10 border-2 border-[#252526] rounded-full shadow-xl"
                onClick={(e) => {
                    handleDeleteComment(slug);
                }}
              >
                Delete
              </button>
              <button
                className="flex justify-center bg-bckgrnd-light hover:bg-[#799633] text-black font-medium mb-2 ml-2 py-2 px-10 border-2 border-[#252526] rounded-full shadow-xl"
                onClick={(e) => {
                    setIsEditiong(true);
                }}
              >
                Edit
              </button>
            </>
          )}

          {isEditing && (
            <button
              className="flex justify-center bg-[#252526] hover:bg-[#799633] hover:text-black text-white font-medium mb-2 mt-2 py-2 px-12 border-2 border-[#252526] rounded-full shadow-xl w-full"
              type="submit"
              onClick={handleEditComment}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </div>
  );
};




export default Comment;
