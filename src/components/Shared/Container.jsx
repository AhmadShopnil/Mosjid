import { cn } from "@/utils/cn";



export default function Container({ children, className}) {
  return <div className={cn("mx-auto max-w-[1670px] px-3 md:px-6 ", className)}>{children}</div>;
}