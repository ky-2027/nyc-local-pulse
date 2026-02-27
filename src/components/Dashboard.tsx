import { useState } from "react";
import { motion } from "framer-motion";
import { Map, List, Shield, Sun, Moon } from "lucide-react";
import ItineraryView from "./ItineraryView";
import MapView from "./MapView";
import SafetyMapView from "./SafetyMapView";

const tabs = [
  { id: "itinerary", label: "Itinerary", icon: List },
  { id: "map", label: "Map", icon: Map },
  { id: "safety", label: "Safety", icon: Shield },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("itinerary");
  const [nightMode, setNightMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-xl">As A Local</h1>
              <p className="text-xs text-muted-foreground">3-day NYC itinerary</p>
            </div>
            <button
              onClick={() => setNightMode(!nightMode)}
              className="p-2 rounded-lg bg-card border border-border hover:bg-secondary transition-colors"
              title={nightMode ? "Day mode" : "Night mode"}
            >
              {nightMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="sticky top-[57px] z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors relative ${
                    activeTab === tab.id ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Night mode banner */}
      {nightMode && (
        <div className="bg-nyc-charcoal text-nyc-cream">
          <div className="max-w-lg mx-auto px-4 py-2 flex items-center gap-2 text-xs">
            <Moon className="w-3.5 h-3.5 text-nyc-gold" />
            <span>Night mode: Showing evening-safe routes & well-lit corridors</span>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-lg mx-auto px-4 pt-4">
        {activeTab === "itinerary" && <ItineraryView />}
        {activeTab === "map" && <MapView />}
        {activeTab === "safety" && <SafetyMapView />}
      </main>
    </div>
  );
}
