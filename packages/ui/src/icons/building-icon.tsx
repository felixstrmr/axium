type Props = React.SVGProps<SVGSVGElement>

export default function BuildingIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M14 22v-2a1 1 45 0 0-1-1h-2a1 1 135 0 0-1 1v2a1 1 45 0 0 1 1h2a1 1 135 0 0 1-1z' />
      <path d='M6 1C4.355 1 3 2.355 3 4v16c0 1.645 1.355 3 3 3h1a1 1 135 0 0 1-1v-4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4a1 1 45 0 0 1 1h1c1.645 0 3-1.355 3-3V4c0-1.645-1.355-3-3-3Zm2 4h.01a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Zm4 0h.01a1 1 0 0 1 0 2H12a1 1 0 0 1 0-2Zm4 0h.01a1 1 0 0 1 0 2H16a1 1 0 0 1 0-2ZM8 9h.01a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Zm4 0h.01a1 1 0 0 1 0 2H12a1 1 0 0 1 0-2zm4 0h.01a1 1 0 0 1 0 2H16a1 1 0 0 1 0-2zm-8 4h.01a1 1 0 0 1 0 2H8a1 1 0 0 1 0-2Zm4 0h.01a1 1 0 0 1 0 2H12a1 1 0 0 1 0-2zm4 0h.01a1 1 0 0 1 0 2H16a1 1 0 0 1 0-2z' />
    </svg>
  )
}
