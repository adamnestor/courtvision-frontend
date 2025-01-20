import { Info } from "lucide-react";

export const InfoCircle = Info; // Re-export with our preferred name

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip = ({ content, children }: TooltipProps) => (
  <div className="relative group">
    {children}
    <div className="absolute hidden group-hover:block bg-black text-white p-2 rounded text-xs -top-8 left-1/2 transform -translate-x-1/2">
      {content}
    </div>
  </div>
);
