import { useState, useEffect } from 'react';

export const useMouseMove = () => {
    const [coords, setCoords] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event) => {
            setCoords({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return coords;
};