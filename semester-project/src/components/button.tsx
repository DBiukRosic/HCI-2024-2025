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
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsLink = BaseProps & {
  href: string;           // only the link variant has href
};

type ButtonProps = ButtonAsButton | ButtonAsLink;


function Button(props: ButtonAsLink): JSX.Element;
function Button(props: ButtonAsButton): JSX.Element;
function Button(props: ButtonProps): JSX.Element {
  const {
    children,
    className,
    iconClassName,
    orange,
    blue,
    showIcon = false,
  } = props;

  const buttonClasses = cn(
    "transition duration-300 ease-in-out",
    "group inline-flex items-center gap-2 text-lg whitespace-nowrap",
    "px-6 py-3 rounded font-urbanist",
    {
      "border-2 border-brand-blue-100 bg-brand-orange-200 text-brand-blue-500 hover:bg-brand-orange-500": orange,
      "text-brand-blue-400 hover:text-brand-blue-50": !orange,
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

  // Link variant (props is ButtonAsLink here)
  if ("href" in props) {
    return (
      <Link href={props.href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  // Button variant (props is ButtonAsButton here)
  const { onClick, type = "button", disabled } = props;
  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

export default Button;



