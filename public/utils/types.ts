export type CommandeData = {
  nom: string;
  prenom: string;
  codePaysTelephone: string;
  telephone: string;
  codePaysWhatsapp: string;
  whatsapp: string;
  adresse: string;
  ville: string;
  commune: string;
  commentaire?: string;
};

export interface PassCommandeData {
  commande: string;
  modeLivraison: "Livraison" | "A emporter";
  modeCommande: "Livraison" | "A emporter";
  modePaiement: "Carte bancaire" | "Mobile Money";
}

// Type complet pour l'envoi au serveur
// Exemple du type FullCommandeData
export type FullCommandeData = {
  nom: string;
  prenom: string;
  codePaysTelephone: string;
  telephone: string;
  codePaysWhatsapp: string;
  whatsapp: string;
  adresse: string;
  ville: string;
  commune: string;
  commentaire: string;
  commande: string;
  modeLivraison: "Livraison" | "A emporter";
  modeCommande: "Livraison" | "A emporter";
  modePaiement: "Carte bancaire" | "Mobile Money";
  dateCommande: string;
  status: "en_attente" | "traitée";
};
