import { MapPin, Navigation } from "lucide-react";
import mapPlaceholder from "@/assets/map-placeholder.webp";
import { mockItinerary } from "@/data/mockData";
import { useState } from "react";

const safetyColors: Record<string, string> = {
  safe: "bg-safety-safe",
  caution: "bg-safety-caution",
  warning: "bg-safety-warning",
};

export default function MapView() {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = mockItinerary[selectedDay];

  return (
    <div className="pb-6 space-y-4">
      {/* Map */}
      <div className="relative rounded-xl overflow-hidden border border-border h-72">
        <img src={mapPlaceholder} alt="NYC itinerary map" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        <div className="absolute top-3 left-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center gap-2 text-sm">
            <Navigation className="w-4 h-4 text-accent" />
            <span className="font-medium">Day {day.day} Route</span>
          </div>
        </div>
        {/* Route confidence */}
        <div className="absolute bottom-3 left-3 right-3 bg-card/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">Route Confidence</span>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-safety-safe rounded-full" style={{ width: "82%" }} />
              </div>
              <span className="font-semibold">82%</span>
            </div>
          </div>
          <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
            <span>🔦 Well-lit corridors</span>
            <span>👥 High foot traffic</span>
          </div>
        </div>
      </div>

      {/* Day selector */}
      <div className="flex gap-2">
        {mockItinerary.map((d, i) => (
          <button key={i} onClick={() => setSelectedDay(i)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedDay === i ? "bg-primary text-primary-foreground" : "bg-card text-foreground border border-border"
            }`}>
            Day {d.day}
          </button>
        ))}
      </div>

      {/* Stop list */}
      <div className="space-y-2">
        {day.stops.map((stop, i) => (
          <div key={stop.id} className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border">
            <div className="flex flex-col items-center">
              <span className="text-xs font-bold text-muted-foreground">{i + 1}</span>
              <div className={`w-2.5 h-2.5 rounded-full mt-1 ${safetyColors[stop.safetyScore]}`} />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium truncate block">{stop.name}</span>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" /> {stop.address}
              </div>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{stop.time}</span>
          </div>
        ))}
      </div>

      {/* Transport recommendations */}
      <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
        <h4 className="font-display font-semibold text-sm mb-2">🚕 Getting Around Today</h4>
        <div className="space-y-1.5 text-xs text-foreground/70">
          <p>• Morning: Walk between Village stops (safe, scenic routes)</p>
          <p>• Afternoon: L train to Williamsburg (well-lit, busy station)</p>
          <p>• Evening: Taxi recommended after 10pm from Harlem</p>
        </div>
      </div>
    </div>
  );
}
