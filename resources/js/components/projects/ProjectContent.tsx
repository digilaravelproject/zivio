import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

import type { Project } from '@/data/projectsData';

type ProjectContentProps = {
    project: Project;
    activeIndex: number;
    totalProjects: number;
};

const formatCounter = (number: number) => number.toString().padStart(2, '0');

export function ProjectContent({
    project,
    activeIndex,
    totalProjects,
}: ProjectContentProps) {
    return (
        <div className="relative z-10">
            <div className="mb-5 flex items-center gap-4">
                <span className="h-px w-9 bg-[#B88A2A]/80" />
                <p className="font-sans text-[0.64rem] font-semibold tracking-[0.34em] text-[#B88A2A] uppercase">
                    Our Projects
                </p>
            </div>

            <h2 className="max-w-xl text-3xl leading-[1.08] font-semibold text-balance text-[#F8F5EC] sm:text-4xl lg:text-[3.2rem]">
                Illuminating spaces with architectural precision.
            </h2>

            <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 border-l border-[#B88A2A]/28 pl-5"
            >
                <p className="mb-3 inline-flex border border-[#B88A2A]/22 bg-[#B88A2A]/7 px-3 py-1.5 font-sans text-[0.62rem] font-semibold tracking-[0.22em] text-[#B88A2A] uppercase">
                    {project.category}
                </p>

                <h3 className="max-w-md text-2xl leading-8 font-semibold text-[#F8F5EC] sm:text-3xl">
                    {project.title}
                </h3>

                <p className="mt-2 font-sans text-sm tracking-[0.16em] text-[#B88A2A] uppercase">
                    {project.location}
                </p>

                <p className="mt-5 max-w-md font-sans text-sm leading-7 text-[#CFCFCB] sm:text-base sm:leading-8">
                    {project.description}
                </p>

                <Link
                    href={project.href}
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 border border-[#B88A2A]/55 px-5 py-3 font-sans text-[0.66rem] font-semibold tracking-[0.2em] text-[#F5F5F2] uppercase transition duration-500 hover:border-[#F5F5F2] hover:bg-[#F5F5F2] hover:text-[#0A0A0A] sm:w-auto"
                >
                    Read More
                    <ArrowUpRight className="size-4" strokeWidth={1.5} />
                </Link>
            </motion.div>

            <div className="mt-8 flex items-center gap-3 font-sans text-sm font-semibold tracking-[0.18em]">
                <span>{formatCounter(activeIndex + 1)}</span>
                <span className="h-px w-8 bg-[#B88A2A]/80" />
                <span className="text-[#CFCFCB]">
                    {formatCounter(totalProjects)}
                </span>
            </div>
        </div>
    );
}
