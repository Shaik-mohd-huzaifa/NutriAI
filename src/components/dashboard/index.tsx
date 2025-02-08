import React, { useState } from "react";
import Sidebar from "./Sidebar";
import ChatInterface from "./ChatInterface";
import QuickActions from "./QuickActions";
import MealCard from "./MealCard";
import MealPlanner from "./MealPlanner";

const Dashboard = () => {
  const [showMealPlanner, setShowMealPlanner] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 space-y-6">
        {/* Quick Actions */}
        <QuickActions
          onMealPlanClick={() => setShowMealPlanner(!showMealPlanner)}
        />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr,320px] gap-6">
          <div className="space-y-6">
            {/* Chat Interface */}
            <ChatInterface />
            {/* Meal Planner */}
            {showMealPlanner && <MealPlanner />}
          </div>

          {/* Meal Cards */}
          <div className="space-y-6">
            <MealCard
              title="Today's Breakfast"
              calories={450}
              image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            />
            <MealCard
              title="Today's Lunch"
              calories={650}
              image="https://images.unsplash.com/photo-1512621776951-a57141f2eefd"
            />
            <MealCard
              title="Today's Dinner"
              calories={550}
              image="https://images.unsplash.com/photo-1467003909585-2f8a72700288"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
