import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { BsPen } from 'react-icons/bs';
import { FaArrowUp } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import useAuth from '../../hooks/useAuth';

import HeaderFooterLayout from "../../layouts/HeaderFooterLayout";
import { getBlogs } from "../api/ContentfulAPI";
import BackArrow from "../../public/back-arrow.png";
import PostThird from "../../components/blog/postThird";
import Comment from "../../components/blog/Comment";

const Post = (props) => {
    const {fields} = props;
    const router = useRouter();
    const postSlug = router.query.slug;
    console.log(postSlug)
    //const postId = router.query.id;
    //const postSlugId = router.query.id;

    
    const { token } = useAuth();
    const [currentUser, setCurrentUser] = useState(null);
    const [msg, setMsg] = useState({ message: '', isError: false });
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

   // const uri = postSlug;

    /*const res = await fetch(`http://localhost:3000/api/${uri}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: currentUser.id, username: newUsername }),
    });*/
   /* useEffect(() => {
        // Fetch comments when the component mounts.
        const fetchComments = async () => {
          const response = await fetch(`/api/comments?postId=${postSlug}`);
          console.log(response); // Add this line to inspect the response
          const commentsData = await response.json();
          setComments(commentsData);
        }
      
        fetchComments();
      }, []);*/
      (async function () {
        const uri = postSlug;

        console.log('ovo je')
        console.log(uri)
        const resp = await fetch(
          `http://localhost:3000/api/comments/${uri}`
        );
        console.log(resp)
        setComments(await resp.json());
      })();
    
      const submitComment = async (e) => {
        e.preventDefault();
    
        const resp = await fetch(
          `http://localhost:3000/api/comments/${postSlug}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: currentUser.email,
              text: text,
            }),
          }
        );
    
        setCommentText("");
    
        await getComments(postSlug);
      };
    
      const handleCommentChange = async () => {
        await getComments(postSlug);
      };
    
      /*useEffect(() => {
        getComments(postSlug);
      }, []);*/



    const isBrowser = () => typeof window !== 'undefined'; 

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    const Text = ({ children }) => <p className="py-3 indent-5">{children}</p>;
    const ListOl = ({ children }) => <ol className="list-decimal py-6">{children}</ol>;
    const ListUl = ({ children }) => <ul className="list-disc py-6">{children}</ul>;
    const Bold = ({ children }) => <span className="bold">{children}</span>;

    const options = {
        renderMark: {
            [MARKS.BOLD]: (text) => <Bold>{text}</Bold>,
          },
        renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
            [BLOCKS.OL_LIST]: (node, children) => <ListOl>{children}</ListOl>,
            [BLOCKS.UL_LIST]: (node, children) => <ListUl>{children}</ListUl>,
        },
    };
    return (
        <HeaderFooterLayout title="BookOwl / Blog" description="This is the page of blog. You can read blog post about books on here.">            
            {fields?.map((item, index) => {
                if(item.slug == postSlug) {
                    if(index < 16) {
                        var nextI = fields[index + 1];
                        var nextII = fields[index + 2];
                        var nextIII = fields[index + 3];
                    } else {
                        var nextI = fields[index - 1];
                        var nextII = fields[index - 2];
                        var nextIII = fields[index - 3];
                    }
                    
                    return (
                        <>
                            <div className="text-center pt-10 md:pt-16">
                                <Link href="/blog" passHref>
                                    <Image
                                        src={BackArrow}
                                        width={35}
                                        height={35}
                                        alt="Back-arrow"
                                        className="hover:scale-110 ml-16"
                                    />
                                </Link>
                                <p className="text-sm md:text-base text-light-brown font-bold mb-2">{item.publishDate} </p>
                                <h1 className="font-bold break-normal text-3xl text-shingle-fawn-dark md:text-5xl">{item.title}</h1>
                            </div>

                            <div className="container w-full max-w-6xl mx-auto bg-white bg-cover mt-8 rounded"
                                style={{
                                    background: `url(${'https:' + item.image.fields.file.url})`,
                                    backgroundSize:"cover",
                                    height: "70vh",
                                    }}
                            >
                            </div>

                            <div className="container max-w-5xl mx-auto -mt-32">
		                        <div className="mx-0 sm:mx-6">
                                    <div className="bg-gray w-full p-8 md:p-20 text-xl md:text-2xl text-shingle-fawn leading-normal">
                                        <p className="flex items-center text-sm md:text-lg underline"><BsPen />{item.author}</p>
                                        <div className="text-lg md:text-2xl mb-5">
                                            {documentToReactComponents(item.body, options)}
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        {/* Comment Section */}
                        <div className="flex flex-col lg:mx-24 sm:mx-8 md:mx-10 mb-8">
        <p className="my-6 font-semibold text-2xl">COMMENTS</p>
        {comments.length > 0 && (
          <div className="bg-gradient-to-r from-swamp-green to-swamp-green-[.3] p-6 md:p-10 lg:p-[60px] rounded-2xl ">
            {comments.map((comment) => (
             <Comment
                comment={comment}
                slug={postSlug}
                commentChange={handleCommentChange}
              />
            ))}
          </div>
        )}
        {comments.length === 0 && (
          <p className="font-middle text-xl">No comments added!!</p>
        )}
        {token && (
          <>
            <div className="flex justify-start pt-10 pb-2">
              <p className="font-semibold text-2xl">Tell us what you think, write a comment:</p>
            </div>
            <div className="flex justify-start py-2">
              <form>
                <label htmlFor="Insert comment"></label>
                <input
                  type="text"
                  name="comment"
                  className="border-2 py-2 px-24 sm:px-8 sm:w-80 w-96"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                />
                <button
                  className="flex justify-center bg-gradient-to-r from-swamp-green to-swamp-green-[.3] hover:bg-[#799633] hover:border-[#3e3e42] text-gray-100 font-medium mt-8 py-2 px-12 border-2 border-[#252526] rounded-full shadow-xl"
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
                        <div className="bg-swamp-green/[.3] mt-10">
                            <div className="container w-full max-w-6xl mx-auto px-2 py-8">
                                <div className="flex flex-wrap justify-between">
                                    <PostThird key={nextI.id} {...nextI}/>  
                                    <PostThird key={nextII.id} {...nextII}/>  
                                    <PostThird key={nextIII.id} {...nextIII}/>  
                                </div>  
                            </div> 
                        </div> 
                        
                        </>
                        )
                    }
                }
                )}

            <button className="fixed bottom-0 right-0 p-4 text-shingle-fawn-dark bg-shingle-fawn/[.4] rounded-full m-2" onClick={scrollToTop}>
              <FaArrowUp />
            </button>

            
        </HeaderFooterLayout>

    );
};

export async function getStaticProps(context) {
    const entries = await getBlogs();
    let data = entries.filter(() => function() {
    return item.sys.contentType.sys.id === 'blogs'})
    const fields = data.map((item) => item.fields );
    const slug = context.params.slug;
    return {
        props: {
            fields: fields,
            slug: slug
        }
    }
}


export async function getStaticPaths() {
    return {
      paths: [
        // String variant:
        '/blog/1',
      ],
      fallback: true,
    }
}

export default Post;