import { ButtonPrimary } from "./button.styled";

export const NewButton = ({
  children,
  onClick,
  variant,
  type,
  ariaDescribedby,
  disabled,
  size,
}) => {
  return (
    <ButtonPrimary
      type={type ? type : "button"}
      onClick={onClick}
      size={size || 'sm'}
      variant={variant || 'pulple'}
      aria-describedby={ariaDescribedby}
      disabled={disabled}
    >
      {children}
    </ButtonPrimary>
  );
};
