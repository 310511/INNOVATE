import { useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
import NewPitchModal from "../../components/NewPitchModal";


const HOST = import.meta.env.VITE_HOST;


interface PitchData {
  organizationName: string;
  industryType: string;
  websiteUrl: string;
}
const DashboardHome = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);

  const userId = localStorage.getItem("usr");


  
    const handleNewPitchSubmit = ( data:PitchData) => {
    console.log("Submitting new pitch:", data);
  };

   useEffect(() => {
    if (!userId) {
      console.error("No user_id found in localStorage");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await fetch(`${HOST}/user/${userId}`);
        const data = await res.json();


        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

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
      <main className="flex-1">
        {/* Overview Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            {/* Left side */} 
            <div className="flex items-center space-x-2">
              <div className="w-3 h-0.5 bg-cyan-500"></div>
              <h2 className="text-sm font-semibold uppercase text-slate-300">
                Overview
              </h2>
            </div>

            {/* Right side button */}
            
            <button
              onClick={() => setIsModalOpen(true)} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" />
              </svg>
              <span>New Pitch</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* User Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 00-8 8v6a2 2 0 002 2h12a2 2 0 002-2v-6a8 8 0 00-8-8z" />
                  <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">  {userData?.first_name} {userData?.last_name}</h3>
                <p className="text-xs text-slate-300">
                  Founder
                </p>
              </div>
              <div className="pl-[70px]">
                <div className="text-xs text-slate-300">TOTAL PITCHES</div>
                <div className="text-xl font-bold">0</div>
                <svg
                  className="w-6 h-6 text-slate-300 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 6a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-5.356 2.113L11 15.575V18h-5v-2.425L6.356 15.1A3 3 0 015 12V6zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </div>
            </div>

            {/* Best Score Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 4a1 1 0 001-1v6a1 1 0 102 0v-6a1 1 0 001 1h2a1 1 0 100-2H8a1 1 0 00-1 1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <div className="text-xs text-slate-300">
                  BEST SCORE (LAST PITCH)
                </div>
                <div className="text-xl font-bold text-emerald-400">0/10</div>
              </div>
            </div>

            {/* Next Session Card */}
          </div>
        </div>

        {/* Main Dashboard Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Startup Profile Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">
              MY STARTUP: ECOBLOOM SUSTINNABLE TECH
            </h3>

            <div className="mb-4">
              <div className="text-sm text-slate-300 mb-2">PITCH READINESS</div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-emerald-500 h-2 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <div className="text-center text-xl font-bold mt-2">60%</div>
            </div>

            <div className="flex justify-between text-xs text-slate-300 mb-6">
              <span>Concept</span>
              <span>Market</span>
              <span>Financials</span>
              <span>Team</span>
              <span>Pitch Delivery</span>
            </div>

            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
              EDIT STARTUP PROFILE
            </button>
          </div>

          {/* Recent Feedback Card */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">RECENT FEEDBACK</h3>

            <div className="space-y-4">
              <div className="border-b border-slate-700 pb-3">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-red-500 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <div>
                    <div className="font-medium">Barbara L. (AI)</div>
                    <div className="text-sm text-red-400 italic">
                      "Financial projections unclear. Revise."
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-slate-700 pb-3">
                <div className="flex items-start space-x-2">
                  <svg
                    className="w-5 h-5 text-emerald-500 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z"
                      clipRule="evenodd"
                    />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                  <div>
                    <div className="font-medium">Mark S. (AI)</div>
                    <div className="text-sm text-emerald-400 italic">
                      "Strong problem statement. Well done."
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full mt-4">
              VIEW ALL FEEDBACK
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 bg-slate-800/50 rounded-xl p-6 text-center">
          <div>
            <NavLink
              to={"/dashboard/judges"}
              className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              BROWSE AI JUDGES
            </NavLink>
          </div>
        </div>
      </main>
      <NewPitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPitchSubmit}
      />
    </div>
  );
};

export default DashboardHome;
