

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white pt-[70px]">
      {/* Header */}
      {/* <header className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 border-b border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-xl">IP</div>
          </div>
          <div>
            <h1 className="text-2xl font-bold">INNOVATE PITCH</h1>
            <p className="text-slate-300">Hone Your Startup Pitch</p>
          </div>
        </div>
      </header> */}

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-800 min-h-screen p-4">
          <nav className="space-y-2">
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414l5-5A1 1 0 0110 9.586V18a1 1 0 001 1h4a1 1 0 001-1v-8.586a1 1 0 011.414-.586l5 5a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md bg-cyan-600 text-white cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-6 6a2 2 0 01-2.828 0l-6-6a2 2 0 012.828-2.828L9 8.586 13.586 3.586z" />
              </svg>
              <span>Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 4a1 1 0 001-1v6a1 1 0 102 0v-6a1 1 0 001 1h2a1 1 0 100-2H8a1 1 0 00-1 1zM10 15a1 1 0 001-1v-1a1 1 0 00-1-1h-1a1 1 0 00-1 1v1a1 1 0 001 1h1z" clipRule="evenodd" />
              </svg>
              <span>My Pitches</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L7 11H5v2H3v-2H1v-2h2V7h2V5h2V3h2V1h-2V0h-2v1H7v2H5V5zm9.9 9.9A7 7 0 115.05 4.05L7 7H5v2H3v2h2v2h2v2h2v2h2v-2h2v-2h2v-2h2v-2h-2V7h-2v-2H9v-2h2V1h2v1h2v2h2v2h-2v2h-2v2h-2v2h-2v2h-2v-2H7v-2h-2v-2h2V7h2V5h2V3h2V1h-2V0h-2v1H7v2H5V5z" clipRule="evenodd" />
              </svg>
              <span>Recorded Sessions</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 004-4v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2a4 4 0 004 4h8z" />
              </svg>
              <span>AI Judges</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M4 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 18.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 13.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM8 4.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM4 9.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
              <span>Score</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 4a1 1 0 001-1v6a1 1 0 102 0v-6a1 1 0 001 1h2a1 1 0 100-2H8a1 1 0 00-1 1zM10 15a1 1 0 001-1v-1a1 1 0 00-1-1h-1a1 1 0 00-1 1v1a1 1 0 001 1h1z" clipRule="evenodd" />
              </svg>
              <span>Analytics</span>
            </div>
            
            <div className="flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-slate-700 cursor-pointer">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.63-1.56-3 0a1.5 1.5 0 00-1.5 1.5c0 1.026 1.742 1.97 3 1.97 1.258 0 3-.944 3-1.97a1.5 1.5 0 00-1.5-1.5zm-1 5a1 1 0 110-2 1 1 0 010 2z" clipRule="evenodd" />
                <path d="M8 7a4 4 0 118 0 4 4 0 01-8 0z" />
                <path d="M12 14a3 3 0 110-6 3 3 0 010 6zm0 2a5 5 0 110-10 5 5 0 010 10z" />
              </svg>
              <span>Settings</span>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Overview Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-3 h-0.5 bg-cyan-500"></div>
              <h2 className="text-sm font-semibold uppercase text-slate-300">Overview</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* User Info Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 00-8 8v6a2 2 0 002 2h12a2 2 0 002-2v-6a8 8 0 00-8-8z" />
                    <path d="M10 6a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold">Alex Chen</h3>
                  <p className="text-xs text-slate-300">Founder, Ecoloom Sustainable Tech</p>
                </div>
                <div className="ml-auto">
                  <div className="text-xs text-slate-300">TOTAL PITCHES</div>
                  <div className="text-xl font-bold">12</div>
                  <svg className="w-6 h-6 text-slate-300 mt-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 6a3 3 0 013-3h10a3 3 0 013 3v8a3 3 0 01-5.356 2.113L11 15.575V18h-5v-2.425L6.356 15.1A3 3 0 015 12V6zM10 11a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </div>
              </div>
              
              {/* Best Score Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3 4a1 1 0 001-1v6a1 1 0 102 0v-6a1 1 0 001 1h2a1 1 0 100-2H8a1 1 0 00-1 1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-300">BEST SCORE (LAST PITCH)</div>
                  <div className="text-xl font-bold text-emerald-400">7.8/10</div>
                </div>
              </div>
              
              {/* Next Session Card */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 flex items-center space-x-4">
                <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-slate-300">NEXT SESSION</div>
                  <div className="text-sm">Tomorrow, 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Dashboard Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Startup Profile Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">MY STARTUP: ECOBLOOM SUSTINNABLE TECH</h3>
              
              <div className="mb-4">
                <div className="text-sm text-slate-300 mb-2">PITCH READINESS</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full" style={{width: '60%'}}></div>
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
                    <svg className="w-5 h-5 text-red-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">Barbara L. (AI)</div>
                      <div className="text-sm text-red-400 italic">"Financial projections unclear. Revise."</div>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-slate-700 pb-3">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-emerald-500 mt-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 11-2 0 1 1 0 012 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">Mark S. (AI)</div>
                      <div className="text-sm text-emerald-400 italic">"Strong problem statement. Well done."</div>
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
            <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors mb-4">
              START A NEW PRACTICE PITCH
            </button>
            <div>
              <button className="bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-6 rounded-md transition-colors">
                BROWSE AI JUDGES
              </button>
            </div>
          </div>
        </main>
      </div>
      
     
     
    </div>
  );
};

export default Dashboard;