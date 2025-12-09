
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface HeaderUserActionsProps {
  currentUser: any;
  handleLogout: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
  isMobile?: boolean;
}

const HeaderUserActions = ({ 
  currentUser, 
  handleLogout, 
  onLoginClick, 
  onRegisterClick,
  isMobile = false 
}: HeaderUserActionsProps) => {
  
  const buttonWidth = isMobile ? "w-full" : "";
  
  if (currentUser) {
    return (
      <>
        {!isMobile && (
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              {currentUser.firstName?.charAt(0) || "U"}
            </div>
            <div className="text-sm font-medium text-slate-700">
              {currentUser.firstName || "User"}
            </div>
          </div>
        )}
        
        {isMobile && (
          <div className="flex items-center gap-3 py-2">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
              {currentUser.firstName?.charAt(0) || "U"}
            </div>
            <div className="text-sm font-medium text-slate-700">
              {currentUser.firstName || "User"}
            </div>
          </div>
        )}
        
        {!isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className={`hidden md:flex items-center gap-2 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 ${buttonWidth}`}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log out
          </Button>
        )}
        
        <Link to="/dashboard">
          <Button 
            size="sm" 
            className={`bg-indigo-600 hover:bg-indigo-700 text-white ${buttonWidth}`}
          >
            Dashboard
          </Button>
        </Link>
        
        {isMobile && (
          <Button 
            variant="outline" 
            size="sm" 
            className={`items-center justify-center gap-2 border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 ${buttonWidth}`}
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Log out
          </Button>
        )}
      </>
    );
  }
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm" 
        className={`${!isMobile ? 'hidden md:inline-flex' : buttonWidth} text-slate-700 hover:text-indigo-600 hover:bg-transparent`}
        onClick={onLoginClick}
      >
        {isMobile && <User className="mr-2 h-4 w-4" />}
        Log in
      </Button>
      
      <Button 
        size="sm" 
        className={`bg-indigo-600 hover:bg-indigo-700 text-white ${buttonWidth}`}
        onClick={onRegisterClick}
      >
        Sign up
      </Button>
    </>
  );
};

export default HeaderUserActions;
