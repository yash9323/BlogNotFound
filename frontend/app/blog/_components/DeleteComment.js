// Import necessary dependencies
import React, { useContext } from "react";
import { request } from "graphql-request";
import queries from "../../../queries";
import { MdOutlineDelete } from "react-icons/md";

const DeleteComment = ({ commentId, setAllComments }) => {
  const handleDelete = async (event) => {
    event.preventDefault();
    try {
      const res = await request(
        "http://localhost:4000",
        queries.DELETE_COMMMENT,
        {
          commentId,
        }
      );

      setAllComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return <button onClick={handleDelete}><MdOutlineDelete size={20}/></button>;
};

export default DeleteComment;
