
import { useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import SAFeProgram from "@/components/safe/SAFeProgram";

const SAFeProject = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const projectData = location.state?.newProject;
  const role = location.state?.role || "projectManager";

  const handleGoBack = () => {
    navigate("/projects", { state: { role } });
  };

  return (
    <>
      <Helmet>
        <title>SAFe Project | Axia Agile</title>
        <meta name="description" content="Manage your SAFe program and agile teams" />
      </Helmet>

      <DashboardLayout role={role as any}>
        <div className="space-y-6 animate-fade-in">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleGoBack}>
              <ArrowLeft size={18} />
            </Button>
            <h1 className="text-2xl font-bold">SAFe Program Management</h1>
          </div>

          <SAFeProgram projectData={projectData} />
        </div>
      </DashboardLayout>
    </>
  );
};

export default SAFeProject;
