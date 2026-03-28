import { motion } from "framer-motion";
import { BookOpen, Users, BookMarked, AlertTriangle, CreditCard, UserPlus, Plus, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const kpis = [
  { label: "Total Books", value: "12,500", icon: BookOpen, color: "bg-primary" },
  { label: "Members", value: "3,200", icon: Users, color: "bg-accent text-accent-foreground" },
  { label: "Active Borrows", value: "847", icon: BookMarked, color: "bg-success" },
  { label: "Overdue", value: "23", icon: AlertTriangle, color: "bg-destructive text-destructive-foreground" },
  { label: "Fines Revenue", value: "$1,250", icon: CreditCard, color: "bg-secondary text-secondary-foreground" },
  { label: "New This Month", value: "142", icon: UserPlus, color: "bg-primary" },
];

const borrowsPerDay = Array.from({ length: 14 }, (_, i) => ({
  day: `Mar ${15 + i}`,
  borrows: Math.floor(Math.random() * 40) + 10,
}));

const topBooks = [
  { title: "Atomic Habits", borrows: 89 },
  { title: "1984", borrows: 76 },
  { title: "The Hobbit", borrows: 65 },
  { title: "Dune", borrows: 58 },
  { title: "Sapiens", borrows: 52 },
];

const genreData = [
  { name: "Fiction", value: 35, color: "#FFE500" },
  { name: "Non-Fiction", value: 20, color: "#FF2D78" },
  { name: "Sci-Fi", value: 15, color: "#0038FF" },
  { name: "Fantasy", value: 18, color: "#00FF85" },
  { name: "Other", value: 12, color: "#F5F0E8" },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const AdminHome = () => {
  return (
    <div className="space-y-8">
      <h1 className="font-heading text-3xl font-black">Admin Dashboard</h1>

      {/* KPIs */}
      <motion.div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" variants={container} initial="hidden" animate="show">
        {kpis.map((k) => (
          <motion.div key={k.label} variants={item} className="brutal-card p-4 rounded-lg">
            <div className={`w-10 h-10 ${k.color} rounded-lg brutal-border flex items-center justify-center mb-2`}>
              <k.icon className="w-5 h-5" />
            </div>
            <div className="font-heading text-xl font-black">{k.value}</div>
            <div className="text-xs text-muted-foreground font-semibold">{k.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="brutal-card p-6 rounded-lg">
          <h3 className="font-heading font-bold mb-4">Borrows (Last 14 Days)</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={borrowsPerDay}>
              <XAxis dataKey="day" tick={{ fontSize: 10, fontWeight: 700 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="borrows" stroke="#FF2D78" strokeWidth={3} dot={{ r: 4, fill: "#FF2D78", stroke: "#000", strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="brutal-card p-6 rounded-lg">
          <h3 className="font-heading font-bold mb-4">Top Borrowed Books</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={topBooks} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="title" type="category" tick={{ fontSize: 10, fontWeight: 700 }} width={100} />
              <Tooltip />
              <Bar dataKey="borrows" fill="#FFE500" stroke="#000" strokeWidth={2} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="brutal-card p-6 rounded-lg">
          <h3 className="font-heading font-bold mb-4">Borrows by Genre</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={genreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} stroke="#000" strokeWidth={2}>
                {genreData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {genreData.map((g) => (
              <span key={g.name} className="flex items-center gap-1 text-xs font-bold">
                <span className="w-3 h-3 rounded-full brutal-border" style={{ backgroundColor: g.color }} />
                {g.name}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="brutal-card p-6 rounded-lg">
          <h3 className="font-heading font-bold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link to="/admin/books" className="brutal-btn bg-primary text-primary-foreground rounded-md font-heading flex items-center gap-2">
              <Plus className="w-5 h-5" /> Add Book
            </Link>
            <Link to="/admin/members" className="brutal-btn bg-accent text-accent-foreground rounded-md font-heading flex items-center gap-2">
              <UserPlus className="w-5 h-5" /> Add Member
            </Link>
            <Link to="/admin/announcements" className="brutal-btn bg-secondary text-secondary-foreground rounded-md font-heading flex items-center gap-2">
              <Megaphone className="w-5 h-5" /> Send Announcement
            </Link>
          </div>

          <h3 className="font-heading font-bold mt-6 mb-3">Live Activity</h3>
          <div className="space-y-2">
            {["Sarah K. borrowed Atomic Habits", "Mike R. returned 1984", "New member: Emma W.", "Reservation ready: Dune"].map((a, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span>{a}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
