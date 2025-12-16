import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TeamMember } from "../types/form-schema";

interface ProjectRolesSectionProps {
  productOwner: TeamMember | null;
  scrumMaster: TeamMember | null;
  availableUsers: TeamMember[];
  onSelectProductOwner: (userId: string) => void;
  onSelectScrumMaster: (userId: string) => void;
  onRemoveProductOwner: () => void;
  onRemoveScrumMaster: () => void;
}

const ProjectRolesSection = ({
  productOwner,
  scrumMaster,
  availableUsers,
  onSelectProductOwner,
  onSelectScrumMaster,
}: ProjectRolesSectionProps) => {
  // Filter available Product Owners (exclude current Scrum Master)
  const availableProductOwners = availableUsers.filter(
    u => u.role === "ProductOwner" && u.id !== scrumMaster?.id
  );

  // Filter available Scrum Masters (exclude current Product Owner)
  const availableScrumMasters = availableUsers.filter(
    u => u.role === "ScrumMaster" && u.id !== productOwner?.id
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">Project Roles</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Product Owner Section */}
          <div>
            <label className="text-sm font-medium mb-2 block">Product Owner</label>
            <Select
              value={productOwner?.id || ""}
              onValueChange={onSelectProductOwner}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Product Owner" />
              </SelectTrigger>
              <SelectContent>
                {availableProductOwners.length > 0 ? (
                  availableProductOwners.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                          {user.avatar}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-po" disabled>
                    No Product Owners available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Scrum Master Section */}
          <div>
            <label className="text-sm font-medium mb-2 block">Scrum Master</label>
            <Select
              value={scrumMaster?.id || ""}
              onValueChange={onSelectScrumMaster}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a Scrum Master" />
              </SelectTrigger>
              <SelectContent>
                {availableScrumMasters.length > 0 ? (
                  availableScrumMasters.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                          {user.avatar}
                        </div>
                        <span>{user.name}</span>
                      </div>
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-sm" disabled>
                    No Scrum Masters available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectRolesSection;