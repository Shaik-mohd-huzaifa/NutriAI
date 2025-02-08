import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

interface AddMealPlanDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  onMealPlanAdded?: () => void;
}

interface Meal {
  id: string;
  name: string;
}

export default function AddMealPlanDialog({
  open,
  onOpenChange,
  date,
  mealType,
  onMealPlanAdded,
}: AddMealPlanDialogProps) {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMealId, setSelectedMealId] = useState<string>("");
  const [portions, setPortions] = useState(1);
  const [notes, setNotes] = useState("");

  const searchMeals = async (term: string) => {
    if (!term) {
      setMeals([]);
      return;
    }

    const { data, error } = await supabase
      .from("meals")
      .select("id, name")
      .ilike("name", `%${term}%`)
      .limit(5);

    if (error) {
      console.error("Error searching meals:", error);
      return;
    }

    setMeals(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMealId) return;

    setLoading(true);

    try {
      const { error } = await supabase.from("meal_plans").insert([
        {
          meal_id: selectedMealId,
          date,
          meal_type: mealType,
          portions,
          notes: notes || null,
        },
      ]);

      if (error) throw error;

      onOpenChange(false);
      onMealPlanAdded?.();
    } catch (error) {
      console.error("Error adding meal plan:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add {mealType.charAt(0).toUpperCase() + mealType.slice(1)} for{" "}
            {date}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Select Meal</Label>
            <div className="relative">
              <Input
                placeholder="Search for meals..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  searchMeals(e.target.value);
                }}
              />
              {meals.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
                  {meals.map((meal) => (
                    <button
                      key={meal.id}
                      type="button"
                      className="w-full px-4 py-2 text-left hover:bg-gray-100"
                      onClick={() => {
                        setSelectedMealId(meal.id);
                        setSearchTerm(meal.name);
                        setMeals([]);
                      }}
                    >
                      {meal.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="portions">Portions</Label>
            <Input
              id="portions"
              type="number"
              min="0.25"
              step="0.25"
              value={portions}
              onChange={(e) => setPortions(parseFloat(e.target.value))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions or notes"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading || !selectedMealId}
          >
            {loading ? "Adding..." : "Add to Meal Plan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
