import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-semibold text-orange-500 mb-8">
        Découvrez Nos Menus
      </h1>

      <div className="flex flex-col sm:flex-row gap-12">
        {/* Menu Tacos */}
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/menuKintacos1.jpeg"
            alt="Menu Tacos"
            className="w-full menu-image max-w-4xl md:max-w-5xl lg:max-w-6xl rounded-lg shadow-xl hover:scale-105 transition-transform"
          />
        </div>

        {/* Menu Général */}
        <div className="flex-1 flex justify-center">
          <img
            src="/assets/menuKintacos2.jpeg"
            alt="Menu Général"
            className="w-full menu-image max-w-4xl md:max-w-5xl lg:max-w-6xl rounded-lg shadow-xl hover:scale-105 transition-transform"
          />
        </div>
      </div>

      <div className="flex gap-4 mt-8">
        <Link to="/nouvelle-commande" className="w-full">
          <button className="bg-orange-500 text-white py-3 px-3 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full">
            passer la commande
          </button>
        </Link>
      </div>
    </div>
  );
};

export default MenuPage;
