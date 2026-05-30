import { Link } from '@inertiajs/react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { projectsData } from '@/data/projectsData';
import { cn } from '@/lib/utils';

const formatCounter = (number: number) => number.toString().padStart(2, '0');

export function ProjectsShowcaseSection() {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
    const prefersReducedMotion = useReducedMotion();
    const activeProject = projectsData[activeProjectIndex];
    const totalProjects = projectsData.length;

    const handlePrevious = () => {
        setActiveProjectIndex((current) =>
            current === 0 ? totalProjects - 1 : current - 1,
        );
    };

    const handleNext = () => {
        setActiveProjectIndex((current) =>
            current === totalProjects - 1 ? 0 : current + 1,
        );
    };

    return (
        <section className="relative overflow-hidden bg-editorial-dark text-[#F5F5F2]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#B8945F]/24 to-transparent" />

            <div className="relative hidden min-h-[610px] overflow-hidden lg:block xl:min-h-[660px]">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={activeProject.id}
                        src={activeProject.image}
                        alt={activeProject.title}
                        width={1800}
                        height={1200}
                        loading="lazy"
                        decoding="async"
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{
                            opacity: 1,
                            scale: prefersReducedMotion ? 1 : 1.09,
                        }}
                        whileHover={{
                            scale: prefersReducedMotion ? 1 : 1.105,
                        }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{
                            duration: 1.05,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                        sizes="100vw"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-[#050505]/8" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/68 via-[#050505]/34 to-[#050505]/6" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/66 via-transparent to-[#050505]/18" />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[-30%] w-[42%] bg-[linear-gradient(105deg,transparent_0%,rgba(255,233,190,0.11)_46%,transparent_68%)] blur-sm"
                    animate={{
                        x: prefersReducedMotion ? '0%' : ['0%', '320%'],
                        opacity: prefersReducedMotion ? 0.18 : [0, 0.55, 0],
                    }}
                    transition={{
                        duration: 8.5,
                        ease: [0.22, 1, 0.36, 1],
                        repeat: Infinity,
                        repeatDelay: 2.2,
                    }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.026)_1px,transparent_1px)] bg-[size:24vw_100%] opacity-[0.08]" />

                <div className="relative z-10 mx-auto flex min-h-[610px] max-w-7xl flex-col justify-end px-10 py-18 xl:min-h-[660px] xl:py-20">
                    <div className="grid items-end gap-10 xl:grid-cols-[0.92fr_0.78fr]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 26, filter: 'blur(8px)' }}
                                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                exit={{ opacity: 0, y: -14, filter: 'blur(5px)' }}
                                transition={{
                                    duration: 0.72,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="max-w-xl"
                            >
                                <div className="mb-5 flex items-center gap-4">
                                    <span className="h-px w-12 bg-[#D2B276]/75" />
                                    <p className="font-sans text-[0.58rem] font-medium tracking-[0.22em] text-[#D2B276] uppercase">
                                        Project Showcase
                                    </p>
                                </div>
                                <p className="mb-4 inline-flex border border-[#D2B276]/20 bg-[#050505]/20 px-3 py-1.5 font-sans text-[0.56rem] font-medium tracking-[0.16em] text-[#D2B276] uppercase backdrop-blur-sm">
                                    {activeProject.category}
                                </p>
                                <h3 className="text-3xl leading-[1.08] font-light text-[#F8F5EC] xl:text-[2.45rem]">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-3 font-sans text-xs font-medium tracking-[0.16em] text-[#D2B276] uppercase">
                                    {activeProject.location}
                                </p>
                                <Link
                                    href={activeProject.href}
                                    className="mt-6 inline-flex items-center justify-center gap-2 border border-[#B8945F]/50 bg-[#050505]/14 px-5 py-3 font-sans text-[0.62rem] font-medium tracking-[0.15em] text-[#F5F5F2] uppercase backdrop-blur-sm transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
                                >
                                    Read More
                                </Link>
                            </motion.div>
                        </AnimatePresence>

                        <div className="justify-self-end">
                            <div className="mb-5 flex items-center justify-end gap-3 font-sans text-sm font-semibold tracking-[0.18em]">
                                <span>
                                    {formatCounter(activeProjectIndex + 1)}
                                </span>
                                <span className="h-px w-10 bg-[#B88A2A]/80" />
                                <span className="text-[#CFCFCB]">
                                    {formatCounter(totalProjects)}
                                </span>
                            </div>

                            <div className="grid w-[30rem] gap-3">
                                {projectsData.map((project, index) => {
                                    const isActive =
                                        activeProjectIndex === index;

                                    return (
                                        <button
                                            key={project.id}
                                            type="button"
                                            onClick={() =>
                                                setActiveProjectIndex(index)
                                            }
                                            className={cn(
                                                'group grid grid-cols-[5.8rem_1fr] items-center gap-4 border p-2 text-left backdrop-blur-md transition duration-500',
                                                isActive
                                                    ? 'border-[#D2B276]/48 bg-[#050505]/34 shadow-[0_0_34px_rgba(184,148,95,0.12)]'
                                                    : 'border-white/[0.08] bg-[#050505]/14 hover:border-[#B8945F]/30 hover:bg-[#050505]/26',
                                            )}
                                        >
                                            <span className="relative block aspect-[4/3] overflow-hidden bg-[#111111]">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    width={360}
                                                    height={270}
                                                    loading="lazy"
                                                    decoding="async"
                                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05]"
                                                    sizes="5.5rem"
                                                />
                                            </span>
                                            <span>
                                                <span className="mb-1 block font-sans text-[0.56rem] font-medium tracking-[0.17em] text-[#B8945F] uppercase">
                                                    {formatCounter(index + 1)} /{' '}
                                                    {project.category}
                                                </span>
                                                <span className="block text-base leading-6 font-normal text-[#F8F5EC]">
                                                    {project.title}
                                                </span>
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-5 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={handlePrevious}
                                    className="grid size-11 place-items-center rounded-full border border-white/[0.12] bg-[#050505]/32 text-[#F5F5F2] backdrop-blur-sm transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276]"
                                    aria-label="Previous project"
                                >
                                    <ArrowLeft
                                        className="size-5"
                                        strokeWidth={1.5}
                                    />
                                </button>
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="grid size-11 place-items-center rounded-full border border-white/[0.12] bg-[#050505]/32 text-[#F5F5F2] backdrop-blur-sm transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276]"
                                    aria-label="Next project"
                                >
                                    <ArrowRight
                                        className="size-5"
                                        strokeWidth={1.5}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative px-4 py-14 sm:px-6 sm:py-16 lg:hidden">
                <div className="pointer-events-none absolute inset-0 bg-editorial-dark" />
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-[-40%] w-[60%] bg-[linear-gradient(105deg,transparent_0%,rgba(255,233,190,0.09)_46%,transparent_68%)] blur-sm"
                    animate={{
                        x: prefersReducedMotion ? '0%' : ['0%', '250%'],
                        opacity: prefersReducedMotion ? 0.14 : [0, 0.42, 0],
                    }}
                    transition={{
                        duration: 8,
                        ease: [0.22, 1, 0.36, 1],
                        repeat: Infinity,
                        repeatDelay: 2,
                    }}
                />
                <div className="relative mx-auto max-w-2xl">
                    <div className="mb-5 flex items-center gap-4 sm:mb-7">
                        <span className="h-px w-10 bg-[#B88A2A]/80" />
                        <p className="font-sans text-[0.58rem] font-medium tracking-[0.24em] text-[#D2B276] uppercase">
                            Project Showcase
                        </p>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.figure
                            key={activeProject.id}
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{
                                duration: 0.58,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className="cinematic-image-frame group"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    width={900}
                                    height={675}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover transition duration-[1200ms] ease-out group-hover:scale-[1.035]"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/48 via-transparent to-transparent" />
                            </div>
                            <figcaption className="p-4 sm:p-6">
                                <p className="mb-3 inline-flex border border-[#B88A2A]/20 bg-[#B88A2A]/7 px-3 py-1.5 font-sans text-[0.56rem] font-medium tracking-[0.16em] text-[#B88A2A] uppercase">
                                    {activeProject.category}
                                </p>
                                <h3 className="text-[1.45rem] leading-[1.08] font-light text-[#F8F5EC] sm:text-[2.35rem]">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-2 font-sans text-xs font-medium tracking-[0.14em] text-[#B88A2A] uppercase">
                                    {activeProject.location}
                                </p>
                                <Link
                                    href={activeProject.href}
                                    className="mt-6 inline-flex w-full items-center justify-center border border-[#B88A2A]/55 px-5 py-3 font-sans text-[0.62rem] font-medium tracking-[0.16em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                                >
                                    Read More
                                </Link>
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>

                    <div className="mt-5 flex items-center justify-between gap-4 sm:mt-6">
                        <div className="flex items-center gap-3 font-sans text-sm font-semibold tracking-[0.18em]">
                            <span>{formatCounter(activeProjectIndex + 1)}</span>
                            <span className="h-px w-8 bg-[#B88A2A]/80" />
                            <span className="text-[#CFCFCB]">
                                {formatCounter(totalProjects)}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="grid size-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.022] text-[#F5F5F2] transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276]"
                                aria-label="Previous project"
                            >
                                <ArrowLeft
                                    className="size-5"
                                    strokeWidth={1.5}
                                />
                            </button>
                            <button
                                type="button"
                                onClick={handleNext}
                                className="grid size-12 place-items-center rounded-full border border-white/[0.09] bg-white/[0.022] text-[#F5F5F2] transition duration-500 hover:border-[#B88A2A]/60 hover:bg-[#B88A2A]/8 hover:text-[#D2B276]"
                                aria-label="Next project"
                            >
                                <ArrowRight
                                    className="size-5"
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] sm:mt-5 [&::-webkit-scrollbar]:hidden">
                        {projectsData.map((project, index) => (
                            <button
                                key={project.id}
                                type="button"
                                onClick={() => setActiveProjectIndex(index)}
                                className={cn(
                                    'shrink-0 border px-3 py-2.5 font-sans text-[0.58rem] font-semibold tracking-[0.16em] uppercase transition duration-300 sm:px-4 sm:text-[0.62rem] sm:tracking-[0.18em]',
                                    activeProjectIndex === index
                                        ? 'border-[#B88A2A]/60 bg-[#B88A2A]/12 text-[#F8F5EC]'
                                        : 'border-white/[0.09] bg-white/[0.022] text-[#CFCFCB]',
                                )}
                            >
                                {formatCounter(index + 1)} {project.title}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
