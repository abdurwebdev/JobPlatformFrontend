"use client";

import { useState, useEffect } from "react";

interface JobBodyProps {
  description: string;
}

export function JobBody({ description }: JobBodyProps) {
  const [mounted, setMounted] = useState(false);

  // Force component to wait until client-side hydration completes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if the description text contains any structural HTML tags
  const isHtmlDescription = /<\/?[a-z][\s\S]*>/i.test(description || "");

  // Render a consistent skeleton fallback on the server to prevent mismatches
  if (!mounted) {
    return (
      <div className="space-y-6 animate-pulse">
        <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#ff5a1f]">
          Job Overview & Requirements
        </h3>
        <div className="space-y-3">
          <div className="h-4 bg-white/5 rounded w-3/4"></div>
          <div className="h-4 bg-white/5 rounded w-5/6"></div>
          <div className="h-4 bg-white/5 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-[11px] uppercase tracking-[0.3em] font-bold text-[#ff5a1f]">
        Job Overview & Requirements
      </h3>
      
      {isHtmlDescription ? (
        <div 
          className="text-white/80 text-base md:text-lg leading-relaxed font-normal tracking-wide space-y-4 max-w-4xl selection:bg-[#ff5a1f]/30
            /* Styles for hyperlinks */
            [&_a]:text-[#ff5a1f] [&_a]:underline [&_a]:font-medium [&_a:hover]:text-[#ff7c4d] [&_a]:transition-colors [&_a]:duration-200
            /* Styles for lists */
            [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_ol]:space-y-2 [&_li]:mb-1
            /* Styles for headers */
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-6 [&_h1]:mb-2
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-5 [&_h2]:mb-2
            [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-4 [&_h3]:mb-1
            /* Styles for tables */
            [&_table]:w-full [&_table]:my-6 [&_table]:border-collapse [&_table]:border [&_table]:border-white/10
            [&_th]:bg-white/[0.05] [&_th]:p-3 [&_th]:text-left [&_th]:text-xs [&_th]:font-mono [&_th]:border [&_th]:border-white/10
            [&_td]:p-3 [&_td]:text-sm [&_td]:border [&_td]:border-white/10 [&_tr:nth-child(even)]:bg-white/[0.02]
            /* Styles for code blocks */
            [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:font-mono [&_code]:text-sm [&_code]:text-[#ff5a1f]/90"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <div className="text-white/80 text-base md:text-lg leading-relaxed font-normal whitespace-pre-wrap tracking-wide max-w-4xl selection:bg-[#ff5a1f]/30">
          {description}
        </div>
      )}
    </div>
  );
}