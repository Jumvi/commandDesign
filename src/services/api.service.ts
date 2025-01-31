import { FullCommandeData } from "../../public/utils/types";

interface CommandeRequest {
  client: {
    nom: string;
    prenom: string;
    telephone: string;
    whatsapp: string;
    adresse: string;
    ville: string;
    commune: string;
  };
  commande: {
    description: string;
    mode: string;
    commentaire?: string;
  };
  date: string;
  status: string;
}

const API_URL = "http://localhost:5001/api/commandes/nouvelle-commande";

export const sendCommande = async (data: FullCommandeData): Promise<void> => {
  const requestData: CommandeRequest = {
    client: {
      nom: data.nom,
      prenom: data.prenom,
      telephone: `${data.codePaysTelephone}${data.telephone}`,
      whatsapp: `${data.codePaysWhatsapp}${data.whatsapp}`,
      adresse: data.adresse,
      ville: data.ville,
      commune: data.commune,
    },
    commande: {
      description: data.commande,
      mode: data.modeCommande,
      commentaire: data.commentaire,
    },
    date: data.dateCommande,
    status: data.status,
  };

  try {
    console.log("Envoi des données au serveur:", requestData);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message ||
          `Erreur serveur: ${response.status} ${response.statusText}`
      );
    }

    const responseData = await response.json();
    console.log("Réponse du serveur:", responseData);
    return responseData;
  } catch (error) {
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      throw new Error(
        "Impossible de se connecter au serveur. Vérifiez que le serveur est en cours d'exécution sur http://localhost:5001"
      );
    }
    throw error;
  }
};
