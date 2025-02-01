import { FaBars } from "react-icons/fa";

import "../../public/style/landing.css";

function CommandAside() {
  return (
    <aside className="w-full rounded-xl overflow-hidden  duration-300">
      <header className="header bg-black text-white flex justify-between items-center p-4">
        <button className="hamburger-menu" aria-label="Menu">
          <FaBars size={30} color="white" />;
        </button>

        <div className="logo">
          <img src="/assets/logo1.png" alt="Logo" className="logo-img" />
        </div>
      </header>

      <img
        src="/assets/menuKinTacos.png"
        alt="kinTacos menu's"
        className=" header-image  w-full h-[700px] object-cover"
      />
    </aside>
  );
}

export default CommandAside;
