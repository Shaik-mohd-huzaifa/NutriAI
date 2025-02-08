import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, addDays, subWeeks, addWeeks } from "date-fns";
import { supabase } from "@/lib/supabase";
import AddMealDialog from "./AddMealDialog";
import AddMealPlanDialog from "./AddMealPlanDialog";

interface MealPlan {
  id: string;
  meal_id: string;
  date: string;
  meal_type: "breakfast" | "lunch" | "dinner" | "snack";
  portions: number;
  meal: {
    name: string;
    items: Array<{
      item_id: string;
      quantity: number;
      unit: string;
    }>;
  };
}

export default function MealPlanCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [addMealPlanDialog, setAddMealPlanDialog] = useState<{
    open: boolean;
    date: string;
    mealType: "breakfast" | "lunch" | "dinner" | "snack";
  }>({ open: false, date: "", mealType: "breakfast" });

  const startDate = startOfWeek(selectedDate);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  const fetchMealPlans = async () => {
    const { data, error } = await supabase
      .from("meal_plans")
      .select(
        `
        id,
        meal_id,
        date,
        meal_type,
        portions,
        meal:meals (name, items)
      `,
      )
      .gte("date", format(startDate, "yyyy-MM-dd"))
      .lte("date", format(addDays(startDate, 6), "yyyy-MM-dd"));

    if (error) {
      console.error("Error fetching meal plans:", error);
      return;
    }

    setMealPlans(data || []);
  };

  useEffect(() => {
    fetchMealPlans();
  }, [selectedDate]);

  const navigateWeek = (direction: "prev" | "next") => {
    setSelectedDate((current) =>
      direction === "prev" ? subWeeks(current, 1) : addWeeks(current, 1),
    );
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Meal Plan
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek("prev")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateWeek("next")}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AddMealDialog onMealAdded={fetchMealPlans} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((date) => (
            <div key={date.toString()} className="space-y-2">
              <div className="text-sm font-medium text-center">
                {format(date, "EEE")}
                <div className="text-2xl">{format(date, "d")}</div>
              </div>
              <div className="space-y-2">
                {["breakfast", "lunch", "dinner", "snack"].map((mealType) => {
                  const meal = mealPlans.find(
                    (mp) =>
                      mp.date === format(date, "yyyy-MM-dd") &&
                      mp.meal_type === mealType,
                  );

                  return (
                    <div
                      key={mealType}
                      className="p-2 border rounded-md bg-card hover:bg-accent transition-colors min-h-[60px]"
                    >
                      <div className="text-xs text-muted-foreground mb-1">
                        {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                      </div>
                      {meal ? (
                        <div>
                          <div className="text-sm font-medium">
                            {meal.meal.name}
                          </div>
                          <Badge variant="secondary" className="mt-1">
                            {meal.portions} portions
                          </Badge>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full h-full flex items-center justify-center text-muted-foreground"
                          onClick={() =>
                            setAddMealPlanDialog({
                              open: true,
                              date: format(date, "yyyy-MM-dd"),
                              mealType: mealType as any,
                            })
                          }
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      <AddMealPlanDialog
        open={addMealPlanDialog.open}
        onOpenChange={(open) =>
          setAddMealPlanDialog((prev) => ({ ...prev, open }))
        }
        date={addMealPlanDialog.date}
        mealType={addMealPlanDialog.mealType}
        onMealPlanAdded={fetchMealPlans}
      />
    </Card>
  );
}
