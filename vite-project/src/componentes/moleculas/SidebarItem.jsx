import React from 'react';
import Icon from '../atomos/icon';

const SidebarItem = ({ text, icon ,isActive }) => {
  return (
    
    <div className={`sidebar-item ${isActive ? 'active' : ''}`} >
      <Icon icon={icon} text={text} />
    </div>
  );
};

export default SidebarItem;
