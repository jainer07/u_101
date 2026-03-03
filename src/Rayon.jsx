export function Rayon({ size = "lg" }) {
    const scale = size === "sm" ? 0.8 : 0.7;

    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg
                viewBox="0 0 160 110"
                className="w-full h-full"
                style={{ transform: `scale(${scale})` }}
            >
                <path
                    d="M15 15 L80 60 L145 95"
                    fill="none"
                    stroke="black"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                />
                <path
                    d="M145 15 L80 60 L15 95"
                    fill="none"
                    stroke="black"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.85"
                />
            </svg>
        </div>
    );
}