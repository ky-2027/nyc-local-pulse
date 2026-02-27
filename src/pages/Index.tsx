import { useState } from "react";
import OnboardingSurvey from "@/components/OnboardingSurvey";
import Dashboard from "@/components/Dashboard";

const Index = () => {
  const [onboarded, setOnboarded] = useState(false);

  if (!onboarded) {
    return <OnboardingSurvey onComplete={() => setOnboarded(true)} />;
  }

  return <Dashboard />;
};

export default Index;
