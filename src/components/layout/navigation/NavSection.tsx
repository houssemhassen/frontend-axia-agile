
import React from 'react';
import NavItem from './NavItem';
import { Role } from '../SideNav';

export interface NavItemType {
  name: string;
  path: string;
  icon: JSX.Element;
  roles: Role[];
}

interface NavSectionProps {
  items: NavItemType[];
  role: Role;
  isCollapsed: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ items, role, isCollapsed }) => {
  // Filter items by role
  const filteredItems = items.filter(item => item.roles.includes(role));
  
  return (
    <ul className="space-y-1">
      {filteredItems.map((item) => (
        <li key={item.name}>
          <NavItem
            icon={item.icon}
            name={item.name}
            path={item.path}
            isCollapsed={isCollapsed}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavSection;
