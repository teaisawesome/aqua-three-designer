import {notFound} from 'next/navigation'
import {getMessages} from 'next-intl/server'
import {NextIntlClientProvider} from "next-intl"
import { routing } from '@/i18n/routing'

import MainHeader from "@/components/header/MainHeader"

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!locale || !routing.locales.includes(locale)) {
    return notFound();
  }

  const messages = await getMessages();

  console.log('MESSAGES', messages);

  return (
    <html lang={locale} className="bg-sky-950">
      <body>
      <NextIntlClientProvider messages={messages}>
          <MainHeader locale={locale}/>
          {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}