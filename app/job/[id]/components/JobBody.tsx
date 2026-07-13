export function JobBody({ description }: { description: string }) {
  const isHtmlDescription = /<\/?[a-z][\s\S]*>/i.test(description);

  return (
    <div className="space-y-6">
      <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-white/40">Job Overview & Requirements</h3>
      
      {isHtmlDescription ? (
        <div 
          className="text-white/80 text-base md:text-lg leading-relaxed font-normal tracking-wide space-y-4 max-w-3xl selection:bg-[#ff5a1f]/30 prose prose-invert prose-sm md:prose-base [&&_ul]:list-disc [&&_ol]:list-decimal [&&_ul]:pl-5 [&&_ol]:pl-5 [&&_li]:mb-1"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <div className="text-white/80 text-base md:text-lg leading-relaxed font-normal whitespace-pre-wrap tracking-wide space-y-4 max-w-3xl selection:bg-[#ff5a1f]/30">
          {description}
        </div>
      )}
    </div>
  );
}