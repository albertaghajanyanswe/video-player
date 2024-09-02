import { ChevronDown, ChevronUp } from "lucide-react";
import { useOutside } from "../../../hooks/useOutSide";
import { EnumPlayerQuality } from "../player.types";
import cn from "clsx";

const QUALITIES: EnumPlayerQuality[] = [
  EnumPlayerQuality.original,
  EnumPlayerQuality["1080p"],
  EnumPlayerQuality["728p"],
  EnumPlayerQuality["480p"],
  EnumPlayerQuality["360p"],
];

interface Props {
  currentValue: EnumPlayerQuality;
  onChange: (quality: EnumPlayerQuality) => void;
}

export default function SelectQuality({ currentValue, onChange }: Props) {
  const { ref, isShow, setIsShow } = useOutside(false);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setIsShow(!isShow)}
        className="flex item-center gap-1 text-white hover:text-primary"
      >
        {currentValue}
        <ChevronUp />
      </button>
      {isShow && (
        <ul className="bg-dark-600 py-2 px-4 rounded absolute bottom-full right-0 z-10 shadow">
          {QUALITIES.map((quality) => {
            return (
              <li key={quality} className="mb-1 hover:text-primary">
                <button
                  onClick={() => {
                    onChange(quality);
                    setIsShow(false);
                  }}
                  className={cn("flex item-center gap-1.5", {
                    "font-bold text-primary": currentValue === quality,
                  })}
                >
                  {currentValue === quality && <span>•</span>} {quality}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
