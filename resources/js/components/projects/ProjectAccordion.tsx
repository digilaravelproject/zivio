import { motion } from 'framer-motion';

import type { Project } from '@/data/projectsData';

type ProjectAccordionProps = {
    projects: Project[];
    activeIndex: number;
    onActivate: (index: number) => void;
};

const formatCounter = (number: number) => number.toString().padStart(2, '0');

export function ProjectAccordion({
    projects,
    activeIndex,
    onActivate,
}: ProjectAccordionProps) {
    return (
        <div className="relative hidden h-[460px] gap-4 [perspective:1400px] md:flex xl:h-[520px]">
            {projects.map((project, index) => {
                const isActive = activeIndex === index;

                return (
                    <motion.button
                        type="button"
                        key={project.id}
                        onMouseEnter={() => onActivate(index)}
                        onFocus={() => onActivate(index)}
                        onClick={() => onActivate(index)}
                        initial={false}
                        animate={{ flex: isActive ? 1.7 : 0.62 }}
                        transition={{
                            duration: 0.55,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        className="group relative min-w-0 overflow-hidden border border-white/[0.08] bg-[#111111] text-left shadow-[0_28px_80px_rgba(0,0,0,0.34)] outline-none transition duration-300 focus-visible:border-[#DA9807]/80"
                        aria-label={`View ${project.title}`}
                    >
                        <img
                            src={project.image}
                            alt={project.title}
                            width={1400}
                            height={1600}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-[1600ms] ease-out group-hover:scale-105"
                            sizes={
                                isActive
                                    ? '(min-width: 1024px) 42vw, 100vw'
                                    : '(min-width: 1024px) 18vw, 100vw'
                            }
                        />

                        <div className="absolute inset-0 bg-[#0A0A0A]/20 transition duration-500 group-hover:bg-[#0A0A0A]/12" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/92 via-[#0A0A0A]/26 to-transparent" />
                        <div
                            className={`absolute inset-0 transition duration-500 ${isActive
                                    ? 'shadow-[inset_0_0_100px_rgba(184,155,114,0.16)]'
                                    : 'shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]'
                                }`}
                        />

                        <div
                            className={`absolute inset-x-5 bottom-5 transition duration-500 lg:inset-x-7 lg:bottom-7 ${isActive
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-3 opacity-0'
                                }`}
                        >
                            <span className="mb-4 block h-px w-12 bg-[#DA9807]/85" />
                            <p className="mb-3 font-sans text-xs font-semibold tracking-[0.24em] text-[#DA9807] uppercase">
                                {formatCounter(index + 1)} /{' '}
                                {project.category}
                            </p>
                            <h3 className="max-w-md text-3xl leading-none font-semibold text-[#F8F5EC] lg:text-4xl">
                                {project.title}
                            </h3>
                            <p className="mt-3 font-sans text-sm tracking-[0.14em] text-[#D8D3C8] uppercase">
                                {project.location}
                            </p>
                        </div>

                        <div
                            className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-4 transition duration-500 lg:flex ${isActive
                                    ? 'opacity-0'
                                    : 'opacity-100 group-hover:opacity-70'
                                }`}
                        >
                            <span className="h-10 w-px bg-[#DA9807]/60" />
                            <span className="[writing-mode:vertical-rl] font-sans text-[0.68rem] font-semibold tracking-[0.24em] text-[#F5F5F2] uppercase">
                                {project.title}
                            </span>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
}
