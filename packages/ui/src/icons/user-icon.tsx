type Props = React.SVGProps<SVGSVGElement>

export default function UserIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M12 2C9.25 2 7 4.25 7 7s2.25 5 5 5 5-2.25 5-5-2.25-5-5-5ZM9 14c-2.75 0-5 2.25-5 5v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-2c0-2.75-2.25-5-5-5z' />
    </svg>
  )
}
