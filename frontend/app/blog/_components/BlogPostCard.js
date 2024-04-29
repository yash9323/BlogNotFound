import { useState, useEffect } from "react";
import queries from "../../../queries";
import { request } from "graphql-request";
import { useRouter } from "next/navigation";
import NewComment from "./NewComment";

const BlogPostCard = ({ blogData, authorData, userData }) => {
  const [userId, setUserId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(blogData.likes.length);

  useEffect(() => {
    {
      setIsLiked(blogData.likes.includes(userData._id));
      setUserId(userData._id);
      setIsSaved(userData.saved.includes(blogData._id));
    }
  }, [userData, blogData]);

  const handleLikeUnlike = async () => {
    if (!userId) {
      console.error("User ID not set.");
      return;
    }

    const mutation = isLiked ? queries.UNLIKE_BLOG : queries.LIKE_BLOG;
    const variables = { blogId: blogData._id, userId };

    try {
      const res = await request("http://localhost:4000/", mutation, variables);
      setIsLiked(!isLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error("Error in like/unlike operation:", error);
    }
  };

  const handleSaveUnsave = async () => {
    if (!userId) {
      console.error("User ID not set.");
      return;
    }

    const mutation = isSaved ? queries.UNSAVE_BLOG : queries.SAVE_BLOG;
    const variables = { blogId: blogData._id, userId };

    try {
      const res = await request("http://localhost:4000/", mutation, variables);
      setIsSaved(!isSaved);
    } catch (error) {
      console.error("Error in save/unsave operation:", error);
    }
  };

  return (
    <>
      <div className="mt-10 ml-5 mr-5 flex flex-col bg-gray-800 rounded-xl p-10 shadow-md">
        <h1>{blogData.title}</h1>
        <h3>{blogData.content}</h3>
        <h5>{blogData.date}</h5>
        <h4>{likesCount} Likes</h4>
        <h4>About the Author:</h4>
        <p>
          {authorData?.fname} {authorData?.lname}
        </p>
        <p>{authorData?.bio}</p>
        <button onClick={handleLikeUnlike}>
          {isLiked ? "Unlike" : "Like"}
        </button>
        <button onClick={handleSaveUnsave}>
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
      <NewComment blogData={blogData} userData={userData} />
    </>
  );
};

export default BlogPostCard;
