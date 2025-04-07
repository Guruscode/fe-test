// src/components/UI/Button.d.ts
import { ButtonProps } from './Button';

declare const Button: React.ForwardRefExoticComponent<
  ButtonProps & React.RefAttributes<HTMLButtonElement>
>;

export default Button;