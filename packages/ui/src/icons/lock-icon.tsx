type Props = React.SVGProps<SVGSVGElement>

export default function LockIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M12 1c-1.472 0-2.958.485-4.102 1.502C6.755 3.519 6 5.083 6 7v3H5c-1.645 0-3 1.355-3 3v7c0 1.645 1.355 3 3 3h14c1.645 0 3-1.355 3-3v-7c0-1.645-1.355-3-3-3h-1V7c0-1.917-.755-3.481-1.898-4.498C14.958 1.485 13.472 1 12 1Zm0 2c1.028 0 2.042.348 2.773.998S16 5.583 16 7v3H8V7c0-1.417.495-2.352 1.227-3.002C9.957 3.348 10.972 3 12 3Z' />
    </svg>
  )
}
