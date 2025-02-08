import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Avatar } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Badge } from "../ui/badge";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { User, Target, Apple, AlertCircle, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  userName?: string;
  userImage?: string;
  dietaryPreferences?: string[];
  healthGoals?: Array<{ goal: string; progress: number }>;
  restrictions?: string[];
}

const Sidebar = ({
  userName = "Shaik Mohammed Huzaifa",
  userImage = "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  dietaryPreferences = ["Vegetarian", "Low Carb", "High Protein"],
  healthGoals = [
    { goal: "Weight Loss", progress: 65 },
    { goal: "Protein Intake", progress: 80 },
    { goal: "Water Intake", progress: 45 },
  ],
  restrictions = ["Nuts", "Dairy", "Gluten"],
}: SidebarProps) => {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  return (
    <Card className="h-full w-80 p-6 bg-background border-r">
      <div className="flex flex-col space-y-6">
        {/* User Profile Section */}
        <div className="flex items-center space-x-4">
          <Avatar className="h-12 w-12">
            <img src={userImage} alt={userName} />
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold">{userName}</h2>
            <p className="text-sm text-muted-foreground">Nutrition Profile</p>
          </div>
        </div>

        <Separator />

        <ScrollArea className="flex-1 -mx-6 px-6">
          {/* Dietary Preferences Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Apple className="h-5 w-5" />
              <h3 className="font-medium">Dietary Preferences</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {dietaryPreferences.map((pref) => (
                <Badge key={pref} variant="secondary">
                  {pref}
                </Badge>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Health Goals Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <h3 className="font-medium">Health Goals</h3>
            </div>
            <div className="space-y-4">
              {healthGoals.map((goal) => (
                <div key={goal.goal} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">{goal.goal}</span>
                    <span className="text-sm text-muted-foreground">
                      {goal.progress}%
                    </span>
                  </div>
                  <Progress value={goal.progress} />
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          {/* Restrictions Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5" />
              <h3 className="font-medium">Restrictions</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {restrictions.map((restriction) => (
                <Badge key={restriction} variant="destructive">
                  {restriction}
                </Badge>
              ))}
            </div>
          </div>
        </ScrollArea>

        <Separator className="my-6" />

        {/* Sign Out Button */}
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={handleSignOut}
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sign Out
        </Button>
      </div>
    </Card>
  );
};

export default Sidebar;
