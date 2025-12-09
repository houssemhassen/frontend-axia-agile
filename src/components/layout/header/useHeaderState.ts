
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const useHeaderState = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const userString = localStorage.getItem("currentUser");
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
    
    // Add scroll listener
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleLogout = () => {
    // Clear user data
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    setCurrentUser(null);
    toast.success("Successfully logged out");
    
    // Always redirect to home page after logout instead of /login
    navigate("/");
  };
  
  // Determine if we're on the home page
  const isHomePage = location.pathname === "/";

  return {
    isScrolled,
    currentUser,
    handleLogout,
    isHomePage,
    location,
    navigate
  };
};
