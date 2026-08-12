import {
  FaArrowsRotate,
  FaAws,
  FaCheck,
  FaCircleDot,
  FaCloud,
  FaCode,
  FaCube,
  FaDatabase,
  FaMicrosoft,
  FaPlay,
  FaPlug,
  FaRobot,
  FaWandMagicSparkles,
} from "react-icons/fa6";

const icons = {
  "arrows-rotate": FaArrowsRotate,
  aws: FaAws,
  check: FaCheck,
  "circle-dot": FaCircleDot,
  cloud: FaCloud,
  code: FaCode,
  cube: FaCube,
  database: FaDatabase,
  microsoft: FaMicrosoft,
  play: FaPlay,
  plug: FaPlug,
  robot: FaRobot,
  sparkle: FaWandMagicSparkles,
};

type FaSkillIconProps = {
  name: string;
  color: string;
};

export function FaSkillIcon({ name, color }: FaSkillIconProps) {
  const Icon = icons[name as keyof typeof icons] ?? FaCode;

  return <Icon aria-hidden="true" className="h-[18px] w-[18px]" color={color} />;
}
