import useAuth from '../../hooks/useAuth';
import api from "../../api";
import { useState, useEffect } from "react";
import Link from "next/link";
import Comment from "../blog/Comment";


const BookComment = ({...item}) => {
const { token } = useAuth();
const [currentUser, setCurrentUser] = useState(null);
const [msg, setMsg] = useState({ message: '', isError: false });
const [name, setName] = useState("");
const [commentText, setCommentText] = useState("");
const [comments, setComments] = useState([]);


const getComments = async () => {
    const resp = await fetch(
      `http://localhost:3000/api/comments/${item.slug}`
    );
    setComments(await resp.json());
  };

  const submitComment = async (e) => {
    e.preventDefault();

    const resp = await fetch(
      `http://localhost:3000/api/comments/${item.slug}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: currentUser.email,
          text: commentText,
        }),
      }
    );

    setCommentText("");

    await getComments();
  };

  const handleCommentChange = async () => {
    await getComments();
  };

  useEffect(() => {
    getComments();
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
  }, [token]);




return (
    <div className="flex flex-col lg:mx-24 sm:mx-8 md:mx-10 mb-8 p-6 md:p-10 lg:p-[60px] rounded-2xl">
    <p className=" my-6 font-semibold text-2xl">COMMENTS</p>
    {comments.length > 0 && (
      <div className='bg-gradient-to-r from-[#799633] to-swamp-green  p-6 md:p-10 lg:p-[60px] rounded-2xl'>
        {comments.map((comment) => (
         <Comment
            comment={comment}
            slug={item.slug}
            commentChange={handleCommentChange}
          />
        ))}
      </div>
    )}
    {comments.length === 0 && (
      <p className="font-middle text-xl ">No comments added!!</p>
    )}
    {token && (
      <>
        <div className=" flex justify-start pt-10 pb-2">
          <p className="font-semibold text-2xl">Tell us what you think, write a comment:</p>
        </div>
        <div className=" flex justify-start py-2">
          <form>
            <label htmlFor="Insert comment"></label>
            <input
  type="text"
  name="comment"
  className="border-2 py-2 px-4 sm:px-8 w-full sm:w-full md:w-full lg:w-4/5 xl:w-3/4"
  value={commentText}
  onChange={(e) => setCommentText(e.target.value)}
/>


            <button
              className="flex justify-center bg-gradient-to-r from-[#799633] to-swamp-green hover:bg-[#3e3e42] hover:border-[#3e3e42] text-gray-100 font-medium mt-8 py-2 px-12 border-2 border-[#252526] rounded-full shadow-xl"
              type="submit"
              onClick={submitComment}
            >
              Publish
            </button>
          </form>
        </div>
      </>
    )}
  </div>
);
};

export default BookComment;