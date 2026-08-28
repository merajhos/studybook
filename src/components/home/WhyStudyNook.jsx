import {
  CalendarCheck,
  LockKeyhole,
  Search,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Find the right space",
    description:
      "Search rooms by name and filter them by amenities, floor and price.",
  },
  {
    icon: CalendarCheck,
    title: "Book with confidence",
    description:
      "Choose your date and time slot and get instant booking confirmation.",
  },
  {
    icon: LockKeyhole,
    title: "Avoid double booking",
    description:
      "Our booking system checks time conflicts before confirming a reservation.",
  },
  {
    icon: Sparkles,
    title: "Built for focused study",
    description:
      "Discover spaces designed for reading, group work and productive sessions.",
  },
];

const WhyStudyNook = () => {
  return (
    <section className="bg-slate-950 px-5 py-20 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Why StudyNook
          </p>

          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Everything you need for a better study session
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            StudyNook makes it simple to discover, reserve and manage
            study spaces without unnecessary steps.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                  <Icon size={23} />
                </div>

                <h3 className="text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyStudyNook;