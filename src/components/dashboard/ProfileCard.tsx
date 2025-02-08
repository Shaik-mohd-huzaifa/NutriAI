import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Target, Apple } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  image: string;
  goals: string[];
  preferences: string[];
  matchPercentage: number;
}

interface ProfileCardProps {
  profile: Profile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <Card className="w-full bg-card hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <img src={profile.image} alt={profile.name} />
        </Avatar>
        <div className="flex flex-col">
          <CardTitle className="text-lg">{profile.name}</CardTitle>
          <Badge variant="secondary" className="w-fit">
            {profile.matchPercentage}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Goals</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {profile.goals.map((goal) => (
              <Badge key={goal} variant="outline">
                {goal}
              </Badge>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Apple className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Preferences</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {profile.preferences.map((pref) => (
              <Badge key={pref} variant="secondary">
                {pref}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
