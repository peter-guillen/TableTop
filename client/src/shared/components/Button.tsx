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
      "items-center px-3 p-2 border rounded-md text-center",
      {
        "bg-blue-600": primary,
        "bg-purple-600": secondary,
        "bg-green-500": success,
        "bg-yellow-400": warning,
        "bg-red-600": danger,
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
