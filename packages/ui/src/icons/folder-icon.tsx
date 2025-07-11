type Props = React.SVGProps<SVGSVGElement>

export default function FolderIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M4 2C2.355 2 1 3.355 1 5v13c0 1.645 1.355 3 3 3h16c1.645 0 3-1.355 3-3V8c0-1.645-1.355-3-3-3h-7.91a1 1 0 0 1-.852-.459l-.802-1.191A3 3 0 0 0 7.93 2Z' />
    </svg>
  )
}
