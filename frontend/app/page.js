"use client";
import { useState, useEffect } from "react";
import ShowAllBlogs from "./(components)/ShowAllBlogs";
import Tags from "./(components)/Tags";
import queries from "../queries";
import request from "graphql-request";
import { FaTag } from "react-icons/fa6";

const homepage = () => {
  const [allTags, setAllTags] = useState([]);
  const [tag, setTag] = useState("");
  const [flag, setFlag] = useState(false);
  const fetchTags = async () => {
    try {
      const response = await request(
        "http://localhost:4000/",
        queries.GET_TAGS
      );
      if (response.getTags.length !== 0) {
        setAllTags(response.getTags);
        setFlag(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div>
      <h1 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        &lt; Hot Topics /&gt;
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 p-10">
        {flag &&
          allTags.map((singleTag, index) => (
            <div>
              <button
                className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
                onClick={() => setTag(singleTag)}
                key={index}
              >
                <FaTag />
                {singleTag}
              </button>
            </div>
          ))}
      </div>
      {tag && <Tags tag={tag} />}
      <ShowAllBlogs />
    </div>
  );
};

export default homepage;
