import React, { useState, useCallback, useEffect, useRef } from 'react';
import memes, { Meme } from './memes';
import { X, ZoomIn, Tag, ChevronLeft, ChevronRight } from 'lucide-react';

function memeUrl(filename: string): string {
    return `${process.env.PUBLIC_URL}/memes/${filename}`;
}

// ── Swipe Hook ────────────────────────────────────────────────────────────────
interface SwipeHandlers {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
}

function useSwipe(onSwipeLeft: () => void, onSwipeRight: () => void, threshold = 50): SwipeHandlers {
    const startX = useRef<number | null>(null);
    const currentX = useRef<number | null>(null);

    const onTouchStart = (e: React.TouchEvent) => {
        startX.current = e.touches[0].clientX;
        currentX.current = e.touches[0].clientX;
    };

    const onTouchMove = (e: React.TouchEvent) => {
        currentX.current = e.touches[0].clientX;
    };

    const onTouchEnd = () => {
        if (startX.current === null || currentX.current === null) return;
        const delta = startX.current - currentX.current;
        if (Math.abs(delta) >= threshold) {
            delta > 0 ? onSwipeLeft() : onSwipeRight();
        }
        startX.current = null;
        currentX.current = null;
    };

    return { onTouchStart, onTouchMove, onTouchEnd };
}

// ── Lightbox ──────────────────────────────────────────────────────────────────
interface LightboxProps {
    meme: Meme;
    total: number;
    index: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

function Lightbox({ meme, total, index, onClose, onPrev, onNext }: LightboxProps) {
    // Arrow key navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrev();
            if (e.key === 'ArrowRight') onNext();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [onClose, onPrev, onNext]);

    // Swipe gestures
    const swipe = useSwipe(onNext, onPrev);

    // Slide animation state
    const [animClass, setAnimClass] = useState('');
    const prevIndex = useRef(index);

    useEffect(() => {
        if (prevIndex.current === index) return;
        const goingRight = index > prevIndex.current ||
            (prevIndex.current === total - 1 && index === 0);
        setAnimClass(goingRight ? 'animate-slide-in-right' : 'animate-slide-in-left');
        prevIndex.current = index;
        const t = setTimeout(() => setAnimClass(''), 250);
        return () => clearTimeout(t);
    }, [index, total]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
            onClick={onClose}
            {...swipe}
        >
            {/* Prev button */}
            <button
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition hidden sm:flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                aria-label="Previous"
            >
                <ChevronLeft className="w-7 h-7" />
            </button>

            {/* Image container */}
            <div
                className={`flex flex-col items-center gap-3 max-w-[90vw] max-h-[90vh] ${animClass}`}
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={memeUrl(meme.filename)}
                    alt={meme.title}
                    className="max-w-full max-h-[78vh] rounded-lg shadow-2xl object-contain select-none"
                    draggable={false}
                />
                <div className="flex flex-col items-center gap-2">
                    <p className="text-white text-lg font-semibold">{meme.title}</p>
                    {meme.tags && meme.tags.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-center">
                            {meme.tags.map(tag => (
                                <span key={tag} className="text-xs bg-blue-700/60 text-blue-200 px-2 py-0.5 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                    {/* Counter */}
                    <p className="text-gray-500 text-sm">{index + 1} / {total}</p>
                </div>
            </div>

            {/* Close button */}
            <button
                className="absolute top-4 right-4 text-white bg-black/40 hover:bg-black/70 rounded-full p-2 transition"
                onClick={onClose}
                aria-label="Close"
            >
                <X className="w-5 h-5" />
            </button>

            {/* Next button */}
            <button
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition hidden sm:flex items-center justify-center"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                aria-label="Next"
            >
                <ChevronRight className="w-7 h-7" />
            </button>

            {/* Mobile swipe hint — only shows briefly on first open */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 text-xs sm:hidden pointer-events-none select-none">
                ← swipe →
            </div>
        </div>
    );
}

// ── MemeCard ──────────────────────────────────────────────────────────────────
interface MemeCardProps {
    meme: Meme;
    onClick: () => void;
}

function MemeCard({ meme, onClick }: MemeCardProps) {
    return (
        <div
            className="group relative bg-[#1e2022] rounded-xl overflow-hidden cursor-pointer shadow-lg hover:shadow-blue-900/50 hover:scale-[1.03] transition-transform duration-200 border border-transparent hover:border-blue-700"
            onClick={onClick}
        >
            <img
                src={memeUrl(meme.filename)}
                alt={meme.title}
                className="w-full h-48 object-cover"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 drop-shadow-lg" />
            </div>
            <div className="p-3">
                <p className="text-white font-medium truncate">{meme.title}</p>
                {meme.tags && meme.tags.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-1">
                        {meme.tags.map(tag => (
                            <span key={tag} className="text-xs bg-blue-900/60 text-blue-300 px-2 py-0.5 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// ── Main MemeBrowser ──────────────────────────────────────────────────────────
export default function MemeBrowser() {
    const [search, setSearch] = useState('');
    const [activeTag, setActiveTag] = useState<string | null>(null);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const allTags = Array.from(new Set(memes.flatMap(m => m.tags ?? []))).sort();

    const filtered = memes.filter(m => {
        const matchesSearch =
            search === '' ||
            m.title.toLowerCase().includes(search.toLowerCase()) ||
            (m.tags ?? []).some(t => t.toLowerCase().includes(search.toLowerCase()));
        const matchesTag = activeTag === null || (m.tags ?? []).includes(activeTag);
        return matchesSearch && matchesTag;
    });

    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevMeme = useCallback(() =>
            setLightboxIndex(i => i === null ? null : (i - 1 + filtered.length) % filtered.length),
        [filtered.length]);
    const nextMeme = useCallback(() =>
            setLightboxIndex(i => i === null ? null : (i + 1) % filtered.length),
        [filtered.length]);

    return (
        <div className="min-h-screen bg-[#181a1b] text-white px-4 py-8">
            {/* Slide animation styles injected once */}
            <style>{`
                @keyframes slideInRight {
                    from { opacity: 0; transform: translateX(60px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                @keyframes slideInLeft {
                    from { opacity: 0; transform: translateX(-60px); }
                    to   { opacity: 1; transform: translateX(0); }
                }
                .animate-slide-in-right { animation: slideInRight 0.22s ease-out; }
                .animate-slide-in-left  { animation: slideInLeft  0.22s ease-out; }
            `}</style>

            <h1 className="text-5xl font-bold mb-2 text-center">Mémek</h1>
            <p className="text-gray-400 text-center mb-8 italic">{filtered.length} mém</p>

            {/* Search + Tag filters */}
            <div className="max-w-3xl mx-auto mb-8 flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Keresés..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#1e2022] text-white placeholder-gray-500 rounded-lg px-4 py-2 outline-none border border-gray-700 focus:border-blue-600 transition"
                />
                {allTags.length > 0 && (
                    <div className="flex gap-2 flex-wrap items-center">
                        <Tag className="w-4 h-4 text-gray-500" />
                        <button
                            onClick={() => setActiveTag(null)}
                            className={`text-xs px-3 py-1 rounded-full border transition ${
                                activeTag === null
                                    ? 'bg-blue-600 border-blue-600 text-white'
                                    : 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-300'
                            }`}
                        >
                            Összes
                        </button>
                        {allTags.map(tag => (
                            <button
                                key={tag}
                                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                                className={`text-xs px-3 py-1 rounded-full border transition ${
                                    activeTag === tag
                                        ? 'bg-blue-600 border-blue-600 text-white'
                                        : 'border-gray-600 text-gray-400 hover:border-blue-500 hover:text-blue-300'
                                }`}
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <p className="text-center text-gray-500 text-xl mt-20">Nincs találat 😔</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
                    {filtered.map((meme, i) => (
                        <MemeCard key={meme.filename} meme={meme} onClick={() => setLightboxIndex(i)} />
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightboxIndex !== null && filtered[lightboxIndex] && (
                <Lightbox
                    meme={filtered[lightboxIndex]}
                    total={filtered.length}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onPrev={prevMeme}
                    onNext={nextMeme}
                />
            )}
        </div>
    );
}