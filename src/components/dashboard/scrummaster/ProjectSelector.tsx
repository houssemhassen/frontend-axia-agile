
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreateProjectModal from "@/components/projects/CreateProjectModal";
import { useNavigate } from "react-router-dom";

interface ProjectSelectorProps {
  activeProject: string;
}

const ProjectSelector = ({ activeProject }: ProjectSelectorProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Active Project</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{activeProject}</h3>
            <p className="text-sm text-muted-foreground">
              Active project for Scrum Master dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={() => navigate('/projects')}>
              Switch Project
            </Button>
            <CreateProjectModal />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectSelector;
