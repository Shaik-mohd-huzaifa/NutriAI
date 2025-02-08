import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative isolate pt-14 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-primary">
            Your Personal AI Nutrition Assistant
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Get personalized meal plans, track your nutrition, and achieve your
            health goals with the help of advanced AI technology.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button size="lg" className="rounded-full">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
