import { useEffect, useState } from 'react';
import DesktopLayout from "@/features/studio/components/layouts/DesktopLayout";

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

    return isMobile ? <h1>Mobile Layout</h1> : <DesktopLayout/>
}