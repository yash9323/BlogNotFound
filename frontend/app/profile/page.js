"use client";
import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import { useSession } from "next-auth/react";
import UserDetailsCard from "./_components/UserDetailsCard";

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState();

  const fetchData = async () => {
    if (session) {
      try {
        const res = await request("http://localhost:4000/", queries.GET_USER, {
          userId: session.user._id,
        });
        setUserData(res.getUser);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!userData) {
    <div>Loading...</div>;
  } else {
    return (
      <div>
        <UserDetailsCard data={userData} />
      </div>
    );
  }
};

export default ProfilePage;
