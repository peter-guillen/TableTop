import { twMerge } from "tailwind-merge";
import classNames from "classnames";

type ButtonProps = {
  onClick?: () => void;
  children?: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  className,
  ...rest
}) => {
  const buttonStyles = twMerge(
    classNames(
      className,
      "inline-flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-center font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 dark:focus-visible:ring-emerald-400",
      {
        "bg-amber-500 border-amber-500 text-stone-950 hover:bg-amber-400": primary,
        "bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-600": secondary,
        "bg-green-600 border-green-600 text-white hover:bg-green-500": success,
        "bg-yellow-400 border-yellow-400 text-stone-950 hover:bg-yellow-300": warning,
        "bg-red-600 border-red-600 text-white hover:bg-red-500": danger,
      }
    )
  );

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button className={buttonStyles} onClick={handleClick}>
      {children}
    </button>
  );
};
