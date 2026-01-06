import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const CatppuccinPreset = definePreset(Aura, {
    semantic: {
        primary: {
            500: '#cba6f7', // Mauve (Catppuccin's signature accent)
            // You can map 50-950 to different shades of Catppuccin colors
        },
        colorScheme: {
            dark: {
                // surface: {
                // 	0: "#1e1e2e", // Base
                // 	50: "#181825", // Mantle
                // 	100: "#313244", // Surface 0
                // 	200: "#45475a", // Surface 1
                // 	300: "#585b70", // Surface 2
                // 	400: "#6c7086", // Overlay 0
                // 	500: "#7f849c", // Overlay 1
                // 	600: "#9399b2", // Overlay 2
                // 	700: "#a6adc8", // Subtext 0
                // 	800: "#bac2de", // Subtext 1
                // 	900: "#cdd6f4", // Text
                // },
                primary: {
                    color: '#cba6f7',
                    contrastColor: '#11111b', // Crust
                    hoverColor: '#b4befe', // Lavender
                    activeColor: '#f5c2e7', // Pink
                },
            },
            light: {
                // surface: {
                // 	0: "#eff1f5", // Base (Background)
                // 	50: "#e6e9ef", // Mantle
                // 	100: "#dce0e8", // Crust
                // 	200: "#ccd0da", // Surface 0
                // 	300: "#bcc0cc", // Surface 1
                // 	400: "#acb0be", // Surface 2
                // 	500: "#9ca0b0", // Overlay 0
                // 	600: "#8c8fa1", // Overlay 1
                // 	700: "#7c7f93", // Overlay 2
                // 	800: "#6c6f85", // Subtext 0
                // 	900: "#4c4f69", // Text (Darkest)
                // },
                primary: {
                    color: '#8839ef', // Mauve
                    contrastColor: '#eff1f5', // Base
                    hoverColor: '#7287fd', // Lavender
                    activeColor: '#ea76cb', // Pink
                },
            },
        },
    },
});
