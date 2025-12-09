
import { Helmet } from "react-helmet-async";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProjectCreationForm from "@/components/projects/ProjectCreationForm";

const ProjectCreation = () => {
  return (
    <>
      <Helmet>
        <title>Create New Project | Axia Agile</title>
        <meta name="description" content="Start a new agile project" />
      </Helmet>

      <DashboardLayout role="superadmin">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-6">Create New Project</h1>
          <ProjectCreationForm />
        </div>
      </DashboardLayout>
    </>
  );
};

export default ProjectCreation;
