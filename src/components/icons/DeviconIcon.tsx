import amazonWebServicesIcon from "devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg?url";
import azureIcon from "devicon/icons/azure/azure-original.svg?url";
import azureDevopsIcon from "devicon/icons/azuredevops/azuredevops-original.svg?url";
import csharpIcon from "devicon/icons/csharp/csharp-original.svg?url";
import playwrightIcon from "devicon/icons/playwright/playwright-original.svg?url";

const icons: Record<string, string> = {
  amazonwebservices: amazonWebServicesIcon,
  azure: azureIcon,
  azuredevops: azureDevopsIcon,
  csharp: csharpIcon,
  playwright: playwrightIcon,
};

type DeviconIconProps = {
  name: string;
};

export function DeviconIcon({ name }: DeviconIconProps) {
  const icon = icons[name];

  if (!icon) {
    return null;
  }

  return <img src={icon} alt="" className="h-[18px] w-[18px] object-contain" />;
}
