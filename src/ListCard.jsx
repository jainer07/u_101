import { Rayon } from "./Rayon";

export function ListCard({
    item,
    logoMarked,
    numberMarked,
    showGuideLogo,
    showGuide101,
    onLogoClick,
    onNumberClick,
}) {
    if (item.isBlank) {
        return (
            <div className="w-full bg-white border border-black rounded-none p-3">
                <div className="h-[105px] flex items-center justify-start">
                    <div className="text-left uppercase leading-none">
                        <div className="text-[40px] font-normal">VOTO EN</div>
                        <div className="text-[40px] font-normal">BLANCO</div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full text-left bg-white border border-black rounded-none">
            <div className="grid grid-cols-[1fr_140px]">
                {/* IZQUIERDA */}
                <div className="p-2">
                    <div className="text-[11px] font-bold uppercase leading-tight text-center">
                        {item.name}
                    </div>

                    {/* Logo */}
                    <div className="relative mt-2 h-[80px] w-full">
                        {/* Callout por fuera del área recortada */}
                        {showGuideLogo ? (
                            <>
                                <div className="guide-badge absolute -top-9 left-1/2 -translate-x-1/2 bg-red-700 text-white font-extrabold text-xs px-2 py-1 rounded whitespace-nowrap">
                                    Marca aquí
                                </div>
                                <div className="guide-arrow absolute -top-5 left-1/2 -translate-x-1/2 text-red-700 text-2xl leading-none">
                                    ↓
                                </div>
                            </>
                        ) : null}

                        {/* Botón del logo (aquí sí puede recortar sin afectar el callout) */}
                        <button
                            type="button"
                            onClick={() => onLogoClick(item.id)}
                            className="h-full w-full flex items-center justify-center overflow-hidden relative"
                        >
                            {item.logo ? (
                                <img
                                    src={item.logo}
                                    alt={item.name}
                                    className="h-full w-full object-contain object-center"
                                />
                            ) : null}

                            {logoMarked ? <Rayon size="lg" /> : null}
                        </button>
                    </div>

                    <div className="mt-2 text-[11px] font-bold uppercase text-center">
                        {item.preferente ? "PREFERENTE" : "NO PREFERENTE"}
                    </div>
                </div>

                {/* DERECHA */}
                <div className="p-2 flex items-center justify-center">
                    {item.preferente ? (
                        <div className="grid grid-cols-2 gap-2">
                            {item.numbers.map((n) => {
                                const is101 = n === "101";
                                return (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => onNumberClick(item.id, n)}
                                        className="w-[56px] border border-black rounded-[12px] text-center font-bold text-sm leading-none py-2 relative"
                                    >
                                        {n}
                                        {numberMarked && is101 ? <Rayon size="sm" /> : null}

                                        {/* Flecha guía al 101 (solo Partido U) */}
                                        {showGuide101 && is101 ? (
                                            <>
                                                <div className="guide-badge absolute -top-9 left-1/2 -translate-x-1/2 bg-red-700 text-white font-extrabold text-xs px-2 py-1 rounded whitespace-nowrap">
                                                    Marca 101
                                                </div>
                                                <div className="guide-arrow absolute -top-5 left-1/2 -translate-x-1/2 text-red-700 text-2xl leading-none">
                                                    ↓
                                                </div>
                                            </>
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="w-full h-full" />
                    )}
                </div>
            </div>
        </div>
    );
}