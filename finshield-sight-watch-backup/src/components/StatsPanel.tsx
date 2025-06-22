
import { Activity, Shield, AlertTriangle, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export const StatsPanel = () => {
  const stats = [
    {
      label: "Active Monitoring",
      value: "24/7",
      icon: Activity,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      label: "Protected Areas",
      value: "1,247",
      icon: Shield,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      label: "Alerts Today",
      value: "23",
      icon: AlertTriangle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      label: "Success Rate",
      value: "94%",
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    }
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-white mb-4">System Overview</h2>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${stat.bgColor} border border-slate-600`}
            >
              <div className="flex items-center justify-between mb-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
