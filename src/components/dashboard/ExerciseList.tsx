import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Exercise {
  name: string;
  type: "Strength" | "Hypertrophy" | "Endurance";
  sets: string;
  currentPR: {
    weight: number;
    unit: string;
  };
  progress: number;
}

interface DayPlan {
  exercises: Exercise[];
  completed: boolean;
}

const defaultExercises: Exercise[] = [
  {
    name: "Flat Bench Press",
    type: "Strength",
    sets: "5 x 5 reps",
    currentPR: { weight: 65, unit: "kg" },
    progress: 15.4,
  },
  {
    name: "Incline Bench Press",
    type: "Hypertrophy",
    sets: "4 x 12 reps",
    currentPR: { weight: 40, unit: "kg" },
    progress: 12.5,
  },
  {
    name: "Incline Dumbbell Flyes",
    type: "Endurance",
    sets: "4 x 20 reps",
    currentPR: { weight: 10, unit: "kg" },
    progress: 10,
  },
];

export default function ExerciseList() {
  const [selectedDate, setSelectedDate] = useState(3); // Thursday
  const [expandedExercise, setExpandedExercise] = useState<number | null>(null);
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const dates = [30, 1, 2, 3, 4, 5, 6];

  const [weekPlans] = useState<Record<number, DayPlan>>(() => ({
    30: { exercises: defaultExercises, completed: true },
    1: { exercises: defaultExercises, completed: true },
    2: { exercises: defaultExercises, completed: false },
    3: { exercises: defaultExercises, completed: false },
    4: { exercises: defaultExercises, completed: false },
    5: { exercises: defaultExercises, completed: false },
    6: { exercises: defaultExercises, completed: false },
  }));

  const getTypeColor = (type: Exercise["type"]) => {
    switch (type) {
      case "Strength":
        return "text-orange-500";
      case "Hypertrophy":
        return "text-purple-500";
      case "Endurance":
        return "text-yellow-500";
      default:
        return "text-gray-500";
    }
  };

  const toggleExercise = (index: number) => {
    setExpandedExercise(expandedExercise === index ? null : index);
  };

  return (
    <Card className="w-full bg-background">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">
          Push - Upper Body
        </CardTitle>
        <Button variant="outline" size="sm" className="rounded-full">
          <Plus className="h-4 w-4 mr-2" />
          New exercise
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
              className={`rounded-full aspect-square p-0 ${weekPlans[date]?.completed ? 'after:content-[""] after:block after:w-1.5 after:h-1.5 after:bg-green-500 after:rounded-full after:absolute after:bottom-1' : ""}`}
              onClick={() => setSelectedDate(date)}
            >
              {date}
            </Button>
          ))}
        </div>

        {/* Exercise List */}
        <div className="space-y-2">
          {weekPlans[selectedDate]?.exercises.map((exercise, index) => (
            <div
              key={index}
              className="rounded-lg border bg-card overflow-hidden"
            >
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-accent transition-colors"
                onClick={() => toggleExercise(index)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <div className={`text-2xl ${getTypeColor(exercise.type)}`}>
                      •
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium">{exercise.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {exercise.type} · {exercise.sets}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-green-500">
                    ▲ {exercise.progress}%
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle menu click
                    }}
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 shrink-0 transition-transform duration-200",
                      expandedExercise === index && "rotate-180",
                    )}
                  />
                </div>
              </div>
              {expandedExercise === index && (
                <div className="p-4 border-t bg-muted/50">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Current PR</h4>
                      <div className="text-2xl font-bold">
                        {exercise.currentPR.weight}
                        <span className="text-lg font-normal text-muted-foreground ml-1">
                          {exercise.currentPR.unit}
                        </span>
                      </div>
                    </div>
                    {/* Add more details here */}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
