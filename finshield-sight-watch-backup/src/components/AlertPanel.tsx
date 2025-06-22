
import { AlertTriangle, Clock, MapPin, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface Alert {
  id: number;
  location: string;
  timestamp: string;
  severity: string;
  type: string;
  status: string;
}

interface AlertPanelProps {
  alerts: Alert[];
  onAlertSelect: (alert: Alert) => void;
  selectedAlert: Alert | null;
}

export const AlertPanel = ({ alerts, onAlertSelect, selectedAlert }: AlertPanelProps) => {
  const navigate = useNavigate();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-500/10';
      case 'medium': return 'border-yellow-500 bg-yellow-500/10';
      case 'low': return 'border-green-500 bg-green-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getSeverityTextColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const handleInvestigate = (alert: Alert) => {
    navigate("/investigation", { state: { alert } });
  };

  return (
    <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm h-full">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Active Alerts</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-sm text-red-400">Live</span>
          </div>
        </div>

        <div className="space-y-3">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02] ${
                getSeverityColor(alert.severity)
              } ${
                selectedAlert?.id === alert.id ? 'ring-2 ring-emerald-500' : ''
              }`}
              onClick={() => onAlertSelect(alert)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className={`h-4 w-4 ${getSeverityTextColor(alert.severity)}`} />
                  <span className={`text-sm font-medium ${getSeverityTextColor(alert.severity)} uppercase`}>
                    {alert.severity}
                  </span>
                </div>
                <span className="text-xs text-gray-400 capitalize">{alert.status}</span>
              </div>

              <h3 className="text-white font-medium mb-2">{alert.type}</h3>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-300">
                  <MapPin className="h-3 w-3" />
                  <span className="text-xs">{alert.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300">
                  <Clock className="h-3 w-3" />
                  <span className="text-xs">{alert.timestamp}</span>
                </div>
              </div>

              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mt-3 bg-emerald-600/20 border-emerald-500 text-emerald-300 hover:bg-emerald-600/30"
                onClick={(e) => {
                  e.stopPropagation();
                  handleInvestigate(alert);
                }}
              >
                <Eye className="h-3 w-3 mr-2" />
                Investigate
              </Button>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
