// ============ BorderBeam — شعاع ضوئي بيلف حوالين الكارت ============
// بيتحط جوه عنصر عليه position:relative و border-radius —
// CSS خالص (conic-gradient + mask)، بيوقف تلقائياً مع reduced-motion.

export function BorderBeam({ className = "" }: { className?: string }) {
  return <div aria-hidden className={`border-beam ${className}`} />;
}
