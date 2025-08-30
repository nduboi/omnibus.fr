// src/components/Watermark.tsx
export default function Watermark() {
  if (process.env.NEXT_PUBLIC_SHOW_WATERMARK !== "true") {
    return null;
  }

  return (
    <div
      className="
        fixed bottom-4 right-4
        bg-gray-600/60 text-white/80
        px-4 py-2
        rounded-xl text-base font-semibold
        md:bottom-6 md:right-6
        md:px-6 md:py-3
        md:text-lg
        z-[9999]
        pointer-events-none
      "
    >
      Version d&apos;évaluation – Ne pas publier
    </div>
  );
}
