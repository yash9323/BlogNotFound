import { useState, useEffect } from "react";
import queries from "../../../queries";
import { useSession } from "next-auth/react";
import { request } from "graphql-request";
import { useRouter } from "next/navigation";
import NewComment from "./NewComment";

const BlogPostCard = ({ blogData, authorData }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [userId, setUserId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(blogData.likes.length);

  useEffect(() => {
    if (session) {
      setIsLiked(blogData.likes.includes(session.user?._id));
      setUserId(session.user?._id);
    }
  }, [session, blogData]);

  const handleLikeUnlike = async () => {
    const mutation = isLiked ? queries.UNLIKE_BLOG : queries.LIKE_BLOG;
    const variables = { blogId: blogData._id, userId };

    try {
      const res = await request("http://localhost:4000/", mutation, variables);
      setIsLiked(!isLiked);
      setLikesCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    } catch (error) {
      console.error(error);
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
      </div>
      <NewComment blogId={blogData._id} userId={userId} />
    </>
  );
};

export default BlogPostCard;
