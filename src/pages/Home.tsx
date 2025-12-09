
import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Hero from "../components/home/Hero";
import Features from "../components/home/Features";
import Pricing from "../components/home/Pricing";
import About from "../components/home/About";
import Footer from "../components/layout/Footer";
import { AuthModal } from "@/components/auth/AuthModal";

interface CurrentUser {
  firstName?: string;
  lastName?: string;
  email?: string;
  isLoggedIn?: boolean;
  status?: "approved" | "pending" | "rejected";
}

const Home = () => {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeAuthTab, setActiveAuthTab] = useState<"login" | "register">("login");
  
  useEffect(() => {
    // Get current user from localStorage
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentUser(user);
        
        // Redirect to approval status page if user is pending
        if (user.status === "pending" && location.pathname !== "/approval-status") {
          window.location.href = "/approval-status";
        }
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    // Check if URL has login or signup params
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has("login")) {
      setActiveAuthTab("login");
      setAuthModalOpen(true);
    } else if (searchParams.has("signup")) {
      setActiveAuthTab("register");
      setAuthModalOpen(true);
    }
  }, [location.state, location.pathname, location.search]);

  const handleOpenLoginModal = () => {
    setActiveAuthTab("login");
    setAuthModalOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setActiveAuthTab("register");
    setAuthModalOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Axia Agile | Modern Project Management Platform</title>
        <meta
          name="description"
          content="Transform your agile workflow with Axia Agile - a comprehensive project management platform for teams of all sizes."
        />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-slate-50">
        <Header onLoginClick={handleOpenLoginModal} onRegisterClick={handleOpenRegisterModal} />
        <main className="flex-1">
          <Hero onLoginClick={handleOpenLoginModal} onRegisterClick={handleOpenRegisterModal} />
          <Features />
          <Pricing />
          <About />
        </main>
        <Footer />
      </div>
      
      <AuthModal 
        open={authModalOpen} 
        onOpenChange={setAuthModalOpen}
        defaultTab={activeAuthTab} 
      />
    </>
  );
};

export default Home;
