import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../../queries";
import DeleteComment from "./DeleteComment";
import { useRouter } from "next/navigation";

const NewComment = ({ blogData, authorData, userData }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [error, setError] = useState("");

  function formatBlogDate(dateString) {
    const date = new Date(dateString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const day = new Intl.DateTimeFormat("en-US", { day: "numeric" }).format(
      date
    );
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
      date
    );
    const year = new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(
      date
    );

    const displayDate = `${month} ${day}, ${year}`;

    return displayDate;
  }

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
    const newComment = comment.trim();
    const minCommentLength = 1;
    const maxCommentLength = 50;
    const CommentRegex = /[a-zA-Z]/;

    try {
      if (!newComment) {
        throw "Comment has only spaces or not been passed";
      }
      if (newComment.length < minCommentLength) {
        throw `Comment must be at least ${minCommentLength} characters long`;
      }
      if (newComment.length > maxCommentLength) {
        throw `Comment exceeds maximum length of ${maxCommentLength} characters`;
      }
      if (!newComment.match(CommentRegex)) {
        throw `registerUser: Content cannot contain all numbers or special characters`;
      }
    } catch (error) {
      setError(error);
      return;
    }
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
    setError("");
    setComment("");
  };

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Holy smokes!</strong>
          <br />
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="mt-7 flex items-center justify-center gap-2"
      >
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
        {allComments &&
          allComments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div
                key={index}
                className="flex items-center justify-between mt-5 pb-5 border-b-2 border-white"
              >
                <div>
                  <h1 className="text-xs">
                    {comment.user.fname} commented on{" "}
                    {formatBlogDate(comment.date.toString())}:
                  </h1>
                  <h1 className="ml-4 mt-2">{comment.comment}</h1>
                </div>
                <div>
                  {comment.user._id === userData._id && (
                    <DeleteComment
                      commentId={comment._id}
                      setAllComments={setAllComments}
                      userId={userData._id}
                    />
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default NewComment;

{
  /* <h3 key={index}>
              {comment.comment} {comment.date.toString()} {comment.user.fname}{" "}
              {comment.user.lname}
             
            </h3> */
}
