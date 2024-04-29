import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../../queries";
import DeleteComment from "./DeleteComment";
import { useRouter } from "next/navigation";

const NewComment = ({ blogData, userData }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const router = useRouter();

  console.log("blogData", blogData);
  console.log("userData", userData);

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
      console.log(res);
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
      <form onSubmit={handleSubmit}>
        <input
          className="text-black"
          name="comment"
          type="text"
          placeholder="Write a new comment here..."
          value={comment}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
      <div>
        {console.log(allComments)}
        {allComments
          .slice()
          .reverse()
          .map((comment, index) => (
            <h3 key={index}>
              {comment.comment} {comment.date.toString()} {comment.user.fname}{" "}
              {comment.user.lname}
              <DeleteComment
                commentId={comment._id}
                setAllComments={setAllComments}
              />
            </h3>
          ))}
      </div>
    </div>
  );
};

export default NewComment;
