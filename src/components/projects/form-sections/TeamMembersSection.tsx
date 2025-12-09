
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { TeamMember } from "../types/form-schema";

interface TeamMembersSectionProps {
  selectedTeamMembers: TeamMember[];
  availableTeamMembers: TeamMember[];
  onAddMember: (memberId: number) => void;
  onRemoveMember: (memberId: number) => void;
}

const TeamMembersSection = ({
  selectedTeamMembers,
  availableTeamMembers,
  onAddMember,
  onRemoveMember,
}: TeamMembersSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Team Members</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Selected Team Members</h3>
            <ScrollArea className="h-72 border rounded-md p-4">
              {selectedTeamMembers.length > 0 ? (
                <div className="space-y-2">
                  {selectedTeamMembers.map((member) => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-2 border rounded hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => onRemoveMember(member.id)}
                      >
                        <X size={16} className="text-muted-foreground" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <p className="text-muted-foreground">No team members added yet</p>
                  </div>
                </div>
              )}
            </ScrollArea>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Available Team Members</h3>
            <ScrollArea className="h-72 border rounded-md p-4">
              <div className="space-y-2">
                {availableTeamMembers
                  .filter(m => !selectedTeamMembers.some(tm => tm.id === m.id))
                  .map((member) => (
                    <div 
                      key={member.id} 
                      className="flex items-center justify-between p-2 border rounded hover:bg-muted"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted text-foreground flex items-center justify-center text-sm font-medium">
                          {member.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => onAddMember(member.id)}
                      >
                        Add
                      </Button>
                    </div>
                  ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembersSection;
