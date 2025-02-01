import CommandAside from "../components/command-aside";
import CommandeForm from "../components/command-form";

function CommandPage() {
  return (
    <main className="bg-gray-100 py-16  md:px-24 lg:px-32 flex justify-center">
      <div className=" layout-toggle max-w-5xl w-full flex flex-col gap-12 lg:gap-20">
        <aside className=" black-bg  bg-white  ">
          <CommandAside />
        </aside>
        <section className="align-center  md:w-2/3 bg-white rounded-lg shadow-md p-6 ">
          <h1 className="text-3xl font-semibold text-gray-800 mb-2">
            Passe ta commande
          </h1>
          <p className="text-lg text-gray-600">Nous vous livrons à domicile</p>
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-orange-500 mb-2">
              Étape 1: Vos informations
            </h2>{" "}
            <CommandeForm />
          </div>
        </section>
      </div>
    </main>
  );
}

export default CommandPage;
