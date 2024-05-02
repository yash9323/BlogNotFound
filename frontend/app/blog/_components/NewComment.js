import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../../queries";
import DeleteComment from "./DeleteComment";
import { useRouter } from "next/navigation";

const NewComment = ({ blogData, userData }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(
          "http://localhost:4000/",
          queries.GET_COMMENTS_BY_BLOG_ID,
          {
            blogId: blogData._id,
          }
        );
        setAllComments(res.getCommentsByBlogId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [comment, blogData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await request(
        "http://localhost:4000/",
        queries.CREATE_COMMENT,
        {
          blogId: blogData._id,
          userId: userData._id,
          comment: comment,
        }
      );
    } catch (error) {
      console.error(error);
    }
    setComment("");
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-7 flex items-center justify-center gap-2">
        <input
          className="block w-full sm:w-3/4 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          name="comment"
          type="text"
          placeholder="Write a new comment here..."
          value={comment}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="flex w-1/2 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Comment
        </button>
      </form>
      <div>
        {allComments
          .slice()
          .reverse()
          .map((comment, index) => (
            <div key={index} className="flex items-center justify-between mt-5 pb-5 border-b-2 border-white">
                <div>
                  <h1 className="text-xs">{comment.user.fname} commented on {comment.date.toString()}:</h1>
                  <h1 className="ml-4 mt-2">{comment.comment}</h1>
                </div>
                <div>
                  <DeleteComment
                  commentId={comment._id}
                  setAllComments={setAllComments}/>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NewComment;

{/* <h3 key={index}>
              {comment.comment} {comment.date.toString()} {comment.user.fname}{" "}
              {comment.user.lname}
             
            </h3> */}