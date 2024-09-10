import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

import MainHeader from "@/components/header/MainHeader";
import NavbarTest from '@/components/header/NavbarTest';

export default async function LocaleLayout({ children, params }) {
  const locale = params.locale || 'hu'
  const messages = await getMessages()

  return (
    <html lang={locale} className="bg-sky-950">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainHeader/>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}