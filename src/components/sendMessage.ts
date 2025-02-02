export const sendWhatsAppMessages = (
  phoneClient: string,
  nameClient: string,
  orderDetails: string,
  paymentMethod: string,
  modeCommande: string,
  phoneAdmin: string
) => {
  const message = `🍽️ *Nouvelle commande reçue !* 🍽️%0A%0A
👤 *Client* : ${nameClient}%0A
📞 *Contact WhatsApp* : ${phoneClient}%0A%0A
📜 *Détails de la commande* :%0A${orderDetails}%0A%0A
💳 *Type service * : ${paymentMethod}%0A%0A
🚀 *Mode de commande* : ${modeCommande}%0A%0A
⚡ Merci de traiter cette commande rapidement !`;

  const urlAdmin = `https://wa.me/${phoneAdmin}?text=${message}`;
  window.open(urlAdmin, "_blank");
};
