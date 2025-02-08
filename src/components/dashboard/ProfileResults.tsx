import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import ProfileCard, { Profile } from "./ProfileCard";

interface ProfileResultsProps {
  profiles: Profile[];
  query?: string;
}

const defaultProfiles: Profile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    goals: ["Weight Loss", "Muscle Gain"],
    preferences: ["High Protein", "Low Carb"],
    matchPercentage: 95,
  },
  {
    id: "2",
    name: "Mike Chen",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
    goals: ["Muscle Gain", "Performance"],
    preferences: ["High Protein", "Meal Prep"],
    matchPercentage: 88,
  },
  {
    id: "3",
    name: "Emma Wilson",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    goals: ["Weight Loss", "Healthy Eating"],
    preferences: ["Vegetarian", "Low Calorie"],
    matchPercentage: 82,
  },
];

const ProfileResults = ({
  profiles = defaultProfiles,
  query,
}: ProfileResultsProps) => {
  return (
    <Card className="w-full bg-card">
      <CardHeader>
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          Similar Profiles
          {query && (
            <span className="text-sm text-muted-foreground">for "{query}"</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {profiles.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileResults;
