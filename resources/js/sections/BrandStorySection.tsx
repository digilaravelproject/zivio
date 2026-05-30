import { Reveal } from '@/components/animations/Reveal';
import { heroSlides } from '@/data/heroSlides';

const brandStory = {
    label: 'Brand Philosophy',
    since: 'Since 2018',
    heading: 'Where light transforms spaces into experiences.',
    paragraph:
        'ZIVIO LIFE creates architectural lighting that blends innovation, sustainability, and timeless design. We believe lighting is more than illumination - it is an art that shapes ambience, emotion, and human connection. Every solution is crafted to enhance residential and commercial spaces with elegance, efficiency, and lasting impact.',
};

export function BrandStorySection() {
    return (
        <section className="relative overflow-hidden bg-editorial-light px-4 py-16 text-[#171512] sm:px-6 sm:py-24 lg:px-10 lg:py-[8rem]">
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(123,96,58,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(123,96,58,0.035)_1px,transparent_1px)] bg-[size:24rem_100%,100%_9rem] opacity-[0.42]" />
            <div className="pointer-events-none absolute right-[-10rem] bottom-[-8rem] hidden h-[30rem] w-[30rem] rounded-full bg-[#B8945F]/14 blur-3xl md:block" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-px w-full bg-warm-divider" />

            <Reveal
                className="relative mx-auto grid max-w-7xl gap-9 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20"
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

                <div className="order-1 max-w-[620px] lg:order-2">
                    <div className="mb-5 flex items-center gap-4 sm:mb-6 sm:gap-5">
                        <span className="h-[1px] w-10 bg-[#B8945F] sm:w-12" />
                        <p className="text-luxury-label">
                            {brandStory.label}
                        </p>
                    </div>

                    <h2 className="text-editorial-heading-dark max-w-xl">
                        {brandStory.heading}
                    </h2>

                    <div className="mt-7 grid max-w-sm grid-cols-[auto_1fr] items-center gap-3 text-[#8D6B38] sm:mt-9 sm:gap-4">
                        <span className="grid size-12 place-items-center border border-[#8D6B38]/24 font-sans text-[0.62rem] font-semibold tracking-[0.18em] uppercase sm:size-14">
                            01
                        </span>
                        <p className="font-sans text-xs font-semibold tracking-[0.18em] uppercase sm:text-sm">
                            {brandStory.since}
                        </p>
                    </div>

                    <p className="mt-7 max-w-xl border-l border-[#8D6B38]/24 pl-5 text-editorial-paragraph sm:mt-9 sm:pl-7">
                        {brandStory.paragraph}
                    </p>
                </div>
            </Reveal>
        </section>
    );
}
