type ImageIconProps = {
  src: string;
};

export function ImageIcon({ src }: ImageIconProps) {
  return <img src={src} alt="" className="h-[18px] w-[18px] object-contain" loading="lazy" />;
}
