/**
 * Reserved Ad Container for Google AdSense monetization
 * Matches financial aesthetic and prevents layout shift (CLS)
 */
export default function AdPlaceholder({
  slot = 'horizontal', // 'horizontal' | 'rectangle' | 'sidebar'
  className = '',
}) {
  const getDimensions = () => {
    switch (slot) {
      case 'rectangle':
        return 'min-h-[250px] w-full max-w-[300px] sm:max-w-[336px]';
      case 'sidebar':
        return 'min-h-[600px] w-full max-w-[300px]';
      case 'horizontal':
      default:
        return 'min-h-[100px] sm:min-h-[120px] w-full';
    }
  };

  return (
    <div
      className={`my-8 mx-auto flex flex-col items-center justify-center p-3 rounded-xl border border-dashed border-slate-300/80 bg-slate-100/60 text-slate-400 select-none ${getDimensions()} ${className}`}
      aria-label="Advertisement container"
    >
      <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider uppercase text-slate-400">
        <span>Advertisement</span>
      </div>
      <div className="text-[11px] text-slate-400/80 mt-1 text-center font-mono">
        Reserved Ad Placement Area
      </div>
    </div>
  );
}
