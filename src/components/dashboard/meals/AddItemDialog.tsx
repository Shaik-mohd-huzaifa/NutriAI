import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

interface AddItemDialogProps {
  onItemAdded?: () => void;
}

export default function AddItemDialog({ onItemAdded }: AddItemDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    calories_per_100g: 0,
    protein_per_100g: 0,
    carbs_per_100g: 0,
    fat_per_100g: 0,
    fiber_per_100g: 0,
    default_unit: "grams" as const,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("items").insert([formData]);
      if (error) throw error;

      setOpen(false);
      onItemAdded?.();
    } catch (error) {
      console.error("Error adding item:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Item</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Food Item</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Calories (per 100g)</Label>
              <Input
                id="calories"
                type="number"
                value={formData.calories_per_100g}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    calories_per_100g: parseFloat(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein">Protein (per 100g)</Label>
              <Input
                id="protein"
                type="number"
                value={formData.protein_per_100g}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    protein_per_100g: parseFloat(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (per 100g)</Label>
              <Input
                id="carbs"
                type="number"
                value={formData.carbs_per_100g}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    carbs_per_100g: parseFloat(e.target.value),
                  }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fat">Fat (per 100g)</Label>
              <Input
                id="fat"
                type="number"
                value={formData.fat_per_100g}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    fat_per_100g: parseFloat(e.target.value),
                  }))
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="unit">Default Unit</Label>
            <Select
              value={formData.default_unit}
              onValueChange={(value: any) =>
                setFormData((prev) => ({ ...prev, default_unit: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="grams">Grams</SelectItem>
                <SelectItem value="milliliters">Milliliters</SelectItem>
                <SelectItem value="pieces">Pieces</SelectItem>
                <SelectItem value="servings">Servings</SelectItem>
                <SelectItem value="cups">Cups</SelectItem>
                <SelectItem value="tablespoons">Tablespoons</SelectItem>
                <SelectItem value="teaspoons">Teaspoons</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Item"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
