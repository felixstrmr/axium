type Props = React.SVGProps<SVGSVGElement>

export default function HouseIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M12 1.002a1 1 0 0 0-.613.209l-9 7A1 1 0 0 0 2 9v11c0 1.645 1.355 3 3 3h2a1 1 0 0 0 1-1v-8c0-1.645 1.355-3 3-3h2c1.645 0 3 1.355 3 3v8a1 1 0 0 0 1 1h2c1.645 0 3-1.355 3-3V9a1 1 0 0 0-.387-.79l-9-7A1 1 0 0 0 12 1.003zM11 13c-.571 0-1 .429-1 1v8c0 .571.429 1 1 1h2c.571 0 1-.429 1-1v-8c0-.571-.429-1-1-1z' />
    </svg>
  )
}
