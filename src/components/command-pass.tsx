import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { PassCommandeData, FullCommandeData } from "../../public/utils/types";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { orderDataState } from "../states/atoms";

const FormulaireCommande = () => {
  const [recolCommande, setRecolCommande] =
    useRecoilState<FullCommandeData>(orderDataState);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PassCommandeData>({
    defaultValues: {
      commande: recolCommande.commande,
      modeLivraison: recolCommande.modeLivraison,
      modeCommande: recolCommande.modeCommande,
    },
  });

  const sendWhatsAppMessages = (
    phoneClient: string,
    nameClient: string,
    orderDetails: string,
    phoneAdmin: string
  ) => {
    const message = `🍽️ *Nouvelle commande reçue !* 🍽️%0A%0A
👤 *Client* : +${nameClient}%0A
📞 *Contact WhatsApp* : ${phoneClient}%0A%0A
📜 *Détails de la commande* :%0A${orderDetails}%0A%0A
⚡ Merci de traiter cette commande rapidement !`;

    const urlAdmin = `https://wa.me/${phoneAdmin}?text=${message}`;
    window.open(urlAdmin, "_blank");
  };

  const onSubmit: SubmitHandler<PassCommandeData> = async (data) => {
    try {
      setIsSending(true);
      setError(null);

      const commandeComplete: FullCommandeData = {
        ...recolCommande,
        ...data,
        dateCommande: new Date().toISOString(),
        status: "en_attente",
      };

      // Mettre à jour l'état Recoil
      setRecolCommande(commandeComplete);

      sendWhatsAppMessages(
        recolCommande.whatsapp,
        recolCommande.nom,
        recolCommande.commande,
        "+243818379907"
      );

      // Message de succès
      alert("Commande envoyée avec succès!");
    } catch (err) {
      console.error("Erreur lors de l'envoi de la commande:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Une erreur inconnue est survenue lors de l'envoi de la commande."
      );
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="bg-gray-100 py-12 px-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-6">
        {/* Description de la commande */}
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

        {/* Mode de commande */}
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

          {/* Bouton d'envoi */}
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSending}
              className={`bg-orange-500 text-white py-3 px-8 rounded-lg hover:bg-orange-600 transition-all duration-300 w-full ${
                isSending ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit(onSubmit)}
            >
              {isSending ? "Envoi en cours..." : "Envoyer à KINTACOS"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default FormulaireCommande;
