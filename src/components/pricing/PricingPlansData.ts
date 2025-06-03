
export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  originalPrice: string | null;
  description: string;
  features: string[];
  limitations: string[];
  buttonText: string;
  popular: boolean;
  stripePlanName: string | null;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    originalPrice: null,
    description: "Perfect for getting started",
    features: [
      "5 generated posts per month",
      "Basic platforms (Twitter, Facebook)",
      "Standard content templates",
      "Community support"
    ],
    limitations: [
      "No hashtag research",
      "No analytics",
      "Limited brand voice settings"
    ],
    buttonText: "Get Started Free",
    popular: false,
    stripePlanName: null
  },
  {
    name: "Creator",
    price: "$9.99",
    period: "/month",
    originalPrice: "$19.99",
    description: "For serious content creators",
    features: [
      "50 generated posts per month",
      "All social platforms",
      "Advanced content templates",
      "Hashtag research included",
      "Content calendar suggestions",
      "Email support"
    ],
    limitations: [],
    buttonText: "Upgrade Now",
    popular: true,
    stripePlanName: "Creator"
  },
  {
    name: "Business",
    price: "$19.99",
    period: "/month",
    originalPrice: "$39.99",
    description: "For growing businesses",
    features: [
      "Unlimited posts generation",
      "All platforms + specialized content",
      "Advanced brand voice settings",
      "Priority support",
      "Analytics and performance tips",
      "Team collaboration tools",
      "Custom content templates",
      "Advanced scheduling"
    ],
    limitations: [],
    buttonText: "Upgrade Now",
    popular: false,
    stripePlanName: "Business"
  }
];
