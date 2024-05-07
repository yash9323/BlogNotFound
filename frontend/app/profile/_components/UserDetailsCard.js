import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import queries from "../../../queries";
import request from "graphql-request";
import { signOut } from "next-auth/react";

const UserDetailsCard = ({ data }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = request("http://localhost:4000/", queries.REMOVE_USER, {
        id: data._id,
      });
      if (response) {
        let udata = await signOut({
          redirect: false,
          callbackUrl: "/landing",
        });
        router.push(udata.url);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 ml-5 mr-5 flex flex-col bg-gray-800 rounded-xl p-10 shadow-md">
      <div className="flex items-center mb-8">
        <Image
          src="/img_avatar.png"
          alt="Avatar"
          width={200}
          height={200}
          className="rounded-full w-40 h-40 mr-8 border border-white"
        />
        <div className="text-white text-xl font-bold">{`${data.fname} ${data.lname}`}</div>
        <Link href="/profile/edit">
          <button className="ml-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
            Edit Profile
          </button>
        </Link>
        <button onClick={handleDelete} className="ml-5">
          <MdDeleteOutline size={30} />
        </button>
      </div>
      <div className="flex flex-col space-y-4 text-gray-300">
        <div className="border-b border-dashed border-gray-400 pb-2">
          <h2 className="text-lg font-medium">Personal Details</h2>
        </div>
        <div className="flex flex-col space-y-1">
          <p>First Name: {data.fname}</p>
          <p>Last Name: {data.lname}</p>
          <p>Email Address: {data.email}</p>
        </div>
        <div className="border-b border-dashed border-gray-400 pb-2">
          <h2 className="text-lg font-medium">Bio</h2>
        </div>
        <p className="text-gray-200">{data.bio}</p>
        <hr className="border-gray-400 my-4" />
        <div className="flex justify-between text-gray-300">
          <p>Followers: {data.followers.length}</p>
          <p>Following: {data.following.length}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsCard;
