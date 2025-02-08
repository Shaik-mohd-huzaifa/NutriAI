import { Brain, Calendar, ChefHat, LineChart } from "lucide-react";

const features = [
  {
    name: "AI-Powered Nutrition Advice",
    description:
      "Get personalized nutrition recommendations based on your goals and preferences.",
    icon: Brain,
  },
  {
    name: "Smart Meal Planning",
    description:
      "Automatically generate meal plans that fit your dietary requirements and schedule.",
    icon: Calendar,
  },
  {
    name: "Recipe Suggestions",
    description:
      "Discover new healthy recipes tailored to your taste and nutritional needs.",
    icon: ChefHat,
  },
  {
    name: "Progress Tracking",
    description:
      "Monitor your nutrition goals and track your progress over time.",
    icon: LineChart,
  },
];

export default function Features() {
  return (
    <div className="py-24 bg-muted/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Smart Nutrition
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for better nutrition
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-start">
                <div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/10">
                  <feature.icon
                    className="h-6 w-6 text-primary"
                    aria-hidden="true"
                  />
                </div>
                <dt className="mt-4 font-semibold">{feature.name}</dt>
                <dd className="mt-2 leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
