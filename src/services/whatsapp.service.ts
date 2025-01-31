import twilio from 'twilio';
import { FullCommandeData } from '../../public/utils/types';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export const sendWhatsAppMessage = async (commandeData: FullCommandeData) => {
  try {
    const messageBody = `
🛍️ Nouvelle Commande!

👤 Client:
- Nom: ${commandeData.nom} ${commandeData.prenom}
- Téléphone: ${commandeData.telephone}
- WhatsApp: ${commandeData.whatsapp}
- Adresse: ${commandeData.adresse}, ${commandeData.commune}, ${commandeData.ville}

📦 Commande:
- Description: ${commandeData.commande}
- Mode de livraison: ${commandeData.modeCommande}
${commandeData.commentaire ? `- Commentaire: ${commandeData.commentaire}` : ''}

📅 Date: ${new Date(commandeData.dateCommande).toLocaleString()}
📋 Status: ${commandeData.status}
    `;

    const message = await client.messages.create({
      body: messageBody,
      from: `whatsapp:${twilioPhoneNumber}`,
      to: `whatsapp:${commandeData.whatsapp}`
    });

    console.log('Message WhatsApp envoyé avec succès:', message.sid);
    return message;
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
    throw error;
  }
};
