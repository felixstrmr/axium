type Props = React.SVGProps<SVGSVGElement>

export default function ServerIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M4 1C2.355 1 1 2.355 1 4v4c0 1.645 1.355 3 3 3h16c1.645 0 3-1.355 3-3V4c0-1.645-1.355-3-3-3Zm2 4h.01a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2Zm-2 8c-1.645 0-3 1.355-3 3v4c0 1.645 1.355 3 3 3h16c1.645 0 3-1.355 3-3v-4c0-1.645-1.355-3-3-3zm2 4h.01a1 1 0 0 1 0 2H6a1 1 0 0 1 0-2Z' />
    </svg>
  )
}
