import { useEffect, useState } from "react";


const HOST = import.meta.env.VITE_HOST;



const RecordedSessions = () => {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("usr");
  const [orgMap, setOrgMap] = useState<Record<string, string>>({});


useEffect(() => {
  const fetchSessions = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${HOST}/session/get-sessions?user_id=${userId}`
      );
      const data = await res.json();

      if (res.ok) {
        const sessionsData = data.sessions || [];
        setSessions(sessionsData);

        // Fetch org info for each session
        fetchOrgNames(sessionsData);

      } else {
        console.error("Fetch error:", data.error);
      }

    } catch (err) {
      console.error("Error fetching sessions:", err);
    } finally {
      setLoading(false);
    }
  };

  if (userId) fetchSessions();
}, [userId]);


const fetchOrgNames = async (sessionsData: any[]) => {
  try {
    const uniqueOrgIds = [
      ...new Set(sessionsData.map(s => s.org_id))
    ];

    const orgMapTemp: Record<string, string> = {};

    for (const oid of uniqueOrgIds) {
      const res = await fetch(`${HOST}/startup/startup/${oid}`);
      const data = await res.json();

      if (res.ok && data.startups?.length > 0) {
        orgMapTemp[oid] = data.startups[0].org_name;
      } else {
        orgMapTemp[oid] = "Unknown Startup";
      }
    }

    setOrgMap(orgMapTemp);

  } catch (err) {
    console.error("Org fetch error:", err);
  }
};



const formatDuration = (seconds: number) => {
  if (!seconds) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${minutes}m ${sec}s`;
};


const formatDate = (ts: string) => {
  return new Date(ts).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-cyan-500/40"></div>
        <div className="absolute inset-0 h-12 w-12 rounded-full border-t-4 border-cyan-400 animate-spin"></div>
      </div>
    </div>
  );
}



  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center space-x-2 mb-6">
        <div className="w-3 h-0.5 bg-cyan-500"></div>
        <h2 className="text-sm font-semibold uppercase text-slate-300">
          Recorded Sessions
        </h2>
      </div>

      <h1 className="text-2xl font-bold mb-6">Your Video Practice Sessions</h1>
{!loading && sessions.length === 0 && (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-2xl shadow-lg backdrop-blur-md">
      <div className="flex justify-center mb-4">
        <svg
          className="w-12 h-12 text-slate-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-3A2.25 2.25 0 008.25 5.25V9m-3 0h13.5m-13.5 0A2.25 2.25 0 003 11.25v7.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75v-7.5A2.25 2.25 0 0018.75 9m-13.5 0h13.5"
          />
        </svg>
      </div>

      <h3 className="text-xl font-semibold text-white mb-2">
        No Recorded Sessions Yet
      </h3>

      <p className="text-slate-400 text-sm max-w-sm mx-auto mb-5">
        You haven't recorded any practice sessions yet. Start your first session 
        from your dashboard to begin improving your pitch.
      </p>

      <a
        href="/dashboard"
        className="inline-block bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2 rounded-lg 
                   transition-all shadow-md hover:shadow-cyan-500/30 text-sm font-medium"
      >
        Go to Dashboard
      </a>
    </div>
  </div>
)}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {sessions.map((s) => (
  <div
    key={s.video_id}
    className="bg-white/10 backdrop-blur-md border border-slate-700 rounded-2xl overflow-hidden
               hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/20 
               transition-all duration-300"
  >
    {/* Thumbnail */}
    <div className="relative h-44 w-full">
  <img
    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    alt="Session thumbnail"
    className="w-full h-full object-cover"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

  <span className="absolute bottom-2 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
    {formatDuration(s.duration)}
  </span>
</div>


    {/* Content */}
    <div className="p-5">
      <h3 className="text-lg font-semibold mb-2 text-white">
       {orgMap[s.org_id] || "Loading..."}
      </h3>

      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-slate-400">{formatDate(s.created_at)}</span>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-400 mt-4">
        <span>{formatDate(s.created_at)}</span>

        <button
          onClick={() => window.open(s.video_url, "_blank")}
          className="bg-slate-700 hover:bg-slate-600 text-white py-1.5 px-4 rounded-md 
                     transition-all text-sm shadow-sm hover:shadow-cyan-500/20"
        >
          Watch
        </button>
      </div>
    </div>
  </div>
))}


      </div>
    </div>
  );
};

export default RecordedSessions;
