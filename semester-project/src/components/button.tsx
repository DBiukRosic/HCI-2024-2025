import { ReactNode, MouseEvent } from "react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/utils";
import Link from "next/link";

type BaseProps = {
  children: ReactNode;
  orange?: boolean;
  blue?: boolean;
  className?: string;
  iconClassName?: string;
  showIcon?: boolean;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

type ButtonAsLink = BaseProps & {
  href: string;
  onClick?: never;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button({
  children,
  className,
  iconClassName,
  orange,
  blue,
  showIcon = false,
  ...rest
}: ButtonProps) {
  const buttonClasses = cn(
    "transition duration-300 ease-in-out",
    "group flex items-center gap-2 text-lg max-w-min whitespace-nowrap",
    "px-6 py-3 rounded font-urbanist",
    {
      "border-2 border-brand-blue-100 bg-brand-orange-200 text-brand-blue-500 hover:bg-brand-orange-500":
        orange,
      "bg-brand-200 text-brand-blue-400 hover:text-brand-blue-50": !orange,
      "bg-brand-blue-200 text-brand-orange-200 border-2 border-brand-orange-200 hover:bg-brand-blue-100": blue,
    },
    className
  );

  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
      <ChevronRightIcon
        className={cn(
          "w-3 h-3 stroke-[3] transition-transform duration-300 ease-in-out transform group-hover:translate-x-1",
          iconClassName
        )}
      />
      )}
    </>
  );

  if ("href" in rest && rest.href) {
    return (
      <Link href={rest.href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={buttonClasses} onClick={rest.onClick}>
      {content}
    </button>
  );
}

export default Button;
