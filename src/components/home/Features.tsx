
import { useRef } from "react";
import { useInView } from "react-intersection-observer";
import { 
  LayoutDashboard, 
  Clock, 
  BarChart3, 
  Users, 
  Calendar, 
  GitBranch,
  Database,
  Shield
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: <LayoutDashboard size={24} />,
      title: "Intuitive Dashboards",
      description:
        "Role-specific dashboards providing at-a-glance insights tailored to each team member's responsibilities and workflow."
    },
    {
      icon: <Calendar size={24} />,
      title: "Sprint Planning",
      description:
        "Comprehensive sprint planning tools to define goals, assign tasks, and organize your product backlog efficiently."
    },
    {
      icon: <GitBranch size={24} />,
      title: "Kanban Boards",
      description:
        "Visual task tracking with customizable workflows that adapt to your team's unique process and methodology."
    },
    {
      icon: <Clock size={24} />,
      title: "Time Tracking",
      description:
        "Built-in time tracking for tasks and sprints to monitor productivity and improve future estimations."
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Advanced Analytics",
      description:
        "Real-time reporting and burndown charts to measure team performance and identify improvement opportunities."
    },
    {
      icon: <Users size={24} />,
      title: "Team Collaboration",
      description:
        "Integrated communication tools, file sharing, and real-time updates to keep your team aligned and informed."
    },
    {
      icon: <Database size={24} />,
      title: "Integration Ecosystem",
      description:
        "Seamless connections with Git, CI/CD pipelines, and other development tools to create a unified workflow."
    },
    {
      icon: <Shield size={24} />,
      title: "Enterprise Security",
      description:
        "Role-based access control, audit logs, and compliance tools to maintain security and governance standards."
    }
  ];

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-4">
            Key Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Everything you need for agile excellence
          </h2>
          <p className="text-muted-foreground">
            Axia Agile provides all the tools you need to implement agile methodologies
            effectively and drive project success across your organization.
          </p>
        </div>

        <div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`hover-lift border-border ${inView ? 'animate-scale-in' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {feature.icon}
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
