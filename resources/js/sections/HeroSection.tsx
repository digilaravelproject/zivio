import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SiteButton } from '@/components/site/SiteButton';
import { heroSlides } from '@/data/heroSlides';

import 'swiper/css';
import 'swiper/css/effect-fade';

const formatSlideNumber = (number: number) => number.toString().padStart(2, '0');

export function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [autoplayProgress, setAutoplayProgress] = useState(0);
    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const prefersReducedMotion = useReducedMotion();
    const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];
    const shouldShowText = activeSlide.showText !== false;

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        const slide = heroSlides[0];
        return (
            <section className="relative h-[85svh] min-h-[500px] overflow-hidden bg-[#080808] text-[#F5F5F2] sm:min-h-[600px]">
                <div className="absolute inset-0 z-0 h-full w-full">
                    <div className="relative h-full w-full overflow-hidden bg-[#0A0A0A]">
                        <div
                            aria-label={slide.title}
                            role="img"
                            className="absolute inset-0 overflow-hidden"
                            style={{
                                background:
                                    'radial-gradient(circle at 74% 40%, rgba(184, 148, 95, 0.1), transparent 30%), linear-gradient(120deg, rgba(8, 8, 8, 0.02), rgba(8, 8, 8, 0.16))',
                            }}
                        >
                            <img
                                src={slide.image}
                                alt={slide.title}
                                width={2200}
                                height={1400}
                                className="h-full w-full object-cover scale-[1.0]"
                                sizes="100vw"
                            />
                        </div>
                        <div className="absolute inset-0 bg-[#080808]/4" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 via-[#080808]/15 to-[#080808]/2" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/45 via-[#080808]/3 to-[#080808]/10" />
                        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090909]/75 via-[#090909]/25 to-transparent" />
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(184,148,95,0.06)_1px,transparent_1px)] bg-[size:28vw_100%] opacity-[0.08]" />
                <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_26%_78%,rgba(255,239,205,0.055),transparent_28%)]" />

                <div className="pointer-events-none absolute inset-0 z-40 mx-auto flex h-full max-w-7xl items-end px-4 pt-24 pb-28 sm:px-6 sm:pb-34 lg:px-10 lg:pb-36">
                    <div className="pointer-events-auto relative w-full max-w-[36rem] drop-shadow-[0_18px_44px_rgba(0,0,0,0.48)]">
                        <p className="mb-3 font-sans text-[0.56rem] font-medium tracking-[0.2em] text-[#D2B276] uppercase sm:mb-4 sm:text-[0.64rem] sm:tracking-[0.25em]">
                            Premium Architectural Lighting
                        </p>
                        <h1 className="max-w-3xl text-[clamp(2.1rem,8.8vw,3.35rem)] leading-[1.06] font-light tracking-normal text-balance text-[#F8F5EC] sm:text-[clamp(3.25rem,6.6vw,4.85rem)] lg:text-[clamp(4rem,5.1vw,5.35rem)]">
                            {slide.title}
                        </h1>
                        <p className="mt-4 max-w-md font-sans text-sm leading-6 tracking-[0.005em] text-[#E7DFD0] sm:mt-5 sm:text-[0.95rem] sm:leading-8">
                            {slide.subtitle}
                        </p>
                        <div className="mt-6 sm:mt-8">
                            <SiteButton href={slide.buttonHref}>
                                {slide.buttonText}
                            </SiteButton>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative h-[85svh] min-h-[500px] overflow-hidden bg-[#080808] text-[#F5F5F2] sm:min-h-[600px]">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop
                speed={1200}
                autoplay={{
                    delay: 5200,
                    disableOnInteraction: false,
                }}
                onSwiper={setSwiper}
                onSlideChange={(swiperInstance) =>
                    setActiveIndex(swiperInstance.realIndex)
                }
                onAutoplayTimeLeft={(_, __, progress) =>
                    setAutoplayProgress(1 - progress)
                }
                className="absolute inset-0 z-0 h-full w-full [&_.swiper-slide]:h-full [&_.swiper-wrapper]:h-full"
            >
                {heroSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id} className="h-full">
                        <div className="relative h-full w-full overflow-hidden bg-[#0A0A0A]">
                            <div
                                aria-label={slide.title}
                                role="img"
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    background:
                                        'radial-gradient(circle at 74% 40%, rgba(184, 148, 95, 0.1), transparent 30%), linear-gradient(120deg, rgba(8, 8, 8, 0.02), rgba(8, 8, 8, 0.16))',
                                }}
                            >
                                <motion.img
                                    src={slide.image}
                                    alt={slide.title}
                                    width={2200}
                                    height={1400}
                                    loading={index === 0 ? 'eager' : 'lazy'}
                                    fetchPriority={
                                        index === 0 ? 'high' : 'low'
                                    }
                                    decoding={index === 0 ? 'sync' : 'async'}
                                    draggable={false}
                                    className="h-full w-full object-cover origin-center will-change-transform"
                                    sizes="100vw"
                                    initial={{ scale: 1.0 }}
                                    animate={
                                        activeIndex === index
                                            ? { scale: 1.16 }
                                            : { scale: 1.0 }
                                    }
                                    transition={{
                                        duration: activeIndex === index ? 6.8 : 0.8,
                                        ease: 'linear',
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 bg-[#080808]/4" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/40 via-[#080808]/15 to-[#080808]/2" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/45 via-[#080808]/3 to-[#080808]/10" />
                            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090909]/75 via-[#090909]/25 to-transparent" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(184,148,95,0.06)_1px,transparent_1px)] bg-[size:28vw_100%] opacity-[0.08]" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_26%_78%,rgba(255,239,205,0.055),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 z-40 mx-auto flex h-full max-w-7xl items-end px-4 pt-24 pb-28 sm:px-6 sm:pb-34 lg:px-10 lg:pb-36">
                <AnimatePresence mode="wait">
                    {shouldShowText && (
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-auto relative w-full max-w-[36rem] drop-shadow-[0_18px_44px_rgba(0,0,0,0.48)]"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.55 }}
                                className="mb-3 font-sans text-[0.56rem] font-medium tracking-[0.2em] text-[#D2B276] uppercase sm:mb-4 sm:text-[0.64rem] sm:tracking-[0.25em]"
                            >
                                Premium Architectural Lighting
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.65 }}
                                className="max-w-3xl text-[clamp(2.1rem,8.8vw,3.35rem)] leading-[1.06] font-light tracking-normal text-balance text-[#F8F5EC] sm:text-[clamp(3.25rem,6.6vw,4.85rem)] lg:text-[clamp(4rem,5.1vw,5.35rem)]"
                            >
                                {activeSlide.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28, duration: 0.65 }}
                                className="mt-4 max-w-md font-sans text-sm leading-6 tracking-[0.005em] text-[#E7DFD0] sm:mt-5 sm:text-[0.95rem] sm:leading-8"
                            >
                                {activeSlide.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, duration: 0.65 }}
                                className="mt-6 sm:mt-8"
                            >
                                <SiteButton href={activeSlide.buttonHref}>
                                    {activeSlide.buttonText}
                                </SiteButton>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute right-4 bottom-5 left-4 z-30 mx-auto flex max-w-7xl items-center justify-between gap-3 sm:right-6 sm:bottom-8 sm:left-6 sm:gap-6 lg:right-10 lg:left-10">
                <div className="flex min-w-20 items-center gap-2 font-sans text-xs font-semibold tracking-[0.18em] text-[#F5F5F2] sm:min-w-28 sm:gap-3 sm:text-sm sm:tracking-[0.22em]">
                    <span>{formatSlideNumber(activeIndex + 1)}</span>
                    <span className="h-px w-6 bg-[#B88A2A] sm:w-10" />
                    <span className="text-[#CFCFCB]">
                        {formatSlideNumber(heroSlides.length)}
                    </span>
                </div>

                <div className="hidden h-px flex-1 overflow-hidden bg-white/20 sm:block">
                    <motion.div
                        className="h-full bg-[#B88A2A]"
                        animate={{ scaleX: autoplayProgress }}
                        transition={{ duration: 0.15 }}
                        style={{ transformOrigin: 'left' }}
                    />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => swiper?.slidePrev()}
                        className="grid size-11 place-items-center border border-white/[0.16] bg-[#0A0A0A]/22 text-[#F5F5F2] backdrop-blur-sm transition duration-500 hover:border-[#B88A2A]/80 hover:bg-[#B88A2A]/10 hover:text-[#D2B276]"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="size-5" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        onClick={() => swiper?.slideNext()}
                        className="grid size-11 place-items-center border border-white/[0.16] bg-[#0A0A0A]/22 text-[#F5F5F2] backdrop-blur-sm transition duration-500 hover:border-[#B88A2A]/80 hover:bg-[#B88A2A]/10 hover:text-[#D2B276]"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="size-5" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}
