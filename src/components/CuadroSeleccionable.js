import React, { useState } from 'react';

const CuadroSeleccionable = ({ children, baseStyle = {}, hoverColor = 'rgba(135, 245, 125, 0.53)', onClick}) => {
  const [hovered, setHovered] = useState(false);

  const mergedStyle = {
    ...baseStyle,
    backgroundColor: hovered ? hoverColor : baseStyle.backgroundColor || 'rgba(0,0,0,0.05)',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  };

  return (
    <div
      style={mergedStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default CuadroSeleccionable;