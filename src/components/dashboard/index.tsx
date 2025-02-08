import { useState } from "react";
import Sidebar from "./Sidebar";
import QuickActions from "./QuickActions";
import ModuleContainer, { ModuleType } from "./ModuleContainer";

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState<ModuleType>(null);

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
          activeModule={activeModule}
          onModuleChange={setActiveModule}
        />

        {/* Module Container */}
        <ModuleContainer activeModule={activeModule} />
      </div>
    </div>
  );
};

export default Dashboard;
