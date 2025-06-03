
import React from "react";
import { LandingPageContainer } from "./landing/LandingPageContainer";

interface LandingPageProps {
  onGetStarted: () => void;
  onTryDemo: () => void;
}

export const LandingPage = ({ onGetStarted, onTryDemo }: LandingPageProps) => {
  return (
    <LandingPageContainer
      onGetStarted={onGetStarted}
      onTryDemo={onTryDemo}
    />
  );
};
