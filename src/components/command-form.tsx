import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { CommandeData } from "../../public/utils/types";
import { Link } from "react-router-dom";

const countryCodes = [
  { value: "+243", label: "🇨🇩 +243" },
  { value: "+33", label: "🇫🇷 +33" },
  { value: "+1", label: "🇺🇸 +1" },
  { value: "+32", label: "🇧🇪 +32" },
];

const CommandeForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommandeData>();

  const onSubmit: SubmitHandler<CommandeData> = (data) => {
    console.log(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto"
    >
      <div className=" layout-toggle grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register("nom", { required: "Le nom est requis" })}
            placeholder="Nom"
            className={`border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300 width-312  ${
              errors.nom ? "border-red-500" : ""
            }`}
          />
          {errors.nom && typeof errors.nom.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("prenom", { required: "Le prénom est requis" })}
            placeholder="Prénom"
            className={`border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300 width-312  ${
              errors.prenom ? "border-red-500" : ""
            }`}
          />
          {errors.nom && typeof errors.nom.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.nom.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <div className="flex border rounded-lg overflow-hidden">
          <select
            {...register("codePaysTelephone", {
              required: "Le code pays est requis",
            })}
            defaultValue={countryCodes[0].value}
            className="bg-transparent p-2 outline-none appearance-none border-r"
          >
            {countryCodes.map((code) => (
              <option key={code.value} value={code.value}>
                {code.label}
              </option>
            ))}
          </select>
          <input
            {...register("telephone", {
              required: "Le téléphone est requis",
              pattern: {
                value: /^\d+$/,
                message: "Le numéro doit contenir uniquement des chiffres",
              },
            })}
            type="text"
            placeholder="Téléphone"
            className={`flex-1 p-2 focus:ring-2 focus:ring-orange-300 outline-none ${
              errors.telephone ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.telephone && typeof errors.telephone.message === "string" && (
          <p className="text-red-500 text-sm mt-1">
            {errors.telephone.message}
          </p>
        )}
      </div>

      <div className="mb-4">
        <div className="flex border rounded-lg overflow-hidden">
          <select
            {...register("codePaysWhatsapp", {
              required: "Le code pays est requis",
            })}
            defaultValue={countryCodes[0].value}
            className="bg-transparent p-2 outline-none appearance-none border-r"
          >
            {countryCodes.map((code) => (
              <option key={code.value} value={code.value}>
                {code.label}
              </option>
            ))}
          </select>
          <input
            {...register("whatsapp", {
              required: "Le WhatsApp est requis",
              pattern: {
                value: /^\d+$/,
                message: "Le numéro doit contenir uniquement des chiffres",
              },
            })}
            type="text"
            placeholder="WhatsApp"
            className={`flex-1 p-2 focus:ring-2 focus:ring-orange-300 outline-none ${
              errors.whatsapp ? "border-red-500" : ""
            }`}
          />
        </div>
        {errors.whatsapp && typeof errors.whatsapp.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.whatsapp.message}</p>
        )}
      </div>

      <div className="mb-4">
        <input
          {...register("adresse", { required: "L'adresse est requise" })}
          type="text"
          placeholder="Adresse complète"
          className={`border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300 ${
            errors.adresse ? "border-red-500" : ""
          }`}
        />
        {errors.adresse && typeof errors.adresse.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.adresse.message}</p>
        )}
      </div>

      <div className=" layout-toggle grid grid-cols-2 gap-4 mb-4">
        <div>
          <input
            {...register("ville", { required: "La ville est requise" })}
            type="text"
            placeholder="Ville"
            className={`border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300 width-312  ${
              errors.ville ? "border-red-500" : ""
            }`}
          />
          {errors.ville && typeof errors.ville.message === "string" && (
            <p className="text-red-500 text-sm mt-1">{errors.ville.message}</p>
          )}
        </div>
        <div>
          <input
            {...register("commune", { required: "La commune est requise" })}
            type="text"
            placeholder="Commune"
            className={`border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300 width-312  ${
              errors.commune ? "border-red-500" : ""
            }`}
          />
          {errors.commune && typeof errors.commune.message === "string" && (
            <p className="text-red-500 text-sm mt-1">
              {errors.commune.message}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <textarea
          {...register("commentaire")}
          placeholder="Infos supplémentaires..."
          className="border p-2 rounded-lg w-full focus:ring-2 focus:ring-orange-300"
          rows={3}
        />
      </div>

      <div className="flex justify-end">
        <Link
          to="/nouvelle-commande"
          className="bg-orange-500 text-white py-2 px-6 rounded-lg hover:bg-orange-600 transition-all duration-300 shadow-md"
        >
          Suivant
        </Link>
      </div>
    </form>
  );
};

export default CommandeForm;
