import { AnimatePresence, motion } from 'framer-motion';
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
    const activeSlide = heroSlides[activeIndex] ?? heroSlides[0];
    const shouldShowText = activeSlide.showText !== false;

    return (
        <section className="relative h-[100svh] min-h-[620px] overflow-hidden bg-[#0A0A0A] text-[#F5F5F2] sm:min-h-[680px]">
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
                                        'radial-gradient(circle at 72% 42%, rgba(184, 155, 114, 0.18), transparent 28%), linear-gradient(120deg, rgba(10, 10, 10, 0.12), rgba(10, 10, 10, 0.22))',
                                }}
                                initial={false}
                                animate={{
                                    scale:
                                        activeIndex === index
                                            ? [1.08, 1.18]
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
                            <div className="absolute inset-0 bg-[#0A0A0A]/25" />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/44 to-[#0A0A0A]/10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/86 via-[#0A0A0A]/8 to-[#0A0A0A]/36" />
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(184,155,114,0.14)_1px,transparent_1px)] bg-[size:28vw_100%] opacity-20" />

            <div className="pointer-events-none absolute inset-0 z-40 mx-auto flex h-full max-w-7xl items-end px-4 pb-28 pt-24 sm:px-6 sm:pb-32 lg:px-10 lg:pb-36">
                <AnimatePresence mode="wait">
                    {shouldShowText && (
                        <motion.div
                            key={activeSlide.id}
                            initial={{ opacity: 0, y: 34, filter: 'blur(8px)' }}
                            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: -18, filter: 'blur(6px)' }}
                            transition={{ duration: 0.85, ease: 'easeOut' }}
                            className="pointer-events-auto relative w-full max-w-[46rem] drop-shadow-[0_24px_60px_rgba(0,0,0,0.65)]"
                        >
                            <motion.p
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.55 }}
                                className="mb-4 text-[0.68rem] font-semibold tracking-[0.24em] text-[#D7B98A] uppercase sm:mb-5 sm:text-xs sm:tracking-[0.34em]"
                            >
                                Premium Architectural Lighting
                            </motion.p>

                            <motion.h1
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.18, duration: 0.65 }}
                                className="max-w-4xl text-[clamp(3.25rem,15vw,5.2rem)] leading-[0.88] font-semibold tracking-normal text-balance text-[#F8F5EC] sm:text-[clamp(4.6rem,10vw,7.4rem)] lg:text-[clamp(6.5rem,8vw,8.5rem)]"
                            >
                                {activeSlide.title}
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.28, duration: 0.65 }}
                                className="mt-5 max-w-2xl text-base leading-7 text-[#E0DBCF] sm:mt-6 sm:text-xl sm:leading-8"
                            >
                                {activeSlide.subtitle}
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.38, duration: 0.65 }}
                                className="mt-7 sm:mt-9"
                            >
                                <SiteButton href={activeSlide.buttonHref}>
                                    {activeSlide.buttonText}
                                </SiteButton>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="absolute right-4 bottom-6 left-4 z-50 mx-auto flex max-w-7xl items-center justify-between gap-3 sm:right-6 sm:bottom-8 sm:left-6 sm:gap-6 lg:right-10 lg:left-10">
                <div className="flex min-w-20 items-center gap-2 text-sm font-medium tracking-[0.16em] text-[#F5F5F2] sm:min-w-28 sm:gap-3 sm:text-base sm:tracking-[0.2em]">
                    <span>{formatSlideNumber(activeIndex + 1)}</span>
                    <span className="h-px w-6 bg-[#DA9807] sm:w-10" />
                    <span className="text-[#CFCFCB]">
                        {formatSlideNumber(heroSlides.length)}
                    </span>
                </div>

                <div className="hidden h-px flex-1 overflow-hidden bg-white/20 sm:block">
                    <motion.div
                        className="h-full bg-[#DA9807]"
                        animate={{ scaleX: autoplayProgress }}
                        transition={{ duration: 0.15 }}
                        style={{ transformOrigin: 'left' }}
                    />
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                    <button
                        type="button"
                        onClick={() => swiper?.slidePrev()}
                        className="grid size-10 place-items-center border border-white/20 bg-[#0A0A0A]/20 text-[#F5F5F2] backdrop-blur-sm transition duration-300 hover:border-[#DA9807] hover:bg-[#DA9807]/10 hover:text-[#DA9807] sm:size-11"
                        aria-label="Previous slide"
                    >
                        <ArrowLeft className="size-5" strokeWidth={1.5} />
                    </button>
                    <button
                        type="button"
                        onClick={() => swiper?.slideNext()}
                        className="grid size-10 place-items-center border border-white/20 bg-[#0A0A0A]/20 text-[#F5F5F2] backdrop-blur-sm transition duration-300 hover:border-[#DA9807] hover:bg-[#DA9807]/10 hover:text-[#DA9807] sm:size-11"
                        aria-label="Next slide"
                    >
                        <ArrowRight className="size-5" strokeWidth={1.5} />
                    </button>
                </div>
            </div>
        </section>
    );
}
