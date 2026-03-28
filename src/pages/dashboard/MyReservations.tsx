import { motion } from "framer-motion";
import { Clock, CheckCircle, XCircle, BookOpen } from "lucide-react";
import { mockReservations } from "@/lib/mockData";

const statusConfig = {
  pending: { icon: Clock, color: "bg-accent text-accent-foreground", label: "Pending" },
  ready: { icon: CheckCircle, color: "bg-success text-success-foreground", label: "Ready for Pickup" },
  cancelled: { icon: XCircle, color: "bg-destructive text-destructive-foreground", label: "Cancelled" },
  fulfilled: { icon: CheckCircle, color: "bg-muted text-muted-foreground", label: "Fulfilled" },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

const MyReservations = () => {
  return (
    <div className="space-y-6">
      <h1 className="font-heading text-3xl font-black">My Reservations</h1>

      <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
        {mockReservations.map((r) => {
          const config = statusConfig[r.status];
          const Icon = config.icon;
          const daysLeft = Math.ceil((new Date(r.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

          return (
            <motion.div key={r.id} variants={item} className="brutal-card p-4 rounded-lg flex items-center gap-4">
              <div className="w-16 h-20 bg-muted brutal-border rounded-md flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-6 h-6 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <h3 className="font-heading font-bold">{r.bookTitle}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Reserved: {new Date(r.reservedAt).toLocaleDateString()}
                </p>
                <p className="text-xs text-muted-foreground">
                  Expires in {daysLeft > 0 ? `${daysLeft} days` : "expired"}
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className={`${config.color} px-2 py-0.5 text-xs font-bold rounded brutal-border flex items-center gap-1`}>
                  <Icon className="w-3 h-3" /> {config.label}
                </span>
                {r.status === "pending" && (
                  <button className="brutal-btn bg-destructive text-destructive-foreground rounded-md text-xs px-3 py-1 font-heading">
                    Cancel
                  </button>
                )}
                {r.status === "ready" && (
                  <button className="brutal-btn bg-primary text-primary-foreground rounded-md text-xs px-3 py-1 font-heading">
                    Pick Up
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default MyReservations;
