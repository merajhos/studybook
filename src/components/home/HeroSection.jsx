import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950 text-white">
      {/* Background decoration */}
      <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-20 md:px-8 lg:grid-cols-2 lg:py-28">
        {/* Left */}
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
            <BookOpen size={16} />
            Smart study spaces for everyone
          </div>

          <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            Find Your
            <span className="block text-cyan-400">
              Perfect Study Room
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
            Browse and book quiet, private study rooms in your library.
            Need a space of your own? List your room and earn while helping
            other learners find the perfect place to focus.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-7 py-3.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Explore Rooms
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/add-room"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-7 py-3.5 font-semibold text-white transition hover:bg-white/10"
            >
              List Your Room
            </Link>
          </div>

          {/* Small stats */}
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/10 pt-8">
            <div>
              <p className="text-2xl font-bold text-white">24/7</p>
              <p className="mt-1 text-sm text-slate-400">
                Flexible booking
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">100%</p>
              <p className="mt-1 text-sm text-slate-400">
                Secure booking
              </p>
            </div>

            <div>
              <p className="text-2xl font-bold text-white">Easy</p>
              <p className="mt-1 text-sm text-slate-400">
                Room discovery
              </p>
            </div>
          </div>
        </div>

        {/* Right visual */}
        <div className="relative">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80"
                alt="Study room"
                className="h-[420px] w-full object-cover"
              />
            </div>

            <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-slate-950/90 p-5 backdrop-blur">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">
                    Featured space
                  </p>
                  <h3 className="mt-1 text-xl font-bold">
                    Quiet Reading Room
                  </h3>
                </div>

                <div className="rounded-xl bg-cyan-400/10 p-3 text-cyan-400">
                  <Clock3 size={24} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-slate-300">
                <ShieldCheck size={17} className="text-cyan-400" />
                Available for focused study
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;