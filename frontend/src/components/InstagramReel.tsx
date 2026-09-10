"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface InstagramReelProps {
  url: string;
}

export default function InstagramReel({ url }: InstagramReelProps) {
  const [loading, setLoading] = useState(true);

  // Convert /reel/ to /p/ for embed if necessary, and append /embed
  const getEmbedUrl = (url: string) => {
    let cleanUrl = url.split("?")[0];
    if (cleanUrl.endsWith("/")) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
    // Replace /reel/ with /p/ for better embed compatibility
    cleanUrl = cleanUrl.replace("/reel/", "/p/");
    return `${cleanUrl}/embed`;
  };

  return (
    <div className="relative w-full aspect-[9/16] bg-[#141210] rounded-xl overflow-hidden border border-[#39362f] shadow-xl group">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center text-[#c0272d]">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      )}
      <iframe
        src={getEmbedUrl(url)}
        className="w-full h-full border-none opacity-0 transition-opacity duration-500"
        style={{ opacity: loading ? 0 : 1 }}
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
        onLoad={() => setLoading(false)}
      ></iframe>
      
      {/* Overlay to prevent accidental clicks stopping the scroll on mobile, optional */}
      <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-xl transition-all duration-300 group-hover:border-[#c0272d]/50" />
    </div>
  );
}
