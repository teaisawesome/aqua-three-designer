import { useTranslations } from "next-intl";

export default function Locale() {
    const t = useTranslations('HomePage')
    return (
    <>
        <h1>{t('title')}</h1>
    </>
    );
}