import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";

interface MealPlan {
  name: string;
  type: "Protein" | "Carbs" | "Fat";
  portions: string;
  progress: number;
}

interface DayMeals {
  meals: MealPlan[];
  completed: boolean;
}

const defaultMeals: MealPlan[] = [
  {
    name: "Chicken Breast",
    type: "Protein",
    portions: "200g",
    progress: 15.4,
  },
  {
    name: "Brown Rice",
    type: "Carbs",
    portions: "150g",
    progress: 12.5,
  },
  {
    name: "Avocado",
    type: "Fat",
    portions: "1 piece",
    progress: 10,
  },
];

export default function DietCalendar() {
  const [selectedDate, setSelectedDate] = useState(3); // Thursday
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [30, 1, 2, 3, 4, 5, 6];

  const [weekMeals] = useState<Record<number, DayMeals>>(() => ({
    30: { meals: defaultMeals, completed: true },
    1: { meals: defaultMeals, completed: true },
    2: { meals: defaultMeals, completed: false },
    3: { meals: defaultMeals, completed: false },
    4: { meals: defaultMeals, completed: false },
    5: { meals: defaultMeals, completed: false },
    6: { meals: defaultMeals, completed: false },
  }));

  const getTypeColor = (type: MealPlan["type"]) => {
    switch (type) {
      case "Protein":
        return "text-orange-500";
      case "Carbs":
        return "text-purple-500";
      case "Fat":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Diet Plan</CardTitle>
        <Button variant="outline" size="sm" className="rounded-full">
          <Plus className="h-4 w-4 mr-2" />
          New meal
        </Button>
      </CardHeader>
      <CardContent>
        {/* Calendar Header */}
        <div className="grid grid-cols-7 gap-1 mb-4 text-center">
          {days.map((day, i) => (
            <div key={day} className="text-sm text-muted-foreground">
              {day}
            </div>
          ))}
          {dates.map((date) => (
            <Button
              key={date}
              variant={selectedDate === date ? "default" : "ghost"}
              className={`rounded-full aspect-square p-0 ${weekMeals[date]?.completed ? 'after:content-[""] after:block after:w-1.5 after:h-1.5 after:bg-green-500 after:rounded-full after:absolute after:bottom-1' : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </Button>
          ))}
        </div>

        {/* Meals List */}
        <div className="space-y-2">
          {weekMeals[selectedDate]?.meals.map((meal, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <div className={`text-2xl ${getTypeColor(meal.type)}`}>•</div>
                </div>
                <div>
                  <h3 className="font-medium">{meal.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {meal.type} · {meal.portions}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-green-500">
                  ▲ {meal.progress}%
                </span>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
