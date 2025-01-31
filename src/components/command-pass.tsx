import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PassCommandeData } from "../../public/utils/types";

const FormulaireCommande = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassCommandeData>();

  const onSubmit: SubmitHandler<PassCommandeData> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <div className="flex flex-row items-center gap-4 mb-6">
        <div className="flex-1">
          <textarea
            {...control.register("commande", {
              required: "Veuillez taper votre commande.",
            })}
            placeholder="Tapez votre commande"
            rows={4}
            className={`border p-3 rounded-lg w-full focus:ring-2 focus:ring-orange-300 ${
              errors.commande ? "border-red-500" : ""
            }`}
          />
          {errors.commande && typeof errors.commande.message === "string" && (
            <p className="text-red-500 text-sm mt-2">
              {errors.commande.message}
            </p>
          )}
        </div>

        <button
          type="button"
          className="bg-gray-800 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition-all duration-300"
        >
          Voir Menu
        </button>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-6">
          <div className="flex items-center">
            <Controller
              name="optionCommande"
              control={control}
              rules={{ required: "Sélectionnez une option" }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="radio"
                    value="Livraison"
                    className="mr-2"
                  />
                  <label className="text-gray-600">Livraison</label>
                </>
              )}
            />
          </div>
          <div className="flex items-center">
            <Controller
              name="optionCommande"
              control={control}
              rules={{ required: "Sélectionnez une option" }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="radio"
                    value="A emporter"
                    className="mr-2"
                  />
                  <label className="text-gray-600">A emporter</label>
                </>
              )}
            />
          </div>
        </div>

        {errors.optionCommande &&
          typeof errors.optionCommande.message === "string" && (
            <p className="text-red-500 text-sm mt-2">
              {errors.optionCommande.message}
            </p>
          )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
        >
          Envoyez à KINTACOS
        </button>
      </div>
    </form>
  );
};

export default FormulaireCommande;
