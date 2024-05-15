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
      "items-center px-3 m-2 p-2 border rounded-md text-center",
      {
        "bg-blue-400": primary,
        "bg-purple-400": secondary,
        "bg-green-400": success,
        "bg-yellow-400": warning,
        "bg-red-400": danger,
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
