import { motion } from "framer-motion";
import { Bell, AlertTriangle, Clock, CheckCircle, Info, Check } from "lucide-react";
import { mockNotifications } from "@/lib/mockData";

const typeConfig = {
  due_soon: { icon: Clock, color: "border-l-4 border-l-accent" },
  overdue: { icon: AlertTriangle, color: "border-l-4 border-l-destructive" },
  ready: { icon: CheckCircle, color: "border-l-4 border-l-success" },
  fine: { icon: AlertTriangle, color: "border-l-4 border-l-primary" },
  system: { icon: Info, color: "border-l-4 border-l-muted-foreground" },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } };

const Notifications = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-3xl font-black">Notifications</h1>
        <button className="brutal-btn bg-background rounded-md text-sm font-heading flex items-center gap-2">
          <Check className="w-4 h-4" /> Mark All Read
        </button>
      </div>

      <motion.div className="space-y-3" variants={container} initial="hidden" animate="show">
        {mockNotifications.map((n) => {
          const config = typeConfig[n.type] || typeConfig.system;
          const Icon = config.icon;
          return (
            <motion.div
              key={n.id}
              variants={item}
              className={`brutal-card p-4 rounded-lg ${config.color} ${n.read ? "opacity-60" : ""}`}
            >
              <div className="flex items-start gap-3">
                <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-heading font-bold text-sm">{n.title}</h3>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                </div>
                {!n.read && (
                  <span className="w-2 h-2 bg-secondary rounded-full flex-shrink-0 mt-2" />
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default Notifications;
