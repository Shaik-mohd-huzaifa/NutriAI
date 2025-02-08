import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface MacroNutrient {
  name: string;
  amount: number;
  total: number;
  color: string;
}

interface MealCardProps {
  title?: string;
  calories?: number;
  totalCalories?: number;
  image?: string;
  macros?: MacroNutrient[];
}

const defaultMacros: MacroNutrient[] = [
  { name: "Protein", amount: 25, total: 50, color: "bg-blue-500" },
  { name: "Carbs", amount: 45, total: 100, color: "bg-green-500" },
  { name: "Fat", amount: 15, total: 30, color: "bg-yellow-500" },
];

const MealCard = ({
  title = "Breakfast",
  calories = 450,
  totalCalories = 2000,
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
  macros = defaultMacros,
}: MealCardProps) => {
  return (
    <Card className="w-80 bg-white">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-video w-full mb-4 overflow-hidden rounded-md">
          <img src={image} alt={title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Calories</span>
            <span className="font-medium">
              {calories} / {totalCalories}
            </span>
          </div>

          <Progress value={(calories / totalCalories) * 100} className="h-2" />

          <div className="space-y-2">
            {macros.map((macro, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">{macro.name}</span>
                  <span className="font-medium">
                    {macro.amount}g / {macro.total}g
                  </span>
                </div>
                <Progress
                  value={(macro.amount / macro.total) * 100}
                  className={`h-1.5 ${macro.color}`}
                />
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealCard;
