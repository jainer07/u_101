import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import { ListCard } from "./ListCard";
import fv from "./assets/FV.png";
import nuevoLiberalismo from "./assets/nuevo-liberalismo.jpeg";
import justa from "./assets/colombia-justa-libres.png";
import partidou from "./assets/u.jpeg";
import pacto from "./assets/pacto.png";
import frente from "./assets/frente.jpeg";
import Liberal from "./assets/Liberal.png";
import democ from "./assets/democ.png";
import verde from "./assets/verde.png";
import conservador from "./assets/c.jpeg";

const BALLOT = {
    title: "VOTO PARA CÁMARA DE REPRESENTANTES",
    subtitle: "CIRCUNSCRIPCIÓN TERRITORIAL CESAR",
    date: "8 DE MARZO DE 2026",
    rule: "MARCAR MÁS DE UNA LISTA ANULA EL VOTO",
};

const LISTS = [
    {
        id: "ahora_colombia",
        name: "AHORA COLOMBIA",
        preferente: true,
        numbers: ["101", "102", "103", "104"],
        logo: nuevoLiberalismo,
    },
    {
        id: "colombia_justa_libres",
        name: "PARTIDO COLOMBIA JUSTA LIBRES",
        preferente: false,
        numbers: [],
        logo: justa,
    },
    {
        id: "partido_u",
        name: "PARTIDO DE LA UNIÓN POR LA GENTE - PARTIDO DE LA U",
        preferente: true,
        numbers: ["101", "102", "103", "104"],
        logo: partidou,
    },
    {
        id: "pacto_historico",
        name: "PACTO HISTÓRICO CESAR",
        preferente: false,
        numbers: [],
        logo: pacto,
    },
    {
        id: "frente_amplio_unitario",
        name: "FRENTE AMPLIO UNITARIO",
        preferente: true,
        numbers: ["101", "102", "103", "104"],
        logo: frente,
    },
    {
        id: "liberal",
        name: "PARTIDO LIBERAL COLOMBIANO",
        preferente: true,
        numbers: ["101", "102", "103", "104"],
        logo: Liberal,
    },
    {
        id: "centro_democratico",
        name: "PARTIDO CENTRO DEMOCRÁTICO",
        preferente: false,
        numbers: [],
        logo: democ,
    },
    {
        id: "frente_amplio_cesar",
        name: "FRENTE AMPLIO DEL CESAR",
        preferente: true,
        numbers: ["102", "104"],
        logo: verde,
    },
    {
        id: "conservador",
        name: "PARTIDO CONSERVADOR COLOMBIANO",
        preferente: true,
        numbers: ["101", "102", "103", "104"],
        logo: conservador,
    },
    {
        id: "blanco",
        name: "VOTO EN BLANCO",
        preferente: false,
        numbers: [],
        logo: null,
        isBlank: true,
    },
];

function App() {
    const ALLOWED_LIST = "partido_u";
    const ALLOWED_NUMBER = "101";
    
    const [logoMarked, setLogoMarked] = useState(false);
    const [numberMarked, setNumberMarked] = useState(false);
    const [toast, setToast] = useState(null); // { type: "error" | "ok", text: string }
    const [celebrated, setCelebrated] = useState(false);
    
    // ✅ Zoom automático por tamaño + zoom manual por botón (se multiplican)
    const MANUAL_ZOOMS = [1, 1.1, 1.2, 1.3, 1.5]; // pasos del botón (relativo al auto)
    const [manualZoom, setManualZoom] = useState(1); // lo que cambia el botón
    const [autoZoom, setAutoZoom] = useState(1);     // lo que manda el tamaño

    function getAutoZoom() {
        if (typeof window === "undefined") return 1;

        // Móvil: 50% | Desktop: 100%
        return window.innerWidth <= 640 ? 0.5 : 1;
    }

    // autoZoom reactivo al resize (SIEMPRE)
    useEffect(() => {
        function onResize() {
            setAutoZoom(getAutoZoom());
        }

        onResize(); // al montar
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    // zoom final que usas en el scale()
    const zoom = autoZoom * manualZoom;

    function toggleZoom() {
        setManualZoom((z) => {
            let idx = 0;
            let best = Infinity;

            for (let i = 0; i < MANUAL_ZOOMS.length; i++) {
                const d = Math.abs(MANUAL_ZOOMS[i] - z);
                if (d < best) {
                    best = d;
                    idx = i;
                }
            }
            return MANUAL_ZOOMS[(idx + 1) % MANUAL_ZOOMS.length];
        });
    }

    const resetTimerRef = useRef(null);
    const msgTimerRef = useRef(null);

    function scheduleAutoReset(ms = 4000) {
        if (resetTimerRef.current) clearTimeout(resetTimerRef.current);

        resetTimerRef.current = setTimeout(() => {
            setLogoMarked(false);
            setNumberMarked(false);
            setCelebrated(false);
            setToast(null);
        }, ms);
    }

    function showMustMark() {
        setToast({
            type: "error",
            text: "Debes marcar el Partido de la U y el número 101.",
        });

        if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
        msgTimerRef.current = setTimeout(() => setToast(null), 2800);
    }

    function onLogoClick(listId) {
        if (listId !== ALLOWED_LIST) {
            showMustMark();
            return;
        }
        setToast(null);
        setLogoMarked(true);
    }

    function onNumberClick(listId, number) {
        if (listId !== ALLOWED_LIST || number !== ALLOWED_NUMBER) {
            showMustMark();
            return;
        }
        setToast(null);
        setNumberMarked(true);
    }

    useEffect(() => {
        if (logoMarked && numberMarked && !celebrated) {
            setCelebrated(true);

            confetti({ particleCount: 120, spread: 70, origin: { y: 0.6 } });
            setTimeout(() => {
                confetti({ particleCount: 90, spread: 90, origin: { y: 0.55 } });
            }, 250);

            setToast({ type: "ok", text: "¡Perfecto! Marcaste correctamente U 101." });

            scheduleAutoReset(4000);
        }
    }, [logoMarked, numberMarked, celebrated]);

    useEffect(() => {
        return () => {
            if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
            if (msgTimerRef.current) clearTimeout(msgTimerRef.current);
        };
    }, []);

    return (
        <div className="min-h-screen bg-neutral-100 p-4">
            {toast && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                    <div
                        className={[
                            "toast-move px-6 py-3 shadow-2xl border font-extrabold uppercase text-sm",
                            toast.type === "error"
                                ? "bg-black text-white border-white/20"
                                : "bg-white text-black border-black",
                        ].join(" ")}
                    >
                        {toast.type === "error" ? "⚠ " : "✅ "}
                        {toast.text}
                    </div>
                </div>
            )}

            <div className="mx-auto max-w-4xl">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between gap-3 border border-black px-3 py-2">
                        <div className="flex items-center gap-2">
                            <img
                                src={fv}
                                alt="Fuerza Vallenata"
                                className="h-7 w-auto object-contain"
                            />
                        </div>

                        <button
                            type="button"
                            onClick={toggleZoom}
                            className="border border-black px-3 py-1 text-[11px] font-extrabold uppercase bg-white hover:bg-black/5"
                        >
                            Zoom: {Math.round(zoom * 100)}%
                        </button>
                    </div>

                    <div className="text-center mt-4">
                        <div className="text-sm font-semibold">{BALLOT.title}</div>
                        <div className="text-xs text-black/70">{BALLOT.subtitle}</div>
                        <div className="text-xs text-black/60 mt-1">{BALLOT.date}</div>

                        <div className="mt-3 text-center text-red-600 font-bold uppercase text-sm">
                            {BALLOT.rule}
                        </div>
                    </div>

                    {/* ✅ Opción B: 2 columnas siempre + scroll horizontal */}
                    <div className="mt-3 overflow-x-auto">
                        <div
                            className="min-w-[820px] inline-block"
                            style={{ transform: `scale(${zoom})`, transformOrigin: "top left" }}
                        >
                            <div className="grid grid-cols-2 gap-3">
                                {LISTS.map((item) => (
                                    <ListCard
                                        key={item.id}
                                        item={item}
                                        logoMarked={item.id === ALLOWED_LIST && logoMarked}
                                        numberMarked={item.id === ALLOWED_LIST && numberMarked}
                                        showGuideLogo={item.id === ALLOWED_LIST && !logoMarked}
                                        showGuide101={item.id === ALLOWED_LIST && logoMarked && !numberMarked}
                                        onLogoClick={onLogoClick}
                                        onNumberClick={onNumberClick}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default App;