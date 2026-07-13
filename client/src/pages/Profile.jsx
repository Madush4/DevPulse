import React from "react";
import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import Spinner from "../ui/Spinner";
import Navbar from "../components/layout/Navbar";
import ProfileHeader from "../components/profile/ProfileHeader";


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
  console.log("Profile page user location:", data.user.location);
  return (
    <div className="bg-slate-800">
      <Navbar
        showSync={true}
        cachedAt={data.user.cached_at}
        onRefresh={() =>console.log("refreshed clicked.")}
      />
      <ProfileHeader user = {data.user}/>
    </div>
  );
}

export default Profile;
