import { twMerge } from "tailwind-merge";
import classNames from "classnames";

const Button = ({
  onClick,
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  ...rest
}) => {
  const buttonStyles = twMerge(
    classNames(
      rest.className,
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

export default Button;
