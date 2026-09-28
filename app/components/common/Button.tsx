import * as React from 'react';
import { Link, type LinkProps } from 'react-router';

export type ButtonVariant = 'glass-primary' | 'glass-secondary' | 'glass-outline' | 'glass-cyan';
export type ButtonSize = 'sm' | 'md' | 'lg';

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  'glass-primary': 'btn-glass-primary',
  'glass-secondary': 'btn-glass-secondary',
  'glass-outline': 'btn-glass-outline',
  'glass-cyan': 'btn-glass-cyan',
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'px-3.5 py-1.5 text-[10.5px] sm:text-[11px]',
  md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-xs',
  lg: 'px-6 py-3 sm:px-7 sm:py-3.5 text-xs sm:text-[13px]',
};

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    to?: undefined;
    href?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<LinkProps, keyof BaseProps> & {
    to: LinkProps['to'];
    href?: undefined;
  };

type ButtonAsAnchor = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
    to?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsAnchor;

export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = 'glass-primary', size = 'md', className = '', children, ...props },
  ref
) {
  const combinedClasses = `${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`.trim();

  // 1. React Router Link
  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props as ButtonAsLink;
    return (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        to={to}
        className={combinedClasses}
        {...rest}
      >
        {children}
      </Link>
    );
  }

  // 2. External / Native Anchor
  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props as ButtonAsAnchor;
    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        className={combinedClasses}
        {...rest}
      >
        {children}
      </a>
    );
  }

  // 3. Regular HTML Button
  const { type = 'button', disabled, ...rest } = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      className={`${combinedClasses} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
});
