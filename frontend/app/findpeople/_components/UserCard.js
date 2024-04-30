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
      console.log(user);
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
      // Update followers count after successful follow/unfollow
      setFollowersCount((prevCount) =>
        isFollowed ? prevCount - 1 : prevCount + 1
      );
    } catch (error) {
      console.error("Error in follow/unfollow operation:", error);
    }
  };

  return (
    <div>
      Name: {data.fname} {data.lname}
      <br />
      Bio: {data.bio}
      <br />
      email: {data.email}
      Followers: {followersCount}
      <button onClick={handleFollowUnfollow}>
        {isFollowed ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
