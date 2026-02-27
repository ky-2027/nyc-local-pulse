import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Users, Utensils, Clock, Footprints, ChevronRight, ChevronLeft, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import heroImg from "@/assets/hero-nyc.webp";

interface SurveyData {
  tripDuration: number;
  accommodation: string;
  companions: string;
  interests: string[];
  foodPreferences: string;
  dietaryNeeds: string[];
  allergies: string;
  activityTimes: string[];
  walkingComfort: string;
  subwayComfort: string;
  nightComfort: string;
  vibePreference: string;
  nycExperience: string;
}

const initialData: SurveyData = {
  tripDuration: 3,
  accommodation: "",
  companions: "",
  interests: [],
  foodPreferences: "",
  dietaryNeeds: [],
  allergies: "",
  activityTimes: [],
  walkingComfort: "",
  subwayComfort: "",
  nightComfort: "",
  vibePreference: "",
  nycExperience: "",
};

const STEPS = [
  { icon: MapPin, label: "Trip Basics" },
  { icon: Users, label: "Your Style" },
  { icon: Utensils, label: "Food & Dining" },
  { icon: Clock, label: "Schedule" },
  { icon: Footprints, label: "Getting Around" },
];

const interestOptions = [
  "Local restaurants / delis", "Cafes / bakeries", "Independent shops / boutiques",
  "Vintage / markets", "Neighborhood walks", "Parks / waterfronts",
  "Bars / nightlife", "Cultural / community spots"
];

const dietaryOptions = [
  "Vegetarian", "Vegan", "Halal", "Kosher", "Gluten-free", "Dairy-free", "Keto"
];

const timeOptions = ["Morning", "Afternoon", "Evening", "Late night"];

interface Props {
  onComplete: (data: SurveyData) => void;
}

function ToggleChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border ${
        selected
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-card text-foreground border-border hover:border-accent"
      }`}
    >
      {label}
    </button>
  );
}

function RadioChip({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-5 py-3 rounded-lg text-sm font-medium transition-all duration-200 border ${
        selected
          ? "bg-primary text-primary-foreground border-primary shadow-md"
          : "bg-card text-foreground border-border hover:border-accent"
      }`}
    >
      {label}
    </button>
  );
}

export default function OnboardingSurvey({ onComplete }: Props) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<SurveyData>(initialData);

  const toggleArray = (field: keyof SurveyData, value: string) => {
    const arr = data[field] as string[];
    setData({
      ...data,
      [field]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value],
    });
  };

  const setField = (field: keyof SurveyData, value: any) => {
    setData({ ...data, [field]: value });
  };

  const next = () => step < STEPS.length - 1 && setStep(step + 1);
  const prev = () => step > 0 && setStep(step - 1);

  const stepContent = [
    // Step 0: Trip Basics
    <div key="0" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">How many days in NYC?</label>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => setField("tripDuration", Math.max(1, data.tripDuration - 1))}>−</Button>
          <span className="text-3xl font-display font-bold w-12 text-center">{data.tripDuration}</span>
          <Button variant="outline" size="icon" onClick={() => setField("tripDuration", Math.min(14, data.tripDuration + 1))}>+</Button>
          <span className="text-sm text-muted-foreground">days</span>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Where are you staying?</label>
        <Input placeholder="e.g., Midtown hotel, Airbnb in Williamsburg, Upper West Side" value={data.accommodation} onChange={e => setField("accommodation", e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Who's coming along?</label>
        <div className="flex flex-wrap gap-2">
          {["Solo", "Couple", "Friends", "Family"].map(c => (
            <RadioChip key={c} label={c} selected={data.companions === c} onClick={() => setField("companions", c)} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Visited NYC before?</label>
        <div className="flex flex-wrap gap-2">
          {["First time", "Returning"].map(c => (
            <RadioChip key={c} label={c} selected={data.nycExperience === c} onClick={() => setField("nycExperience", c)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 1: Interests
    <div key="1" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">What are you into?</label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map(i => (
            <ToggleChip key={i} label={i} selected={data.interests.includes(i)} onClick={() => toggleArray("interests", i)} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Do you prefer…</label>
        <div className="flex flex-wrap gap-2">
          {["Lively neighborhoods", "Quiet neighborhoods", "A mix of both"].map(c => (
            <RadioChip key={c} label={c} selected={data.vibePreference === c} onClick={() => setField("vibePreference", c)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 2: Food
    <div key="2" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Food preferences</label>
        <Textarea placeholder="e.g., Love trying hole-in-the-wall spots, into Japanese food, want the best pizza and bagels, prefer casual over fancy..." value={data.foodPreferences} onChange={e => setField("foodPreferences", e.target.value)} rows={3} />
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Dietary needs</label>
        <div className="flex flex-wrap gap-2">
          {dietaryOptions.map(d => (
            <ToggleChip key={d} label={d} selected={data.dietaryNeeds.includes(d)} onClick={() => toggleArray("dietaryNeeds", d)} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-2">Any allergies?</label>
        <Input placeholder="e.g., tree nuts, shellfish" value={data.allergies} onChange={e => setField("allergies", e.target.value)} />
      </div>
    </div>,

    // Step 3: Schedule
    <div key="3" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">When do you like to be out?</label>
        <div className="flex flex-wrap gap-2">
          {timeOptions.map(t => (
            <ToggleChip key={t} label={t} selected={data.activityTimes.includes(t)} onClick={() => toggleArray("activityTimes", t)} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Night travel comfort</label>
        <div className="flex flex-wrap gap-2">
          {["Low — prefer evenings in", "Medium — main areas fine", "High — comfortable anywhere"].map(c => (
            <RadioChip key={c} label={c} selected={data.nightComfort === c} onClick={() => setField("nightComfort", c)} />
          ))}
        </div>
      </div>
    </div>,

    // Step 4: Getting Around
    <div key="4" className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Walking comfort</label>
        <div className="flex flex-wrap gap-2">
          {["Short walks (under 10 min)", "Moderate (10-20 min)", "Long walks (I love exploring on foot)"].map(c => (
            <RadioChip key={c} label={c} selected={data.walkingComfort === c} onClick={() => setField("walkingComfort", c)} />
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-muted-foreground mb-3">Subway comfort</label>
        <div className="flex flex-wrap gap-2">
          {["Day only", "Anytime", "Prefer to avoid"].map(c => (
            <RadioChip key={c} label={c} selected={data.subwayComfort === c} onClick={() => setField("subwayComfort", c)} />
          ))}
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <img src={heroImg} alt="New York City street at golden hour" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background" />
        <div className="relative z-10 flex flex-col justify-end h-full px-6 pb-8 max-w-lg mx-auto">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground leading-tight">
            As A Local
          </h1>
          <p className="text-primary-foreground/80 mt-2 text-lg font-body">
            Discover NYC the way New Yorkers do.
          </p>
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-lg mx-auto px-6 pt-6">
        <div className="flex items-center gap-1 mb-2">
          {STEPS.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`h-1 w-full rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-border"}`} />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-6">
          {(() => {
            const Icon = STEPS[step].icon;
            return <Icon className="w-4 h-4 text-accent" />;
          })()}
          <span className="text-sm font-medium text-muted-foreground">{STEPS[step].label}</span>
          <span className="text-sm text-muted-foreground ml-auto">{step + 1}/{STEPS.length}</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-lg mx-auto px-6 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {stepContent[step]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border px-6 py-4">
        <div className="max-w-lg mx-auto flex gap-3">
          {step > 0 && (
            <Button variant="outline" onClick={prev} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
          )}
          {step < STEPS.length - 1 ? (
            <Button onClick={next} className="flex-1">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={() => onComplete(data)} className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
              <Sparkles className="w-4 h-4 mr-2" /> Build My Itinerary
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
