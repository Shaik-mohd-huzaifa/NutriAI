import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Plus, Minus, Search } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Item {
  id: string;
  name: string;
  description: string;
  calories_per_100g: number;
  protein_per_100g: number;
  carbs_per_100g: number;
  fat_per_100g: number;
  default_unit: string;
}

interface SelectedItem extends Item {
  quantity: number;
}

interface ItemsSheetProps {
  onItemsSelected: (items: SelectedItem[]) => void;
}

export default function ItemsSheet({ onItemsSelected }: ItemsSheetProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  const fetchItems = async () => {
    const query = supabase.from("items").select("*").order("name");

    if (searchQuery) {
      query.ilike("name", `%${searchQuery}%`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching items:", error);
      return;
    }

    setItems(data || []);
  };

  const updateQuantity = (item: Item, increment: boolean) => {
    setSelectedItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (!existing) {
        if (increment) {
          return [...prev, { ...item, quantity: 100 }];
        }
        return prev;
      }

      const newQuantity = increment
        ? existing.quantity + 50
        : Math.max(0, existing.quantity - 50);

      if (newQuantity === 0) {
        return prev.filter((i) => i.id !== item.id);
      }

      return prev.map((i) =>
        i.id === item.id ? { ...i, quantity: newQuantity } : i,
      );
    });
  };

  const handleConfirm = () => {
    onItemsSelected(selectedItems.filter((item) => item.quantity > 0));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full">
          Add Items
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Items</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="grid gap-4">
              {items.map((item) => {
                const selectedItem = selectedItems.find(
                  (i) => i.id === item.id,
                );
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent transition-colors"
                  >
                    <div className="space-y-1">
                      <h4 className="text-sm font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.calories_per_100g} kcal / 100{item.default_unit}
                      </p>
                      <div className="flex gap-2 text-xs">
                        <span>P: {item.protein_per_100g}g</span>
                        <span>C: {item.carbs_per_100g}g</span>
                        <span>F: {item.fat_per_100g}g</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, false)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="w-16 text-center">
                        <div className="text-sm font-medium">
                          {selectedItem?.quantity || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.default_unit}
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => updateQuantity(item, true)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
          <div className="flex justify-end">
            <Button onClick={handleConfirm}>
              Add {selectedItems.length} Items
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
