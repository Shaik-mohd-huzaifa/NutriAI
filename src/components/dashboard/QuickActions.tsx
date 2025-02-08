import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChefHat, Calculator } from "lucide-react";

interface QuickActionsProps {
  onMealPlanClick?: () => void;
  onCalorieTrackClick?: () => void;
  onRecipeClick?: () => void;
}

const QuickActions = ({
  onMealPlanClick = () => console.log("Meal Plan clicked"),
  onCalorieTrackClick = () => console.log("Calorie Track clicked"),
  onRecipeClick = () => console.log("Recipe clicked"),
}: QuickActionsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onMealPlanClick}
        >
          <CalendarDays className="h-4 w-4" />
          Meal Planning
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onCalorieTrackClick}
        >
          <Calculator className="h-4 w-4" />
          Calorie Tracking
        </Button>

        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={onRecipeClick}
        >
          <ChefHat className="h-4 w-4" />
          Recipe Suggestions
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
