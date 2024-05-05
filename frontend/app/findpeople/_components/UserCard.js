import { useState, useEffect } from "react";
import queries from "../../../queries";
import request from "graphql-request";
import { useSession } from "next-auth/react";

const graphqlEndpoint = "http://localhost:4000/";

const UserCard = ({ data }) => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState(null);
  const [isFollowed, setIsFollowed] = useState(
    data.followers.includes(session.user._id)
  );
  const [followersCount, setFollowersCount] = useState(data.followers.length);

  const fetchData = async () => {
    try {
      const user = await request(graphqlEndpoint, queries.GET_USER, {
        userId: session.user._id,
      });
      setUserData(user.getUser);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    if (userData && data) {
      setIsFollowed(userData.following.includes(data._id));
    }
  }, [data]);

  const handleFollowUnfollow = async () => {
    const mutation = isFollowed ? queries.UNFOLLOW_USER : queries.FOLLOW_USER;
    const variables = isFollowed
      ? { selfId: userData._id, userToUnfollowId: data._id }
      : { selfId: userData._id, userToFollowId: data._id };

    try {
      const res = await request(graphqlEndpoint, mutation, variables);
      setIsFollowed(!isFollowed);
      setFollowersCount((prevCount) =>
        isFollowed ? prevCount - 1 : prevCount + 1
      );
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
    }
  };

  return (
    <div className="border border-white p-5 mt-5 ml-5 mr-5 flex flex-col bg-gray-800 rounded-xl shadow-md">
      Name: {data.fname} {data.lname}
      <br />
      Bio: {data.bio}
      <br />
      email: {data.email}
      <br />
      Followers: {followersCount}
      <button onClick={handleFollowUnfollow}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
