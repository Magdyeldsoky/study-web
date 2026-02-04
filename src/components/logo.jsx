import React from "react";

const Logo = ({ size = "30px" }) => {
  return (
    <a href="#" className="space-x-2 font-bold text-primary flex items-center">
      <span
        className="relative z-10 text-glow text-foreground"
        style={{ fontSize: size }}
      >
        Brain
      </span>
      <span style={{ fontSize: size }}>Buddy</span>
    </a>
  );
};

export default Logo;
