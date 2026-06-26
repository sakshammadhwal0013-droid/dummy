import { useState, useEffect } from "react";
import { 
  LayoutDashboard, 
  Ticket, 
  MapPin, 
  Building2, 
  Users, 
  Settings, 
  LogOut,
  TrendingUp,
  Search,
  Menu,
  X
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { cn } from "../lib/utils";
import { SEO } from "../components/SEO";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from "recharts";

const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
];

const bookingsData = [
  { name: 'Mon', flights: 12, hotels: 8, tours: 3 },
  { name: 'Tue', flights: 15, hotels: 10, tours: 4 },
  { name: 'Wed', flights: 10, hotels: 7, tours: 2 },
  { name: 'Thu', flights: 18, hotels: 12, tours: 5 },
  { name: 'Fri', flights: 20, hotels: 15, tours: 8 },
  { name: 'Sat', flights: 25, hotels: 20, tours: 12 },
  { name: 'Sun', flights: 22, hotels: 18, tours: 10 },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [stats, setStats] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<{ categoryBreakdown: any[], trendingItems: any[] } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [statsRes, bookingsRes, analyticsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/bookings'),
          fetch('/api/admin/analytics')
        ]);
        
        if (statsRes.ok && bookingsRes.ok && analyticsRes.ok) {
          const statsData = await statsRes.json();
          const bookingsData = await bookingsRes.json();
          const analyticsData = await analyticsRes.json();
          setStats(statsData);
          setRecentBookings(bookingsData);
          setAnalytics(analyticsData);
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      <SEO 
        title="Admin Dashboard - Safarnama Travel Management System"
        description="Safarnama admin dashboard for managing bookings, tours, hotels, and users."
      />
      {/* Sidebar Overlay logic for mobile */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute top-4 left-4 z-50 p-2 bg-slate-800 rounded-md text-white md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed md:relative z-40 w-64 h-full bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20 lg:w-64"
      )}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-rose-600 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">
              S
            </div>
            {(isSidebarOpen || window.innerWidth > 1024) && (
              <span className="text-xl font-black tracking-tight text-white hidden lg:block md:hidden sm:block">Admin Panel</span>
            )}
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-6">
          <nav className="space-y-1 px-3">
            {[
              { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
              { id: "bookings", name: "Bookings", icon: Ticket },
              { id: "tours", name: "Tours Mgmt", icon: MapPin },
              { id: "hotels", name: "Hotels Mgmt", icon: Building2 },
              { id: "customers", name: "Customers", icon: Users },
              { id: "settings", name: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm",
                    isActive 
                      ? "bg-gradient-to-r from-orange-500/20 to-rose-500/10 text-orange-400 border border-orange-500/30" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  )}
                  title={item.name}
                >
                  <Icon className={cn("w-5 h-5", isActive ? "text-orange-400" : "text-slate-500")} />
                  <span className={cn("whitespace-nowrap transition-opacity", !isSidebarOpen && "md:hidden lg:inline-block")}>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all font-medium text-sm text-slate-400 hover:bg-red-500/10 hover:text-red-400"
          >
            <LogOut className="w-5 h-5" />
            <span className={cn("whitespace-nowrap", !isSidebarOpen && "md:hidden lg:inline-block")}>Back to Website</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-950">
        
        {/* Top Header */}
        <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search bookings, users..." 
                className="bg-slate-800 border-none rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:ring-1 focus:ring-orange-500 outline-none w-64"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-white">Admin User</p>
                <p className="text-xs text-slate-400">Management Team</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`} alt="Admin" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Workspace */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          
          {/* Header Title */}
          <div className="mb-8 pl-10 md:pl-0">
            <h1 className="text-2xl font-black text-white capitalize">Admin Dashboard: {activeTab.replace("Mgmt", "Management")}</h1>
            <p className="text-slate-400 text-sm mt-1">Manage everything related to {activeTab}.</p>
          </div>

          {/* DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                    <p className="text-sm text-slate-400 font-medium">{stat.name}</p>
                    <div className="mt-2 flex items-baseline gap-3">
                      <div className="text-3xl font-black text-white">{stat.value}</div>
                      <span className={cn(
                        "text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1",
                        stat.trend === "up" ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"
                      )}>
                        {stat.trend === "up" ? "↑" : "↓"} {stat.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-lg font-bold text-white mb-6">Revenue Growth</h2>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                          itemStyle={{ color: '#f97316' }}
                        />
                        <Area type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Bookings Chart */}
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                  <h2 className="text-lg font-bold text-white mb-6">Weekly Bookings by Type</h2>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={bookingsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                          cursor={{ fill: '#1e293b' }}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Bar dataKey="flights" name="Flights" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="hotels" name="Hotels" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="tours" name="Tours" fill="#10b981" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                 </div>

                 {/* Real Data Category Breakdown Chart */}
                 <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                   <h2 className="text-lg font-bold text-white mb-6">Bookings by Category (Real Data)</h2>
                   <div className="h-[300px] w-full">
                     {analytics && analytics.categoryBreakdown ? (
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={analytics.categoryBreakdown} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                           <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                           <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                           <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                           <Tooltip 
                             contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '0.5rem', color: '#f8fafc' }}
                             cursor={{ fill: '#1e293b' }}
                           />
                           <Bar dataKey="value" name="Total Bookings" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                     ) : (
                       <div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading analytics...</div>
                     )}
                   </div>
                 </div>
               </div>

               {/* Trending Items List */}
               <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                 <h2 className="text-lg font-bold text-white mb-4">Top Trending Items</h2>
                 {analytics && analytics.trendingItems ? (
                   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                     {analytics.trendingItems.map((item, idx) => (
                       <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
                         <div>
                           <p className="text-sm font-bold text-white truncate max-w-[180px]">{item.name}</p>
                           <p className="text-xs text-slate-500 font-medium mt-1">{item.type}</p>
                         </div>
                         <div className="bg-orange-500/10 text-orange-400 font-bold text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                           {item.bookings} Bookings
                         </div>
                       </div>
                     ))}
                   </div>
                 ) : (
                    <div className="text-slate-500 text-sm">Loading trending items...</div>
                 )}
               </div>

               {/* Recent Bookings Table */}
               <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-white">Recent Transactions</h2>
                  <button onClick={() => setActiveTab("bookings")} className="text-sm text-orange-400 font-medium hover:text-orange-300 transition-colors">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-950/50">
                      <tr>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Booking ID</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Customer</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Service</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Destination</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                        <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                      {recentBookings.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((booking, idx) => (
                        <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                          <td className="p-4 text-sm font-medium text-slate-300">{booking.id}</td>
                          <td className="p-4 text-sm text-white font-medium">{booking.user}</td>
                          <td className="p-4 text-sm text-slate-400">{booking.type}</td>
                          <td className="p-4 text-sm text-slate-400">{booking.destination}</td>
                          <td className="p-4 text-sm text-slate-400">{booking.date}</td>
                          <td className="p-4 text-sm font-medium text-slate-200">{booking.amount}</td>
                          <td className="p-4 text-sm">
                            <span className={cn(
                              "px-3 py-1 text-xs font-bold rounded-full",
                              booking.status === "Confirmed" ? "bg-emerald-500/10 text-emerald-400" :
                              booking.status === "Pending" ? "bg-amber-500/10 text-amber-400" :
                              "bg-rose-500/10 text-rose-400"
                            )}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="p-4 text-sm text-right space-x-2">
                            {booking.status === "Pending" && (
                              <>
                                <button 
                                  onClick={async () => {
                                    await fetch(`/api/admin/bookings/${booking.id}/status`, {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ status: "Confirmed" })
                                    });
                                    // simple local reload for now
                                    window.location.reload();
                                  }}
                                  className="text-xs font-bold text-emerald-400 hover:text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20 px-2 py-1 rounded"
                                >
                                  Accept
                                </button>
                                <button 
                                  onClick={async () => {
                                    await fetch(`/api/admin/bookings/${booking.id}/status`, {
                                      method: "POST",
                                      headers: { "Content-Type": "application/json" },
                                      body: JSON.stringify({ status: "Cancelled" })
                                    });
                                    window.location.reload();
                                  }}
                                  className="text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 px-2 py-1 rounded"
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 border-t border-slate-800 flex items-center justify-between">
                  <p className="text-sm text-slate-400 font-medium">
                    Showing <span className="text-white">{Math.min((currentPage - 1) * itemsPerPage + 1, recentBookings.length)}</span> to <span className="text-white">{Math.min(currentPage * itemsPerPage, recentBookings.length)}</span> of <span className="text-white">{recentBookings.length}</span> results
                  </p>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <button 
                      onClick={() => setCurrentPage(p => Math.min(Math.ceil(recentBookings.length / itemsPerPage), p + 1))}
                      disabled={currentPage === Math.ceil(recentBookings.length / itemsPerPage) || Math.ceil(recentBookings.length / itemsPerPage) === 0}
                      className="px-3 py-1.5 rounded-lg text-sm font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PLACEHOLDER FOR OTHER VIEWS */}
          {activeTab !== "dashboard" && (
            <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900 border border-slate-800 rounded-2xl border-dashed">
              <div className="w-16 h-16 bg-slate-800 text-slate-500 rounded-full flex items-center justify-center mb-4">
                <Settings className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold text-white mb-2">{activeTab.replace("Mgmt", "Management")} Module</h2>
              <p className="text-slate-400 max-w-sm mx-auto">This module is currently in development. You will be able to manage this data here.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
