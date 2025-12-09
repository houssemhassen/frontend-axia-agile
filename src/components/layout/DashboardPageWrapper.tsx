import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";

interface DashboardPageWrapperProps {
  children: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const DashboardPageWrapper = ({
  children,
  title,
  description,
  className = "space-y-8 animate-fade-in"
}: DashboardPageWrapperProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className={className}>
        {children}
      </div>
    </>
  );
};

export default DashboardPageWrapper;