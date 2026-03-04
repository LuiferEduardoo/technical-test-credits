const nodemailer = require('nodemailer');

// Crear transportador de correo
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST,
    port: process.env.BREVO_SMTP_PORT,
    secure: process.env.BREVO_SMTP_SECURE === 'true', // true para 465, false para otros puertos
    auth: {
      user: process.env.BREVO_LOGIN,
      pass: process.env.BREVO_SMTP_KEY
    },
     tls: {
      servername: 'smtp-relay.sendinblue.com' // ← nombre real del certificado
    }
  });
};

// Verificar conexión con el servidor SMTP
const verifyConnection = async () => {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ Conexión con servidor SMTP de Brevo establecida');
    return true;
  } catch (error) {
    console.error('❌ Error al conectar con servidor SMTP:', error.message);
    return false;
  }
};

// Enviar correo electrónico
const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${options.fromName || 'Sistema de Créditos'}" <${process.env.BREVO_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      cc: options.cc,
      bcc: options.bcc,
      attachments: options.attachments
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Correo enviado exitosamente:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      response: info.response
    };
  } catch (error) {
    console.error('❌ Error al enviar correo:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

// Enviar correo de notificación de nuevo crédito
const sendNewCreditEmail = async (toEmail, creditData) => {
  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(creditData.loanAmount);

  const formattedDate = new Date().toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 650px; margin: 20px auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-align: center; padding: 30px 20px; }
        .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
        .content { padding: 30px 25px; }
        .title { font-size: 22px; color: #667eea; margin-bottom: 20px; font-weight: 600; }
        .info-grid { display: grid; grid-template-columns: 1fr; gap: 15px; margin: 25px 0; }
        .info-item { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 18px 20px; border-radius: 5px; }
        .info-label { font-size: 13px; color: #666; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; font-weight: 600; }
        .info-value { font-size: 18px; color: #333; font-weight: 500; }
        .amount-value { color: #28a745; font-size: 22px; font-weight: 700; }
        .divider { border: none; border-top: 2px solid #e9ecef; margin: 25px 0; }
        .footer { background-color: #f8f9fa; text-align: center; padding: 25px 20px; font-size: 13px; color: #6c757d; border-top: 1px solid #e9ecef; }
        .footer p { margin: 5px 0; }
        @media only screen and (max-width: 600px) {
          .container { margin: 10px; }
          .header h1 { font-size: 24px; }
          .content { padding: 20px 15px; }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🏦 Nuevo Crédito Registrado</h1>
        </div>
        <div class="content">
          <p class="title">Información del Crédito</p>
          <p style="color: #666; font-size: 15px;">Se ha registrado un nuevo crédito en el sistema con los siguientes detalles:</p>

          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">👤 Nombre del Cliente</div>
              <div class="info-value">${creditData.clientName}</div>
            </div>

            <div class="info-item">
              <div class="info-label">💰 Valor del Crédito</div>
              <div class="info-value amount-value">${formattedAmount}</div>
            </div>

            <div class="info-item">
              <div class="info-label">👔 Nombre del Comercial</div>
              <div class="info-value">${creditData.commercialName}</div>
            </div>

            <div class="info-item">
              <div class="info-label">📅 Fecha de Registro</div>
              <div class="info-value">${formattedDate}</div>
            </div>
          </div>

          <div class="divider"></div>

          <p style="font-size: 14px; color: #6c757d; text-align: center;">
            Este es un correo automático generado por el Sistema de Créditos.<br>
            Por favor no responder a este mensaje.
          </p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Sistema de Créditos - Todos los derechos reservados</p>
          <p>Generado el ${formattedDate}</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const textContent = `
NUEVO CRÉDITO REGISTRADO
========================

Nombre del Cliente: ${creditData.clientName}
Valor del Crédito: ${formattedAmount}
Nombre del Comercial: ${creditData.commercialName}
Fecha de Registro: ${formattedDate}

---
Este es un correo automático generado por el Sistema de Créditos.
Por favor no responder a este mensaje.

© ${new Date().getFullYear()} Sistema de Créditos
  `;

  return await sendEmail({
    to: toEmail,
    subject: `Nuevo Crédito: ${creditData.clientName} - ${formattedAmount}`,
    html: htmlContent,
    text: textContent
  });
};

module.exports = {
  createTransporter,
  verifyConnection,
  sendEmail,
  sendNewCreditEmail,
};
