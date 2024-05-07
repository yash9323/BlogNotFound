import { useState, useEffect } from "react";
import queries from "../../../queries";
import { request } from "graphql-request";
import NewComment from "./NewComment";
import ReactQuill from "react-quill";
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { CiBookmark, CiBookmarkCheck } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaTag } from "react-icons/fa6";

const BlogPostCard = ({ blogData, authorData, userData }) => {
  const [blogDate, setBlogDate] = useState(formatBlogDate(blogData.date));

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

  const modules = {
    toolbar: false,
  };
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(blogData.likes.length);

  useEffect(() => {
    setUserId(userData._id);
    setIsLiked(
      userData && userData._id && blogData.likes.includes(userData._id)
    );
    setIsSaved(
      userData && userData._id && userData.saved.includes(blogData._id)
    );
  }, []);

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

  const handleDelete = async () => {
    if (!userId) {
      console.error("User ID not set.");
      return;
    }

    const variables = { id: blogData._id, userId: userData._id };

    try {
      const res = await request(
        "http://localhost:4000/",
        queries.DELETE_BLOG,
        variables
      );
      router.push("/myblogs");
    } catch (error) {
      console.error("Error in delete operation:", error);
    }
  };

  const handleEdit = () => {
    router.push(`/blog/edit/${blogData._id}`);
  };

  return (
    <div className="mt-5 ml-5 mr-5 flex flex-col rounded-xl p-10 shadow-md">
      <link
        rel="stylesheet"
        href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css"
      />
      <img
        src={blogData.image}
        className="w-full h-56 aspect-ratio aspect-square object-cover"
        alt="Blog Banner"
      />
      <h1 className="text-center text-4xl mb-5 mt-7">{blogData.title}</h1>
      <ReactQuill
        theme={null}
        value={blogData.content}
        readOnly={true}
        modules={modules}
      />
      <div className="flex items-center gap-4 justify-end">
        <button className="flex w-20 justify-center items-center rounded-full bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2">
          <FaTag />
          {blogData.tag}
        </button>
        <h4>{likesCount} Likes</h4>
        <button onClick={handleLikeUnlike}>
          {isLiked ? <AiFillLike size={30} /> : <AiOutlineLike size={30} />}
        </button>
        <button onClick={handleSaveUnsave} className="">
          {isSaved ? <CiBookmarkCheck size={30} /> : <CiBookmark size={30} />}
        </button>
        <div>
          {authorData._id === userData._id && (
            <button onClick={handleEdit}>
              <FaRegEdit size={30} />
            </button>
          )}
        </div>

        <button onClick={handleDelete}>
          {authorData._id === userData._id && <RiDeleteBin6Line size={30} />}
        </button>
      </div>
      <div className="text-sm">
        <h5>Written on: {blogDate}</h5>
        <h4>
          Author: {authorData?.fname} {authorData?.lname}
        </h4>
        <h4>{authorData?.bio}</h4>
      </div>
      <hr className="mt-5" />
      <h1 className="mt-2 text-center text-xl font-bold leading-9 tracking-tight text-white">
        &lt; Comment Section /&gt;
      </h1>
      <NewComment
        blogData={blogData}
        authorData={authorData}
        userData={userData}
      />
    </div>
  );
};

export default BlogPostCard;
