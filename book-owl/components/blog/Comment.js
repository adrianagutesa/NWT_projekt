import { useContext, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import useAuth from '../../hooks/useAuth';
//import AppContext from "../../../store/app-context";

const Comment = ({ comment, slug, commentChange }) => {
  //const appCtx = useContext(AppContext);
  const { token } = useAuth();
  const [isEditing, setIsEditiong] = useState(false);
  const [newComment, setNewComment] = useState(comment.text);
  const [currentUser, setCurrentUser] = useState(null);
  const [msg, setMsg] = useState({ message: '', isError: false });
  const [name, setName] = useState("");

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
      <div class="flex flex-col px-5">
        <p className="font-light text-l">{comment.useremail.split('@')[0]} on: {comment.date.split('T')[0]}</p>
        <p className="font-medium text-xl"></p>
        <p className="font-middle text-xl">{comment.text}</p>
        <div className="flex sm:flex-wrap">
          {currentUser && currentUser.email == comment.useremail && (
            <button
              className="flex justify-center bg-bckgrnd-light hover:bg-bckgrnd text-black font-medium sm:mt-8 lg:mb-4 lg:mt-4 py-2 px-10 sm:px-7 border-2 border-[#252526] rounded-full shadow-xl"
              onClick={(e) => {
                handleDeleteComment(slug);
              }}
            >
              Delete
            </button>
          )}
          {currentUser && currentUser.email == comment.useremail && (
            <button
              className="flex justify-center bg-bckgrnd-light hover:bg-bckgrnd text-black font-medium sm:mt-8 lg:mb-4 lg:mt-4 py-2 px-10 sm:px-7 border-2 border-[#252526] rounded-full shadow-xl lg:ml-4 sm:ml-2 md:ml-2"
              onClick={(e) => {
                setIsEditiong(true);
              }}
            >
              Edit
            </button>
          )}
          {isEditing && (
            <>
              <input
                type="text"
                name="comment"
                className="border-2 lg:px-14 lg:ml-4 sm:my-5 sm:h-12 sm:w-64"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="flex justify-center bg-[#252526] hover:bg-bckgrnd hover:text-black text-white font-medium lg:mb-4 lg:mt-4 py-2 px-12 border-2 border-[#252526] rounded-full shadow-xl lg:ml-4"
                type="submit"
                onClick={handleEditComment}
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Comment;