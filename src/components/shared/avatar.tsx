import Image from "next/image";

interface AvatarProps {
  name: string;
  image?: string | null;
  size?: "sm" | "md";
}

const COLORS = ["bg-brand-500", "bg-blue-500", "bg-green-500", "bg-amber-500", "bg-rose-500", "bg-teal-500"];

export function Avatar({ name, image, size = "md" }: AvatarProps) {
  const initial = name.charAt(0) || "؟";
  const color = COLORS[name.length % COLORS.length];
  const sizeClass = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (image) {
    return (
      <Image
        src={image}
        alt={name}
        width={40}
        height={40}
        className={`${sizeClass} rounded-full object-cover shrink-0`}
      />
    );
  }

  return (
    <div className={`${sizeClass} ${color} rounded-full flex items-center justify-center text-white font-bold shrink-0`}>
      {initial}
    </div>
  );
}
