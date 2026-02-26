/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base theme colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        
        // Card
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        
        // Popover
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        
        // Primary - Ocean Blue
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        
        // Secondary - Nature Green
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        
        // Muted
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        
        // Accent - Sand Yellow
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        
        // Destructive
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        
        // Border & Input
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        
        // Chart Colors
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        
        // Custom Nautical Theme Colors
        ocean: {
          DEFAULT: "var(--ocean)",
          dark: "var(--ocean-dark)",
          light: "var(--ocean-light)",
        },
        nature: {
          DEFAULT: "var(--nature)",
          dark: "var(--nature-dark)",
          light: "var(--nature-light)",
        },
        sand: {
          DEFAULT: "var(--sand)",
          dark: "var(--sand-dark)",
          light: "var(--sand-light)",
        },
        sea: {
          DEFAULT: "var(--sea)",
          dark: "var(--sea-dark)",
        },
      },
      
      // Border Radius
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "calc(var(--radius) + 4px)",
        "2xl": "calc(var(--radius) + 8px)",
      },
      
      // Font Families
      fontFamily: {
        heading: ["var(--font-montserrat)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      
      // Custom Animations
      animation: {
        // Basic Animations
        "float": "float 3s ease-in-out infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        "float-horizontal": "float-horizontal 3s ease-in-out infinite",
        "float-rotate": "float-rotate 4s ease-in-out infinite",
        
        // Pulse & Glow
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "pulse-scale": "pulse-scale 2s ease-in-out infinite",
        
        // Shimmer & Loading
        "shimmer": "shimmer 2s linear infinite",
        "gradient-flow": "gradient-flow 3s ease infinite",
        
        // 3D Effects
        "flip-in-3d": "flip-in-3d 0.6s ease-out forwards",
        "rotate-in": "rotate-in 0.6s ease-out forwards",
        "scale-rotate-in": "scale-rotate-in 0.5s ease-out forwards",
        
        // Entrance Animations
        "slide-in-up": "slide-in-up 0.5s ease-out forwards",
        "slide-in-down": "slide-in-down 0.5s ease-out forwards",
        "slide-in-left": "slide-in-left 0.5s ease-out forwards",
        "slide-in-right": "slide-in-right 0.5s ease-out forwards",
        "slide-blur": "slide-blur 0.6s ease-out forwards",
        
        // Fade Animations
        "fade-in": "fade-in 0.5s ease-out forwards",
        "fade-in-scale": "fade-in-scale 0.5s ease-out forwards",
        
        // Bounce & Pop
        "bounce-in": "bounce-in 0.6s ease-out forwards",
        "scale-in-bounce": "scale-in-bounce 0.5s ease-out forwards",
        "pop-in": "pop-in 0.4s ease-out forwards",
        "elastic-in": "elastic-in 0.8s ease-out forwards",
        
        // Interaction Animations
        "shake": "shake 0.5s ease-in-out",
        "wobble": "wobble 0.6s ease-in-out",
        "swing": "swing 0.6s ease-in-out",
        "tada": "tada 0.6s ease-in-out",
        "heartbeat": "heartbeat 1.3s ease-in-out infinite",
        "rubber-band": "rubber-band 0.8s ease-out",
        "jello": "jello 0.9s ease-out",
        "dance": "dance 0.6s ease-in-out infinite",
        
        // Ripple Effect
        "ripple": "ripple 0.6s linear",
        
        // Spin Variants
        "spin-slow": "spin-slow 3s linear infinite",
        "spin-reverse": "spin-reverse 3s linear infinite",
        
        // Neon Effects
        "neon-glow": "neon-glow 2s ease-in-out infinite",
        
        // Wave Animations
        "wave": "wave 1s ease-in-out infinite",
        "water-wave": "water-wave 3s linear infinite",
        
        // Morph Effects
        "blob": "blob 8s ease-in-out infinite",
        "morph": "morph 8s ease-in-out infinite",
        
        // Special Effects
        "roll-in": "roll-in 0.6s ease-out forwards",
        "light-speed-in": "light-speed-in 0.6s ease-out forwards",
        "flash": "flash 0.6s ease-in-out",
        "zoom-in": "zoom-in 0.4s ease-out forwards",
        "orbit": "orbit 4s linear infinite",
        "sun-rays": "sun-rays 10s linear infinite",
        "bubble-rise": "bubble-rise 4s ease-in-out infinite",
      },
      
      // Keyframes (referencing CSS keyframes defined in globals.css)
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(3deg)" },
        },
        "float-horizontal": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(10px)" },
        },
        "float-rotate": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-15px) rotate(5deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "1" },
          "100%": { transform: "scale(2)", opacity: "0" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 5px var(--ocean), 0 0 10px var(--ocean), 0 0 15px var(--ocean)" },
          "50%": { boxShadow: "0 0 10px var(--ocean), 0 0 20px var(--ocean), 0 0 30px var(--ocean)" },
        },
        "pulse-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "gradient-flow": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      
      // Spacing
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "30": "7.5rem",
      },
      
      // Z-Index Scale
      zIndex: {
        "60": "60",
        "70": "70",
        "80": "80",
        "90": "90",
        "100": "100",
      },
      
      // Box Shadow
      boxShadow: {
        "glow-primary": "0 0 20px rgba(0, 123, 255, 0.4)",
        "glow-secondary": "0 0 20px rgba(40, 167, 69, 0.4)",
        "glow-accent": "0 0 20px rgba(255, 193, 7, 0.4)",
        "glow-lg": "0 0 40px rgba(0, 123, 255, 0.3)",
      },
      
      // Transition Duration
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "900": "900ms",
      },
      
      // Transition Timing Function
      timingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "ease-out-back": "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
      
      // Background Image
      backgroundImage: {
        "gradient-ocean": "linear-gradient(135deg, var(--ocean) 0%, var(--sea) 100%)",
        "gradient-nature": "linear-gradient(135deg, var(--nature) 0%, var(--nature-light) 100%)",
        "gradient-sunset": "linear-gradient(135deg, var(--sand) 0%, #FF6B6B 50%, var(--ocean) 100%)",
        "gradient-hero": "linear-gradient(180deg, rgba(0, 123, 255, 0.1) 0%, transparent 50%)",
        "gradient-radial-ocean": "radial-gradient(circle, var(--ocean-light) 0%, transparent 70%)",
      },
      
      // Backdrop Blur
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
