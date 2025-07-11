type Props = React.SVGProps<SVGSVGElement>

export default function FolderOpenIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M4 2C2.355 2 1 3.355 1 5v13c0 1.645 1.355 3 3 3h14.443a3.01 3.01 0 0 0 2.926-2.25v-.002l1.54-5.998v-.002c.392-1.526-.52-2.995-1.909-3.51V8c0-1.645-1.355-3-3-3h-5.93a1 1 0 0 1-.842-.459l-.802-1.191-.004-.002A3 3 0 0 0 7.89 2Zm0 2h3.91a1 1 0 0 1 .852.459l.802 1.191A3 3 0 0 0 12.07 7H18c.564 0 1 .436 1 1v1H9.217a3 3 0 0 0-2.61 1.65l-.064.125-.016.02L3 17.619V5c0-.564.436-1 1-1Z' />
    </svg>
  )
}
