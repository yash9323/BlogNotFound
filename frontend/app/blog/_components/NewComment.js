import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../../queries";

const NewComment = ({ blogId, userId }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await request(
          "http://localhost:4000/",
          queries.GET_COMMENTS_BY_BLOG_ID,
          {
            blogId: blogId,
          }
        );
        console.log(res);
        setAllComments(res.getCommentsByBlogId);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [comment, blogId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(comment);

    try {
      const res = await request(
        "http://localhost:4000/",
        queries.CREATE_COMMENT,
        {
          blogId: blogId,
          userId: userId,
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
        {allComments
          .slice()
          .reverse()
          .map((comment, index) => (
            <h3 key={index}>
              {comment.comment} {comment.date.toString()}{" "}
            </h3>
          ))}
      </div>
    </div>
  );
};

export default NewComment;
