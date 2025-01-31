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
  optionCommande: "Livraison" | "A emporter";
}
