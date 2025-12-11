
import { useLocation } from "react-router-dom";
import HeaderLogo from "./header/HeaderLogo";
import HeaderNav from "./header/HeaderNav";
import HeaderUserActions from "./header/HeaderUserActions";
import MobileMenu from "./header/MobileMenu";
import { useHeaderState } from "./header/useHeaderState";

interface HeaderProps {
  onLoginClick?: () => void;
}

const Header = ({ onLoginClick }: HeaderProps) => {
  const { isScrolled, currentUser, handleLogout, isHomePage } = useHeaderState();

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-200 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : isHomePage ? 'bg-transparent' : 'bg-white'}`}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <HeaderLogo />
          <HeaderNav />
        </div>

        <div className="flex items-center gap-4">
          <HeaderUserActions
            currentUser={currentUser}
            handleLogout={handleLogout}
            onLoginClick={onLoginClick}
          />

          <MobileMenu
            currentUser={currentUser}
            handleLogout={handleLogout}
            onLoginClick={onLoginClick}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;