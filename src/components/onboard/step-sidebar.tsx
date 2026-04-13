interface Step {
  num: number;
  label: string;
  desc: string;
}

const STEPS: Step[] = [
  { num: 1, label: "Your role",    desc: "Member or Creator?" },
  { num: 2, label: "Sign in",      desc: "Google or Facebook" },
  { num: 3, label: "Your profile", desc: "Bio, handles, topics" },
  { num: 4, label: "You're in",    desc: "" },
];

interface Props {
  current: number;
  roleLabel?: string;
  authLabel?: string;
}

export function StepSidebar({ current, roleLabel, authLabel }: Props) {
  return (
    <div className="pt-1">
      {STEPS.map((step, i) => {
        const done = step.num < current;
        const active = step.num === current;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.num} className="flex items-start gap-3.5">
            {/* Dot + connector */}
            <div className="flex flex-col items-center">
              <div
                className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-[11px] font-bold flex-shrink-0 transition-all ${
                  done   ? "bg-salmon border-salmon text-white" :
                  active ? "bg-nearblack border-nearblack text-white" :
                           "bg-white border-lightgray text-gray"
                }`}
              >
                {done ? "✓" : step.num}
              </div>
              {!isLast && (
                <div className={`w-0.5 h-8 mt-1 mb-0 transition-colors ${done ? "bg-salmon" : "bg-lightgray"}`} />
              )}
            </div>

            {/* Label */}
            <div className={`pt-1 ${isLast ? "" : "pb-9"}`}>
              <p className={`text-[13px] font-bold mb-0.5 ${active || done ? "text-nearblack" : "text-gray font-medium"}`}>
                {step.num === 1 && done && roleLabel ? roleLabel :
                 step.num === 2 && done && authLabel ? authLabel :
                 step.label}
              </p>
              {step.desc && !done && (
                <p className="text-[12px] text-gray">{step.desc}</p>
              )}
              {step.num === 2 && done && authLabel && (
                <p className="text-[12px] text-gray">via Google</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
