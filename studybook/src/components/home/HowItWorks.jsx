import {
  CalendarDays,
  CheckCircle2,
  Search,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Explore rooms",
    description:
      "Browse available rooms and use filters to find a space that matches your needs.",
  },
  {
    number: "02",
    icon: CalendarDays,
    title: "Choose a time",
    description:
      "Select your preferred date and available hourly time slot.",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "Confirm booking",
    description:
      "Review your booking details and confirm your study session.",
  },
];

const HowItWorks = () => {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 md:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-500">
          Simple process
        </p>

        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Book your study room in three steps
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-500">
          From finding a quiet room to confirming your reservation,
          StudyNook keeps everything simple.
        </p>
      </div>

      <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="relative rounded-2xl border border-slate-200 bg-white p-8"
            >
              <div className="flex items-center justify-between">
                <span className="text-4xl font-black text-slate-100">
                  {step.number}
                </span>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
                  <Icon size={22} />
                </div>
              </div>

              <h3 className="mt-7 text-xl font-bold">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-slate-500">
                {step.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HowItWorks;