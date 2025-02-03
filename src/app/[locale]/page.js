import { useTranslations } from "next-intl";

export default function Locale() {
    const t = useTranslations()
    return (
        <>
            <h1>{t('welcome')}</h1>
        </>
    );
}