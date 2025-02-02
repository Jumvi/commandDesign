import { useState } from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { orderDataState } from "../states/atoms";
import { FullCommandeData, PassCommandeData } from "../../public/utils/types";
import { sendWhatsAppMessages } from "./sendMessage";

const FormulaireCommande = () => {
  const [recolCommande, setRecolCommande] = useRecoilState(orderDataState);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
  const navigate = useNavigate();

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
      modePaiement: selectedPayment as "Carte bancaire" | "Mobile Money",
    },
  });

  const onSubmit: SubmitHandler<PassCommandeData> = async (data) => {
    try {
      setIsSending(true);
      setError(null);

      const commandeComplete: FullCommandeData = {
        ...recolCommande,
        ...data,
        dateCommande: new Date().toISOString(),
        status: "en_attente",
        modePaiement: selectedPayment as "Carte bancaire" | "Mobile Money",
      };

      // Mettre à jour l'état Recoil
      setRecolCommande(commandeComplete);

      sendWhatsAppMessages(
        commandeComplete.whatsapp,
        commandeComplete.nom,
        commandeComplete.commande,
        commandeComplete.modeCommande,
        selectedPayment,
        "+243818379907"
      );

      alert("Commande envoyée avec succès!");
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de l'envoi de la commande:", err);
    } finally {
      setIsSending(false);
    }
  };

  const handlePaymentChoice = () => {
    setShowPaymentOptions(false);
  };

  const handleAbortCommand = () => {
    navigate("/", { replace: true });
  };

  return (
    <main className="bg-gray-100 py-12 px-8 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col gap-6">
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
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-4">
            <Link to="/menu" className="w-full">
              <button className="bg-gray-800 text-white py-3 px-3 rounded-lg hover:bg-gray-700 transition-all duration-300 w-full">
                Voir Menu
              </button>
            </Link>
          </div>

          {!showPaymentOptions ? (
            <div className="flex gap-4">
              <button
                onClick={handleAbortCommand}
                type="button"
                className="bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-400 transition-all duration-300 w-full"
              >
                Annuler la commande
              </button>
              <button
                type="button"
                onClick={() => setShowPaymentOptions(true)}
                className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-400 transition-all duration-300 w-full"
              >
                Mode de paiement
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-center gap-8">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="carte bancaire"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="h-4 w-4 border-gray-300 rounded-full text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Carte bancaire</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="mobile money"
                    onChange={(e) => setSelectedPayment(e.target.value)}
                    className="h-4 w-4 border-gray-300 rounded-full text-orange-500 focus:ring-orange-500"
                  />
                  <span className="text-gray-700">Mobile Money</span>
                </label>
              </div>
              {selectedPayment && (
                <button
                  onClick={handlePaymentChoice}
                  className="bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-400 transition-all duration-300 w-full"
                >
                  Valider le mode de paiement
                </button>
              )}
            </div>
          )}

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
