import { Clock, MapPin, Lightbulb, ArrowRight } from "lucide-react";
import type { ItineraryStop } from "@/data/mockData";

const typeIcons: Record<string, string> = {
  restaurant: "🍽️",
  cafe: "☕",
  shop: "🛍️",
  park: "🌳",
  bar: "🍸",
  cultural: "🎭",
  walk: "🚶",
};

const safetyColors: Record<string, string> = {
  safe: "bg-safety-safe/10 text-safety-safe",
  caution: "bg-safety-caution/10 text-safety-caution",
  warning: "bg-safety-warning/10 text-safety-warning",
};

const safetyLabels: Record<string, string> = {
  safe: "Safe area",
  caution: "Use caution",
  warning: "Stay alert",
};

export default function PlaceCard({ stop }: { stop: ItineraryStop }) {
  return (
    <div className="bg-card rounded-xl border border-border p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{typeIcons[stop.type]}</span>
          <div>
            <h3 className="font-display font-semibold text-lg leading-tight">{stop.name}</h3>
            <div className="flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3 h-3 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">{stop.neighborhood}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <span className="text-sm font-semibold font-body">{stop.time}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${safetyColors[stop.safetyScore]}`}>
            {safetyLabels[stop.safetyScore]}
          </span>
        </div>
      </div>

      <p className="text-sm text-foreground/80 mb-3 leading-relaxed">{stop.description}</p>

      <div className="bg-accent/10 rounded-lg p-3 mb-3 flex gap-2">
        <Lightbulb className="w-4 h-4 text-accent shrink-0 mt-0.5" />
        <p className="text-xs text-foreground/70 leading-relaxed">{stop.localTip}</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {stop.duration}</span>
          <span className="flex items-center gap-1"><ArrowRight className="w-3 h-3" /> {stop.transport}</span>
        </div>
        <div className="flex gap-1.5">
          {stop.vibes.map(v => (
            <span key={v} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{v}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
