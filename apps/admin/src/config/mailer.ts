import { serverEnv } from "@blue-jump/env/server";
import { createConsoleMailerProvider, createResendMailerProvider } from "@blue-jump/mailer/server";

export const mailer =
  serverEnv.MAIL_PROVIDER === "resend"
    ? createResendMailerProvider({
        apiKey: serverEnv.RESEND_API_KEY,
        defaultFrom: serverEnv.MAIL_FROM,
      })
    : createConsoleMailerProvider();
