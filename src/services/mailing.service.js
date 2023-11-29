import { transporter } from "../config/nodemailerConfig.js";
import { config } from "../config/dotenvConfig.js";
import { __dirname } from "../utils.js";
import path from 'path';

const MailingService = {
    sendPurchaseConfirmation: async (userEmail, ticketCode) => {
        try {
            const result = await transporter.sendMail({
                from: config.nodemailer.gmaccount,
                to: userEmail,
                subject: "Compra Exitosa - ECommerce",
                html: `<p>Gracias por tu compra. Tu código de ticket es: ${ticketCode}</p>
                    <img src="cid:success">`,
                attachments: [
                    {
                        filename: "success.png",
                        path: path.join(__dirname, "/assets/images/success.png"),
                        cid: "success"
                    },
                    {
                        filename: "terms.txt",
                        path: path.join(__dirname, "/assets/documents/terms.txt"),
                        cid: "terms"
                    }
                ]
            });

            return { success: true, result };
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return { success: false, error: 'Hubo un error al enviar el correo' };
        }
    },
};

export default MailingService;
