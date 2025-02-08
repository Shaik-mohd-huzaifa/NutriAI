import { useState } from "react";
import ChatInterface from "./ChatInterface";
import MealPlanCalendar from "./meals/MealPlanCalendar";
import ExerciseList from "./ExerciseList";

export type ModuleType = "chat" | "meal" | "exercise" | null;

interface ModuleContainerProps {
  activeModule: ModuleType;
}

export default function ModuleContainer({
  activeModule,
}: ModuleContainerProps) {
  return (
    <div className="w-full space-y-6">
      {activeModule === "chat" && <ChatInterface />}
      {activeModule === "meal" && <MealPlanCalendar />}
      {activeModule === "exercise" && <ExerciseList />}
    </div>
  );
}
