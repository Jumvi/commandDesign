import React from "react";

import "../../public/style/landing.css";

function CommandAside() {
  return (
    <aside className="w-full rounded-xl overflow-hidden  duration-300">
      <img
        src="../../src/assets/menuKinTacos.png"
        alt="kinTacos menu's"
        className="w-full h-full object-cover"
      />
    </aside>
  );
}

export default CommandAside;
