
import { Link } from "react-router-dom";

interface HeaderNavProps {
  isMobile?: boolean;
}

const HeaderNav = ({ isMobile = false }: HeaderNavProps) => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "#features" },
    { name: "Pricing", path: "#pricing" },
    { name: "About", path: "#about" },
  ];

  const className = isMobile 
    ? "text-base font-medium text-slate-700 hover:text-indigo-600 transition-colors"
    : "text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors";

  const handleHashClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const elementId = path.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
    
  return (
    <nav className={isMobile ? "flex flex-col gap-4 mt-8" : "ml-10 hidden md:flex gap-6"}>
      {navItems.map(item => (
        item.path.startsWith('#') ? (
          <a
            key={item.name}
            href={item.path}
            className={className}
            onClick={(e) => handleHashClick(e, item.path)}
          >
            {item.name}
          </a>
        ) : (
          <Link 
            key={item.name}
            to={item.path} 
            className={className}
          >
            {item.name}
          </Link>
        )
      ))}
    </nav>
  );
};

export default HeaderNav;
