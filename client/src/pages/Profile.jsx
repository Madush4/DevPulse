import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import Spinner from "../components/ui/Spinner";
import Navbar from "../components/layout/Navbar";
import ProfileHeader from "../components/profile/ProfileHeader";
import Footer from "../components/layout/Footer";
import StatCard from "../components/profile/StatCard";
import NotFound from "../components/ui/NotFound";
import ErrorMessage from "../components/ui/ErrorMessage";
import TopRepos from "../components/profile/TopRepos";
import AiSummaryCard from "../components/profile/AiSummaryCard";

function Profile() {
  const { username } = useParams();
  const { data, loading, error, refreshing, reLoadProfile } =
    useProfile(username);

  if (loading) {
    return <Spinner username={username} />;
  }

  


  if (error) {
    if (error.status === 404) {
      return <NotFound username={username} />;
    }
    return <ErrorMessage error={error} username={username} />;
  }

  console.log("Profile page user location:", data.user.location);

  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar

        showSync={true}
        cachedAt={data.user.cached_at}
        onRefresh={() => reLoadProfile()}
        refreshing={refreshing}
      />

      <main className="mx-auto max-w-6xl space-y-6 px-6 py-8">
        <ProfileHeader user={data.user} />
        <AiSummaryCard ai={data.ai} />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <StatCard
            label="Total Commits"
            value={data.stats.total_commits}
            sub="this year"
          />

          <StatCard
            label="Current Streak"
            value={`${data.stats.current_streak}d`}
            sub="active streak"
          />

          <StatCard
            label="Longest Streak"
            value={`${data.stats.longest_streak}d`}
            sub="all time"
          />

          <StatCard
            label="Top Language"
            value={data.languages[0]?.language || "N/A"}
            sub="by bytes"
          />
        </div>

        <TopRepos repos={data.repos} />
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
