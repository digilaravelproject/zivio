import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
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
    const prefersReducedMotion = useReducedMotion();
    const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];
    const shouldShowText = activeSlide.showText !== false;

    return (
        <section className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#080808] text-[#F5F5F2] sm:min-h-[680px]">
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
                            <motion.div
                                aria-label={slide.title}
                                role="img"
                                className="absolute inset-0 will-change-transform"
                                style={{
                                    background:
                                        'radial-gradient(circle at 74% 40%, rgba(184, 148, 95, 0.1), transparent 30%), linear-gradient(120deg, rgba(8, 8, 8, 0.02), rgba(8, 8, 8, 0.16))',
                                }}
                                initial={false}
                                animate={{
                                    scale:
                                        prefersReducedMotion
                                            ? 1
                                            : activeIndex === index
                                              ? [1.03, 1.1]
                                              : 1,
                                }}
                                transition={{
                                    duration:
                                        activeIndex === index ? 7.5 : 1.4,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                            >
                                <img
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
                                    className="h-full w-full object-cover"
                                    sizes="100vw"
                                />
                            </motion.div>
                            <div className="absolute inset-0 bg-[#080808]/12" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/76 via-[#080808]/30 to-[#080808]/4" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/78 via-[#080808]/6 to-[#080808]/22" />
                            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#090909] via-[#090909]/56 to-transparent" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(184,148,95,0.08)_1px,transparent_1px)] bg-[size:28vw_100%] opacity-[0.1]" />
            <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_26%_78%,rgba(255,239,205,0.07),transparent_28%)]" />

            <div className="pointer-events-none absolute inset-0 z-40 mx-auto flex h-full max-w-7xl items-end px-4 pt-24 pb-28 sm:px-6 sm:pb-34 lg:px-10 lg:pb-36">
                <AnimatePresence mode="wait">
                    {shouldShowText && (
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            className="pointer-events-auto relative w-full max-w-[40rem] drop-shadow-[0_22px_52px_rgba(0,0,0,0.58)]"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.55 }}
                                className="mb-3 font-sans text-[0.58rem] font-semibold tracking-[0.22em] text-[#D2B276] uppercase sm:mb-4 sm:text-[0.68rem] sm:tracking-[0.28em]"
                            >
                                Premium Architectural Lighting
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.65 }}
                                className="max-w-3xl text-[clamp(2.35rem,10vw,3.8rem)] leading-[1.02] font-medium tracking-normal text-balance text-[#F8F5EC] sm:text-[clamp(3.7rem,7.4vw,5.5rem)] lg:text-[clamp(4.6rem,5.8vw,6.2rem)]"
                            >
                                {activeSlide.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28, duration: 0.65 }}
                                className="mt-4 max-w-lg font-sans text-sm leading-6 tracking-[0.01em] text-[#E7DFD0] sm:mt-5 sm:text-base sm:leading-8"
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

            <div className="absolute right-4 bottom-5 left-4 z-50 mx-auto flex max-w-7xl items-center justify-between gap-3 sm:right-6 sm:bottom-8 sm:left-6 sm:gap-6 lg:right-10 lg:left-10">
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
