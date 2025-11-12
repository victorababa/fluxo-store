import { Resend } from 'resend';

// Configuração do Resend
const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || 're_1234567890';
const APP_URL = import.meta.env.VITE_APP_URL || 'http://localhost:3000';

const resend = new Resend(RESEND_API_KEY);

type SendVerificationEmailProps = {
  to: string;
  token: string;
  name: string;
};

export const sendVerificationEmail = async ({ to, token, name }: SendVerificationEmailProps) => {
  const verificationUrl = `${APP_URL}/verificar-email?token=${token}`;
  const unsubscribeLink = `${APP_URL}/unsubscribe?email=${encodeURIComponent(to)}`;
  
  // Template HTML inline para simplificar
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #1a1a1a; color: #fff;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #4CAF50;">Shopee Gamer</h1>
      </div>
      
      <h2>Olá, ${name}!</h2>
      <p>Obrigado por se cadastrar em nossa plataforma. Por favor, verifique seu endereço de e-mail clicando no botão abaixo:</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="${verificationUrl}" 
           style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; display: inline-block;">
          Verificar E-mail
        </a>
      </div>
      
      <p>Se o botão não funcionar, copie e cole este link no seu navegador:</p>
      <p style="word-break: break-all; color: #4CAF50;">${verificationUrl}</p>
      
      <p style="color: #aaa; font-size: 14px; margin-top: 30px; border-top: 1px solid #333; padding-top: 20px;">
        Se você não se cadastrou em nossa plataforma, por favor, ignore este e-mail.
      </p>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #333; color: #888; font-size: 12px;">
        <p>© ${new Date().getFullYear()} Shopee Gamer. Todos os direitos reservados.</p>
        <p style="margin-top: 10px;">
          <a href="${unsubscribeLink}" style="color: #4CAF50; text-decoration: none;">Cancelar inscrição</a>
        </p>
      </div>
    </div>
  `;

  try {
    // Usando o domínio verificado
    const fromEmail = `fluxo-store@fluxo-store.vercel.ap`;
    
    console.log('Enviando e-mail de:', fromEmail, 'para:', to);
    
    const { data, error } = await resend.emails.send({
      from: `Shopee Gamer <${fromEmail}>`,
      to: to,
      subject: 'Verifique seu e-mail - Shopee Gamer',
      html: emailHtml,
    });

    if (error) {
      console.error('Erro ao enviar e-mail:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Erro ao enviar e-mail de verificação:', error);
    return { success: false, error };
  }
};

// Configuração para desenvolvimento local
if (import.meta.env.DEV) {
  console.log('Modo de desenvolvimento: E-mails serão exibidos no console');
  
  // @ts-ignore - Adiciona a função ao objeto window para desenvolvimento
  window.sendVerificationEmail = async (params: { to: string; token: string; name: string }) => {
    console.log('📧 E-mail de verificação (mockado):', {
      to: params.to,
      verificationUrl: `${APP_URL}/verificar-email?token=${params.token}`
    });
    return { success: true };
  };
}

export default {
  sendVerificationEmail: import.meta.env.DEV 
    ? (window as any).sendVerificationEmail 
    : sendVerificationEmail,
};
