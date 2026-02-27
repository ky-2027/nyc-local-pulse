import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Shield, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mockSafetyIncidents, neighborhoodVibes } from "@/data/mockData";
import mapPlaceholder from "@/assets/map-placeholder.webp";

const severityStyles: Record<string, string> = {
  low: "bg-safety-safe/10 text-safety-safe border-safety-safe/20",
  medium: "bg-safety-caution/10 text-safety-caution border-safety-caution/20",
  high: "bg-safety-warning/10 text-safety-warning border-safety-warning/20",
};

const severityDots: Record<string, string> = {
  low: "bg-safety-safe",
  medium: "bg-safety-caution",
  high: "bg-safety-warning",
};

const timeFilters = ["Last hour", "Today", "This week"];
const typeFilters = ["All", "Theft", "Assault", "Disturbance", "Robbery"];

export default function SafetyMapView() {
  const [timeFilter, setTimeFilter] = useState("This week");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedIncident, setSelectedIncident] = useState<string | null>(null);

  const filtered = mockSafetyIncidents.filter(i => typeFilter === "All" || i.type === typeFilter);

  return (
    <div className="pb-6 space-y-4">
      {/* Map placeholder */}
      <div className="relative rounded-xl overflow-hidden border border-border h-56">
        <img src={mapPlaceholder} alt="NYC safety map" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-foreground">
            <Shield className="w-4 h-4 text-accent" />
            <span className="font-medium">Live Safety Map — NYC</span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-safety-safe" /> Safe</span>
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-safety-caution" /> Caution</span>
            <span className="flex items-center gap-1 text-xs"><span className="w-2 h-2 rounded-full bg-safety-warning" /> Alert</span>
          </div>
        </div>
        {/* Dots overlaying the map */}
        {filtered.map(inc => (
          <button
            key={inc.id}
            onClick={() => setSelectedIncident(inc.id === selectedIncident ? null : inc.id)}
            className={`absolute w-3 h-3 rounded-full ${severityDots[inc.severity]} ring-2 ring-background animate-pulse`}
            style={{
              left: `${((inc.lng + 74.05) / 0.15) * 100}%`,
              top: `${((40.85 - inc.lat) / 0.15) * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex gap-1.5 flex-wrap">
            {timeFilters.map(t => (
              <button key={t} onClick={() => setTimeFilter(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  timeFilter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>{t}</button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-muted-foreground" />
          <div className="flex gap-1.5 flex-wrap">
            {typeFilters.map(t => (
              <button key={t} onClick={() => setTypeFilter(t)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                  typeFilter === t ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
                }`}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Incidents */}
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-lg">Recent Incidents</h3>
        {filtered.map((inc, i) => (
          <motion.div
            key={inc.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setSelectedIncident(inc.id === selectedIncident ? null : inc.id)}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${severityStyles[inc.severity]} ${
              selectedIncident === inc.id ? "ring-2 ring-accent" : ""
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <div>
                  <span className="text-sm font-semibold">{inc.type}</span>
                  <span className="text-xs text-muted-foreground ml-2">{inc.location}</span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{inc.time}</span>
            </div>
            {selectedIncident === inc.id && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs mt-2 text-foreground/70">
                {inc.description}
              </motion.p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Neighborhood Vibes */}
      <div className="space-y-2">
        <h3 className="font-display font-semibold text-lg">Neighborhood Vibes</h3>
        <div className="grid gap-2">
          {Object.entries(neighborhoodVibes).map(([name, info]) => (
            <div key={name} className="p-3 rounded-lg bg-card border border-border">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-sm">{name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  info.safety === "Very Safe" ? "bg-safety-safe/10 text-safety-safe" :
                  info.safety === "Safe" ? "bg-safety-safe/10 text-safety-safe" :
                  "bg-safety-caution/10 text-safety-caution"
                }`}>{info.safety}</span>
              </div>
              <p className="text-xs text-muted-foreground">{info.description}</p>
              <div className="flex gap-2 mt-1.5">
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">{info.vibe}</span>
                <span className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">Best: {info.bestTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
