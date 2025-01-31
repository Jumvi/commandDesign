import { atom } from "recoil";
import { FullCommandeData } from "../../public/utils/types";

export const orderDataState = atom<FullCommandeData>({
  key: "orderDataState",
  default: {
    // Informations client
    nom: "",
    prenom: "",
    codePaysTelephone: "",
    telephone: "",
    codePaysWhatsapp: "",
    whatsapp: "",
    adresse: "",
    ville: "",
    commune: "",
    commentaire: "",
    
    // Informations commande
    commande: "",
    modeLivraison: "Livraison",
    modeCommande: "Livraison",
    
    // Métadonnées
    dateCommande: new Date().toISOString(),
    status: "en_attente"
  },
});
