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
        <section className="relative overflow-hidden bg-[#080808] text-[#F5F5F2]">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-[#B88A2A]/24 to-transparent" />

            <div className="relative hidden min-h-[680px] overflow-hidden lg:block xl:min-h-[740px]">
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
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{
                            duration: 1.05,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="absolute inset-0 h-full w-full object-cover"
                        sizes="100vw"
                    />
                </AnimatePresence>

                <div className="absolute inset-0 bg-[#050505]/24" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/96 via-[#050505]/62 to-[#050505]/18" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/92 via-transparent to-[#050505]/48" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:24vw_100%] opacity-[0.18]" />

                <div className="relative z-10 mx-auto flex min-h-[680px] max-w-7xl flex-col justify-between px-10 py-24 xl:min-h-[740px]">
                    <div className="max-w-3xl pt-10">
                        <div className="mb-6 flex items-center gap-4">
                            <span className="h-px w-12 bg-[#B88A2A]/85" />
                            <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#D2B276] uppercase">
                                Project Showcase
                            </p>
                        </div>

                        <h2 className="max-w-4xl text-[clamp(4.2rem,6.5vw,7.2rem)] leading-[0.9] font-semibold text-balance text-[#F8F5EC]">
                            Built light, at architectural scale.
                        </h2>
                    </div>

                    <div className="grid items-end gap-10 xl:grid-cols-[0.92fr_0.78fr]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeProject.id}
                                initial={{ opacity: 0, y: 24 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -16 }}
                                transition={{
                                    duration: 0.62,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="max-w-xl"
                            >
                                <p className="mb-4 inline-flex border border-[#B88A2A]/24 bg-[#050505]/36 px-3 py-1.5 font-sans text-[0.62rem] font-semibold tracking-[0.22em] text-[#D2B276] uppercase backdrop-blur-sm">
                                    {activeProject.category}
                                </p>
                                <h3 className="text-4xl leading-[0.96] font-semibold text-[#F8F5EC] xl:text-5xl">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-3 font-sans text-sm font-semibold tracking-[0.18em] text-[#D2B276] uppercase">
                                    {activeProject.location}
                                </p>
                                <p className="mt-5 max-w-lg font-sans text-base leading-8 text-[#D8D3C8]">
                                    {activeProject.description}
                                </p>
                                <Link
                                    href={activeProject.href}
                                    className="mt-7 inline-flex items-center justify-center gap-2 border border-[#B88A2A]/58 px-5 py-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase backdrop-blur-sm transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A]"
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
                                                'group grid grid-cols-[5.5rem_1fr] items-center gap-4 border p-2 text-left backdrop-blur-md transition duration-500',
                                                isActive
                                                    ? 'border-[#B88A2A]/44 bg-[#050505]/54'
                                                    : 'border-white/[0.09] bg-[#050505]/28 hover:border-[#B88A2A]/30 hover:bg-[#050505]/44',
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
                                                <span className="mb-1 block font-sans text-[0.6rem] font-semibold tracking-[0.22em] text-[#B88A2A] uppercase">
                                                    {formatCounter(index + 1)} /{' '}
                                                    {project.category}
                                                </span>
                                                <span className="block text-xl leading-6 font-semibold text-[#F8F5EC]">
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
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(184,138,42,0.07),transparent_30%),linear-gradient(145deg,#080808,#101010_52%,#080808)]" />
                <div className="relative mx-auto max-w-2xl">
                    <div className="mb-5 flex items-center gap-4 sm:mb-7">
                        <span className="h-px w-10 bg-[#B88A2A]/80" />
                        <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#D2B276] uppercase">
                            Project Showcase
                        </p>
                    </div>

                    <h2 className="mb-6 text-[2.15rem] leading-[1] font-semibold text-balance text-[#F8F5EC] sm:mb-8 sm:text-5xl">
                        Built light, at architectural scale.
                    </h2>

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
                            className="overflow-hidden border border-white/[0.08] bg-[#101010] shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    width={900}
                                    height={675}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/66 via-transparent to-transparent" />
                            </div>
                            <figcaption className="p-4 sm:p-6">
                                <p className="mb-3 inline-flex border border-[#B88A2A]/22 bg-[#B88A2A]/7 px-3 py-1.5 font-sans text-[0.6rem] font-semibold tracking-[0.2em] text-[#B88A2A] uppercase">
                                    {activeProject.category}
                                </p>
                                <h3 className="text-[1.65rem] leading-[1] font-semibold text-[#F8F5EC] sm:text-3xl">
                                    {activeProject.title}
                                </h3>
                                <p className="mt-2 font-sans text-xs font-semibold tracking-[0.16em] text-[#B88A2A] uppercase">
                                    {activeProject.location}
                                </p>
                                <p className="mt-4 font-sans text-sm leading-6 text-[#CFCFCB] sm:leading-7">
                                    {activeProject.description}
                                </p>
                                <Link
                                    href={activeProject.href}
                                    className="mt-6 inline-flex w-full items-center justify-center border border-[#B88A2A]/55 px-5 py-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
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
