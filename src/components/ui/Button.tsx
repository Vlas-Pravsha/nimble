import React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

const buttonStyles = cva(
  [
    'w-full',
    'font-bold',
    'py-2',
    'px-4',
    'rounded',
    'transition',
    'duration-300',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-white',
          'text-black',
          'border',
          'border-gray-500',
          'hover:bg-black',
          'hover:text-white',
        ],
        secondary: [
          'border',
          'bg-black',
          'text-white',
          'hover:bg-white',
          'hover:text-black',
          'hover:border',
          'hover:border-gray-500',
        ],
        icon: ['bg-transparent', 'text-gray-500', 'hover:text-gray-700', 'w-0'],
      },
      size: {
        default: ['text-base'],
        large: ['text-xl'],
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonStyles> {
  children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  className,
  ...props
}) => {
  return (
    <button className={buttonStyles({ variant, size, className })} {...props}>
      {children}
    </button>
  )
}
