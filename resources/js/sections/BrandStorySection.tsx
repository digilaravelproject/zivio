import { Reveal } from '@/components/animations/Reveal';
import { heroSlides } from '@/data/heroSlides';

const brandStory = {
    label: 'Brand Philosophy',
    since: 'Since 2018',
    heading: 'Where Light Transforms Spaces Into Experiences.',
    paragraph:
        'ZIVIO LIFE creates architectural lighting that blends innovation, sustainability, and timeless design. We believe lighting is more than illumination - it is an art that shapes ambience, emotion, and human connection. Every solution is crafted to enhance residential and commercial spaces with elegance, efficiency, and lasting impact.',
};

export function BrandStorySection() {
    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 py-8 text-[#171512] sm:px-6 sm:py-14 lg:px-10 lg:py-16">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.045)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.026)_1px,transparent_1px)] bg-[size:24rem_100%,100%_9rem] opacity-[0.34]" />
            <div className="pointer-events-none absolute right-[-10rem] bottom-[-8rem] hidden h-[30rem] w-[30rem] rounded-full bg-[#BDA18A]/14 blur-3xl md:block" />
            {/* Smooth blend fades at top and bottom */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#FFFFFF] via-[#FFFFFF]/30 to-transparent z-10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#FAFAFD] via-[#FAFAFD]/30 to-transparent z-10" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-11 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24"
                threshold={0.2}
            >
                <div className="relative order-2 lg:order-1">
                    <div className="editorial-image-frame ambient-light-warm group relative aspect-[4/5] sm:aspect-[16/11] lg:aspect-[5/6]">
                        <img
                            src={heroSlides[3].image}
                            alt="Warm architectural interior lighting"
                            width={1600}
                            height={1900}
                            loading="lazy"
                            decoding="async"
                            className="h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-[1.035]"
                            sizes="(min-width: 1024px) 46vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#171512]/34 via-transparent to-white/8" />
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                    </div>
                </div>

                <div className="order-1 max-w-[580px] lg:order-2">
                    <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5">
                        <span className="h-[1px] w-10 bg-[#BDA18A] sm:w-12" />
                        <p className="text-luxury-label">
                            {brandStory.label}
                        </p>
                    </div>

                    <h2 className="text-editorial-heading-dark max-w-lg">
                        {brandStory.heading}
                    </h2>

                    <div className="mt-8 grid max-w-sm grid-cols-[auto_1fr] items-center gap-3 text-[#BDA18A] sm:mt-10 sm:gap-4">
                        <span className="grid size-11 place-items-center border border-[#BDA18A]/18 font-sans text-[0.58rem] font-medium tracking-[0.15em] uppercase sm:size-13">
                            01
                        </span>
                        <p className="font-sans text-xs font-medium tracking-[0.15em] uppercase sm:text-[0.82rem]">
                            {brandStory.since}
                        </p>
                    </div>

                    <p className="mt-8 max-w-lg border-l border-[#BDA18A]/16 pl-5 text-editorial-paragraph sm:mt-10 sm:pl-7">
                        {brandStory.paragraph}
                    </p>
                </div>
            </Reveal>
        </section>
    );
}
