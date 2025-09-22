import { cn } from "@/utils/cn";



export default function Container({ children, className}) {
  return <div className={cn("mx-auto max-w-[1650px] px-3 md:px-10 ", className)}>{children}</div>;
}