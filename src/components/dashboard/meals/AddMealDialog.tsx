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
import { supabase } from "@/lib/supabase";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import ItemsSheet from "./ItemsSheet";

interface AddMealDialogProps {
  onMealAdded?: () => void;
}

interface Item {
  id: string;
  name: string;
  default_unit: string;
}

interface MealItem {
  item_id: string;
  quantity: number;
  unit: string;
  name?: string; // For display purposes
}

export default function AddMealDialog({ onMealAdded }: AddMealDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<MealItem[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const searchItems = async (term: string) => {
    if (!term) {
      setItems([]);
      return;
    }

    const { data, error } = await supabase
      .from("items")
      .select("id, name, default_unit")
      .ilike("name", `%${term}%`)
      .limit(5);

    if (error) {
      console.error("Error searching items:", error);
      return;
    }

    setItems(data || []);
  };

  const addItemToMeal = (item: Item) => {
    setSelectedItems((prev) => [
      ...prev,
      {
        item_id: item.id,
        quantity: 100,
        unit: item.default_unit,
        name: item.name,
      },
    ]);
    setSearchTerm("");
    setItems([]);
  };

  const removeItem = (index: number) => {
    setSelectedItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    setSelectedItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity } : item)),
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("meals").insert([
        {
          name,
          description,
          items: selectedItems.map(({ item_id, quantity, unit }) => ({
            item_id,
            quantity,
            unit,
          })),
        },
      ]);

      if (error) throw error;

      setOpen(false);
      onMealAdded?.();
    } catch (error) {
      console.error("Error adding meal:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Meal
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Meal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Meal Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label>Add Items</Label>
            <ItemsSheet
              onItemsSelected={(items) => {
                setSelectedItems((prev) => [
                  ...prev,
                  ...items.map((item) => ({
                    item_id: item.id,
                    quantity: item.quantity,
                    unit: item.default_unit,
                    name: item.name,
                  })),
                ]);
              }}
            />
          </div>

          {selectedItems.length > 0 && (
            <div className="space-y-4">
              <Label>Selected Items</Label>
              <div className="space-y-2">
                {selectedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 border rounded-md"
                  >
                    <Badge variant="secondary" className="flex-shrink-0">
                      {item.name}
                    </Badge>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItemQuantity(index, parseFloat(e.target.value))
                      }
                      className="w-24"
                    />
                    <span className="text-sm text-muted-foreground">
                      {item.unit}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="ml-auto"
                      onClick={() => removeItem(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Meal"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
