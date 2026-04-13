interface TagProps {
  children: React.ReactNode;
  size?: "sm" | "md";
}

export function Tag({ children, size = "md" }: TagProps) {
  return (
    <span
      className={`inline-block bg-lavender text-[#5558a0] font-bold tracking-[0.8px] uppercase rounded-[2px] ${
        size === "sm" ? "text-[9px] px-1.5 py-0.5" : "text-[9px] px-2 py-1"
      }`}
    >
      {children}
    </span>
  );
}
