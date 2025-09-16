import { cn } from "@/utils/cn";



export default function Container({ children, className}) {
  return <div className={cn("mx-auto max-w-[1600px] px-3 md:px-4 ", className)}>{children}</div>;
}