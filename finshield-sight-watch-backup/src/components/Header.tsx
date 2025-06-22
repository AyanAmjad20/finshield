
import { Shield, Waves, Activity } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-sm border-b border-emerald-500/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Shield className="h-8 w-8 text-emerald-400" />
            <Waves className="h-4 w-4 text-blue-400 absolute -bottom-1 -right-1" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">FinShield</h1>
            <p className="text-sm text-emerald-300">Marine Conservation Monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-emerald-400">
            <Activity className="h-4 w-4 animate-pulse" />
            <span className="text-sm font-medium">System Active</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-300">Global Coverage</div>
            <div className="text-xs text-emerald-300">24/7 Monitoring</div>
          </div>
        </div>
      </div>
    </header>
  );
};
