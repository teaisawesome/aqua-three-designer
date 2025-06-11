import { useEffect, useState } from 'react';
import DesktopLayout from "@/features/studio/components/layouts/DesktopLayout"
import MobileLayout from "@/features/studio/components/layouts/MobileLayout"

export default function ResponsiveLayout() {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile ? <MobileLayout/> : <DesktopLayout/>
}