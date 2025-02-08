import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

interface MealPlanDay {
  date: string;
  meals: {
    type: string;
    name: string;
    calories: number;
    tags: string[];
  }[];
}

interface MealPlannerProps {
  weekPlan?: MealPlanDay[];
  onDaySelect?: (date: string) => void;
}

const defaultWeekPlan: MealPlanDay[] = [
  {
    date: "Monday",
    meals: [
      {
        type: "Breakfast",
        name: "Oatmeal with Berries",
        calories: 350,
        tags: ["High Fiber", "Vegetarian"],
      },
      {
        type: "Lunch",
        name: "Quinoa Buddha Bowl",
        calories: 450,
        tags: ["High Protein", "Vegan"],
      },
      {
        type: "Dinner",
        name: "Grilled Salmon",
        calories: 550,
        tags: ["Omega-3", "Low Carb"],
      },
    ],
  },
  // Add more days with their meals here
];

const MealPlanner = ({
  weekPlan = defaultWeekPlan,
  onDaySelect = () => {},
}: MealPlannerProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Meal Plan
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {weekPlan.map((day, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <h3 className="font-medium mb-3">{day.date}</h3>
              <div className="space-y-3">
                {day.meals.map((meal, mealIndex) => (
                  <div
                    key={mealIndex}
                    className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors"
                    onClick={() => onDaySelect(day.date)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {meal.type}
                        </p>
                        <p className="font-medium">{meal.name}</p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {meal.calories} cal
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {meal.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default MealPlanner;
