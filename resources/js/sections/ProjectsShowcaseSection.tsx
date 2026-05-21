import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { ScrollDepthWrapper } from '@/components/animations/ScrollDepthWrapper';
import { ProjectAccordion } from '@/components/projects/ProjectAccordion';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { projectsData } from '@/data/projectsData';

const formatCounter = (number: number) => number.toString().padStart(2, '0');

export function ProjectsShowcaseSection() {
    const [activeProjectIndex, setActiveProjectIndex] = useState(0);
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
        <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-16 text-[#F5F5F2] sm:px-6 sm:py-20 lg:px-10 lg:py-28">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_25%,rgba(184,155,114,0.1),transparent_30%),linear-gradient(135deg,#080808_0%,#111111_50%,#0A0A0A_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#DA9807]/35 to-transparent" />

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.35fr_0.65fr] lg:items-center lg:gap-14"
            >
                <ProjectContent
                    project={activeProject}
                    activeIndex={activeProjectIndex}
                    totalProjects={totalProjects}
                />

                <ScrollDepthWrapper className="relative" intensity="medium">
                    <ProjectAccordion
                        projects={projectsData}
                        activeIndex={activeProjectIndex}
                        onActivate={setActiveProjectIndex}
                    />

                    <div className="md:hidden">
                        <AnimatePresence mode="wait">
                            <motion.figure
                                key={activeProject.id}
                                initial={{ opacity: 0, x: 18, scale: 0.985 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: -14, scale: 0.985 }}
                                transition={{
                                    duration: 0.48,
                                    ease: [0.22, 1, 0.36, 1],
                                }}
                                className="relative h-[320px] overflow-hidden border border-white/[0.08] bg-[#111111] shadow-[0_24px_70px_rgba(0,0,0,0.34)]"
                            >
                                <img
                                    src={activeProject.image}
                                    alt={activeProject.title}
                                    width={1200}
                                    height={1400}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-[#0A0A0A]/18" />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/24 to-transparent" />
                                <figcaption className="absolute inset-x-5 bottom-5">
                                    <span className="mb-4 block h-px w-12 bg-[#DA9807]/85" />
                                    <p className="mb-2 font-sans text-[0.66rem] font-semibold tracking-[0.22em] text-[#DA9807] uppercase">
                                        {activeProject.category}
                                    </p>
                                    <h3 className="text-3xl leading-none font-semibold text-[#F8F5EC]">
                                        {activeProject.title}
                                    </h3>
                                </figcaption>
                            </motion.figure>
                        </AnimatePresence>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-4 md:mt-7">
                        <div className="flex items-center gap-3 font-sans text-sm font-semibold tracking-[0.18em] md:hidden">
                            <span>
                                {formatCounter(activeProjectIndex + 1)}
                            </span>
                            <span className="h-px w-8 bg-[#DA9807]/80" />
                            <span className="text-[#CFCFCB]">
                                {formatCounter(totalProjects)}
                            </span>
                        </div>

                        <div className="ml-auto flex items-center gap-3">
                            <button
                                type="button"
                                onClick={handlePrevious}
                                className="grid size-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-[#F5F5F2] transition duration-300 hover:border-[#DA9807]/70 hover:bg-[#DA9807]/10 hover:text-[#DA9807] md:size-11"
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
                                className="grid size-12 place-items-center rounded-full border border-white/[0.1] bg-white/[0.025] text-[#F5F5F2] transition duration-300 hover:border-[#DA9807]/70 hover:bg-[#DA9807]/10 hover:text-[#DA9807] md:size-11"
                                aria-label="Next project"
                            >
                                <ArrowRight
                                    className="size-5"
                                    strokeWidth={1.5}
                                />
                            </button>
                        </div>
                    </div>
                </ScrollDepthWrapper>
            </motion.div>
        </section>
    );
}
