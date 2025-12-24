import { computed, signal } from '@angular/core';

export type BreakpointSize = 'sm' | 'md' | 'lg';

interface BreakpointConfig {
    sm: number;
    md: number;
    lg: number;
}

// Tailwind default breakpoints (in pixels)
const DEFAULT_BREAKPOINTS: BreakpointConfig = {
    sm: 640,
    md: 768,
    lg: 1024,
};

const breakpoints = signal(DEFAULT_BREAKPOINTS);
const windowWidth = signal(
    typeof window !== 'undefined' ? window.innerWidth : 0,
);

// Initialize window width and listen for resize events
if (typeof window !== 'undefined') {
    const handleResize = () => {
        windowWidth.set(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
}

const getCurrentSize = computed(() => {
    const width = windowWidth();
    const config = breakpoints();

    if (width < config.md) return 'sm' as BreakpointSize;
    if (width < config.lg) return 'md' as BreakpointSize;
    return 'lg' as BreakpointSize;
});

const isSmall = computed(() => getCurrentSize() === 'sm');
const isMedium = computed(() => getCurrentSize() === 'md');
const isLarge = computed(() => getCurrentSize() === 'lg');

const setBreakpoints = (config: Partial<BreakpointConfig>): void => {
    breakpoints.update((prev) => ({
        ...prev,
        ...config,
    }));
};

const getBreakpoints = () => breakpoints();
export const mediaQuery = {
    setBreakpoints,
    getBreakpoints,
    isSmall,
    isMedium,
    isLarge,
};
