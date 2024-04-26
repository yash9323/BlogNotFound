import React from 'react';
import { request } from "graphql-request";
import queries from "../../queries"
import { getServerSession } from "next-auth/next"
import { options } from "../api/auth/[...nextauth]/options"
import UserDetailsCard from "./_components/UserDetailsCard"

const ProfilePage = async () => {

    const session = await getServerSession(options)
    const res = await request("http://localhost:4000/", queries.GET_USER, {
      userId: session.user._id
    });
    return (
        <div>
            <UserDetailsCard data={res.getUser}/>
        </div>
    );
}

export default ProfilePage;
