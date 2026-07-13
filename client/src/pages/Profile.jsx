import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import Spinner from "../ui/Spinner";


function Profile() {
  const { username } = useParams();
  const { data, loading, error } = useProfile(username);

  if (loading) {
    return (
      <>
        <h1>Loading profile !</h1>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h1>Something went wrong </h1>
        <p>Status: {error.status}</p>
        <p> {error.message}</p>
      </>
    );
  }
  return (
    <div>
      <h1>Profile Status</h1>
      <p>Username: {data.user.github_username}</p>
      <p>Name: {data.user.display_name}</p>
      <p>Followers: {data.user.followers}</p>
      <p>Repositories: {data.user.public_repos}</p>
    </div>
  );
}

export default Profile;
