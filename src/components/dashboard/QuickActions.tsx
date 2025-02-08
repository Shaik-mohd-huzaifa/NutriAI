import { Button } from "@/components/ui/button";
import { CalendarDays, ChefHat, Calculator, MessageCircle } from "lucide-react";
import { ModuleType } from "./ModuleContainer";

interface QuickActionsProps {
  activeModule: ModuleType;
  onModuleChange: (module: ModuleType) => void;
}

const QuickActions = ({ activeModule, onModuleChange }: QuickActionsProps) => {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        <Button
          variant={activeModule === "chat" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() =>
            onModuleChange(activeModule === "chat" ? null : "chat")
          }
        >
          <MessageCircle className="h-4 w-4" />
          AI Chat
        </Button>

        <Button
          variant={activeModule === "meal" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() =>
            onModuleChange(activeModule === "meal" ? null : "meal")
          }
        >
          <ChefHat className="h-4 w-4" />
          Meal Planning
        </Button>

        <Button
          variant={activeModule === "exercise" ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() =>
            onModuleChange(activeModule === "exercise" ? null : "exercise")
          }
        >
          <CalendarDays className="h-4 w-4" />
          Exercise Tracking
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;
