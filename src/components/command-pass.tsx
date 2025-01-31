import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PassCommandeData } from "../../public/utils/types";
import { Link } from "react-router-dom";

const FormulaireCommande = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassCommandeData>();

  const onSubmit: SubmitHandler<PassCommandeData> = (data) => {
    console.log(data);
  };

  return (
    <main className="bg-gray-100 py-12 px-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        {/* Description de la commande avec Textarea et validation */}
        <div className="w-full">
          <textarea
            {...register("commande", {
              required: "La description est requise",
            })}
            className="border p-4 rounded-lg w-full focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-200"
            placeholder="Description de ta commande"
            rows={4}
          />
          {errors.commande && (
            <span className="text-red-500 text-sm">
              {errors.commande.message}
            </span>
          )}
        </div>

        {/* Mode de commande avec boutons radio */}
        <div className="w-full bg-white p-3 rounded-lg shadow-md flex flex-col gap-4">
          <div className="flex flex-row sm:flex-row justify-between gap-4 sm:gap-6">
            <Controller
              control={control}
              name="modeCommande"
              rules={{ required: "Choisir un mode de commande" }}
              render={({ field }) => (
                <>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="Livraison"
                      className="h-4 w-4 border-gray-300 rounded-full text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">Livraison</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      {...field}
                      value="Aemporter"
                      className="h-4 w-4 border-gray-300 rounded-full text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-gray-700">À emporter</span>
                  </label>
                </>
              )}
            />
            {errors.modeCommande && typeof errors.modeCommande !== "string" && (
              <span className="text-red-500 text-sm">
                {errors.modeCommande?.message}
              </span>
            )}
          </div>
        </div>

        {/* Section des boutons */}
        <div className="flex flex-col gap-3">
          {/* Voir Menu */}
          <div className="flex gap-4">
            <Link to="/menu" className="w-full">
              <button
                type="button"
                className="bg-gray-800 text-white py-3 px-3 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full"
              >
                Voir Menu
              </button>
            </Link>
          </div>

          {/* Annuler la commande et Mode de paiement */}
          <div className="flex gap-4">
            <button
              type="button"
              className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-400 transition-all duration-300 w-full"
            >
              Annuler la commande
            </button>
            <Link to="/payment" className="w-full">
              <button
                type="button"
                className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-400 transition-all duration-300 w-full"
              >
                Mode de paiement
              </button>
            </Link>
          </div>

          {/* Envoyer à KINTACOS */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300 w-full"
              onClick={handleSubmit(onSubmit)}
            >
              Envoyer à KINTACOS
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormulaireCommande;
