
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import HeaderNav from "./HeaderNav";
import HeaderUserActions from "./HeaderUserActions";

interface MobileMenuProps {
  currentUser: any;
  handleLogout: () => void;
  onLoginClick?: () => void;
  onRegisterClick?: () => void;
}

const MobileMenu = ({ 
  currentUser, 
  handleLogout, 
  onLoginClick, 
  onRegisterClick 
}: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <HeaderNav isMobile={true} />
        
        <div className="h-px w-full bg-slate-200 my-2" />
        
        <HeaderUserActions
          currentUser={currentUser}
          handleLogout={handleLogout}
          onLoginClick={onLoginClick}
          onRegisterClick={onRegisterClick}
          isMobile={true}
        />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
