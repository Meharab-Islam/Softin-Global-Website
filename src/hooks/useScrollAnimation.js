import { useEffect, useRef } from 'react';

/**
 * Custom hook to trigger animations when elements enter the viewport.
 * Uses IntersectionObserver to add a 'visible' class.
 * @returns {React.RefObject} ref - Attach this ref to the element you want to animate.
 */
export function useScrollAnimation() {
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Only animate once
                    }
                });
            },
            {
                threshold: 0, // Trigger immediately when any part is visible
                rootMargin: '0px'
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return ref;
}

/**
 * Helper to animate a list of items with staggered delays.
 * @param {Array} items - Array of data to map.
 * @returns {Array} - Array of refs (helper logic usually handled in component map).
 */
