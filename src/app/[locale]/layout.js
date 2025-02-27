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

  return (
    <html lang={locale} className="bg-gradient-to-r from-sky-500 to-indigo-500">
      <body>
      <NextIntlClientProvider messages={messages}>
          {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}