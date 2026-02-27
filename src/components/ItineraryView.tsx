import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlaceCard from "./PlaceCard";
import { mockItinerary } from "@/data/mockData";

export default function ItineraryView() {
  const [dayIndex, setDayIndex] = useState(0);
  const day = mockItinerary[dayIndex];

  return (
    <div className="pb-6">
      {/* Day Selector */}
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="icon" disabled={dayIndex === 0} onClick={() => setDayIndex(dayIndex - 1)}>
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">{day.date}</span>
          </div>
          <h2 className="font-display font-bold text-xl">Day {day.day}</h2>
        </div>
        <Button variant="ghost" size="icon" disabled={dayIndex === mockItinerary.length - 1} onClick={() => setDayIndex(dayIndex + 1)}>
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground mb-6 italic">{day.theme}</p>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-4">
          {day.stops.map((stop, i) => (
            <motion.div
              key={stop.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="relative pl-14"
            >
              <div className="absolute left-[18px] top-6 w-3 h-3 rounded-full bg-accent border-2 border-background z-10" />
              <PlaceCard stop={stop} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
