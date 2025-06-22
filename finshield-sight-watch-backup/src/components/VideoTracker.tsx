
import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Target, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface VideoTrackerProps {
  selectedAlert: any;
}

export const VideoTracker = ({ selectedAlert }: VideoTrackerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [trackingActive, setTrackingActive] = useState(false);
  const [finHealth, setFinHealth] = useState<'healthy' | 'damaged' | 'analyzing'>('analyzing');
  const [confidence, setConfidence] = useState(0);

  useEffect(() => {
    if (selectedAlert && isPlaying) {
      setTrackingActive(true);
      // Simulate AI analysis
      const timer = setTimeout(() => {
        setFinHealth(Math.random() > 0.5 ? 'healthy' : 'damaged');
        setConfidence(Math.floor(Math.random() * 20) + 80);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [selectedAlert, isPlaying]);

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-400';
      case 'damaged': return 'text-red-400';
      case 'analyzing': return 'text-yellow-400';
      default: return 'text-gray-400';
    }
  };

  const getHealthStatus = (health: string) => {
    switch (health) {
      case 'healthy': return 'Fin Intact - No Damage Detected';
      case 'damaged': return 'Fin Damage Detected - Alert Authorities';
      case 'analyzing': return 'Analyzing Fin Condition...';
      default: return 'No Data Available';
    }
  };

  if (!selectedAlert) {
    return (
      <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm h-full">
        <div className="p-6 h-full flex items-center justify-center">
          <div className="text-center">
            <Target className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">Fin Tracker</h3>
            <p className="text-gray-400">Select an alert to begin tracking</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800/50 border-slate-600 backdrop-blur-sm h-full">
      <div className="p-6 h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Fin Tracker</h2>
          <div className="flex items-center space-x-2">
            {trackingActive && (
              <>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-400">Tracking</span>
              </>
            )}
          </div>
        </div>

        {/* Video Placeholder */}
        <div className="relative bg-slate-900 rounded-lg mb-4 flex-1 min-h-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-slate-800/50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-24 bg-slate-700 rounded mb-4 mx-auto flex items-center justify-center">
                <span className="text-4xl">🦈</span>
              </div>
              <p className="text-gray-300 text-sm">Live Shark Footage</p>
            </div>
          </div>

          {/* Tracking Overlay */}
          {trackingActive && (
            <div className="absolute inset-0 pointer-events-none">
              {/* Fin tracking box */}
              <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-16 h-12 border-2 border-emerald-400 bg-emerald-400/10 rounded animate-pulse">
                  <div className="absolute -top-6 left-0 text-emerald-400 text-xs font-medium">
                    Dorsal Fin
                  </div>
                </div>
              </div>
              
              {/* Scanning lines */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-400/10 to-transparent animate-pulse" />
            </div>
          )}

          {/* Play Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <Button
              size="sm"
              variant="outline"
              className="bg-slate-800/80 border-slate-600"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="bg-slate-800/80 border-slate-600"
              onClick={() => {
                setIsPlaying(false);
                setTrackingActive(false);
                setFinHealth('analyzing');
              }}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Analysis Results */}
        <div className="space-y-4">
          <div className="bg-slate-700/50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Fin Condition</span>
              <AlertCircle className={`h-4 w-4 ${getHealthColor(finHealth)}`} />
            </div>
            <p className={`text-sm font-medium ${getHealthColor(finHealth)}`}>
              {getHealthStatus(finHealth)}
            </p>
            {confidence > 0 && (
              <div className="mt-2">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Confidence</span>
                  <span>{confidence}%</span>
                </div>
                <Progress value={confidence} className="h-2" />
              </div>
            )}
          </div>

          <div className="bg-slate-700/50 p-4 rounded-lg">
            <h4 className="text-sm font-medium text-white mb-2">Detection Metrics</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-gray-400">Species:</span>
                <p className="text-white">Great White</p>
              </div>
              <div>
                <span className="text-gray-400">Size:</span>
                <p className="text-white">4.2m</p>
              </div>
              <div>
                <span className="text-gray-400">Depth:</span>
                <p className="text-white">15m</p>
              </div>
              <div>
                <span className="text-gray-400">Speed:</span>
                <p className="text-white">12 km/h</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
