import * as React from "react";

import CommandAside from "../components/command-aside";
import FormulaireCommande from "../components/command-pass";

function CommandSecondPage() {
  return (
    <main className="bg-gray-100 py-16 md:px-24 lg:px-32 flex justify-center">
      <div className="layout-toggle max-w-5xl w-full flex flex-col gap-12 lg:gap-20">
        <aside className="black-bg bg-white">
          <CommandAside />
        </aside>
        <section className="align-center md:w-2/3 bg-white rounded-lg shadow-md p-3">
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-orange-500 mb-2">
              Étape 2: Passez votre commande
            </h2>
            <FormulaireCommande />+
          </div>
        </section>
      </div>
    </main>
  );
}

export default CommandSecondPage;
