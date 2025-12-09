import { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

interface PublicLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  className?: string;
  containerClassName?: string;
}

const PublicLayout = ({
  children,
  title,
  description,
  onLoginClick,
  onRegisterClick,
  className = "",
  containerClassName = "py-12 px-4 sm:px-6 lg:px-8"
}: PublicLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>

      <div className={`min-h-screen flex flex-col ${className}`}>
        <Header 
          onLoginClick={onLoginClick} 
          onRegisterClick={onRegisterClick} 
        />
        <main className={`flex-1 ${containerClassName}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default PublicLayout;