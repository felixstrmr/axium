type Props = React.SVGProps<SVGSVGElement>

export default function MessageCircleIcon({ ...props }: Props) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='currentColor'
      {...props}
    >
      <path d='M12.037 1.943c-2.143.014-4.226.736-5.918 1.967C2.631 6.448.778 11.237 2.96 16.057L1.053 21.68a1 1 0 0 0 1.267 1.267l5.623-1.906c4.82 2.181 9.609.328 12.147-3.16 2.626-3.61 2.942-9-1.014-12.957-1.978-1.978-4.316-2.888-6.61-2.975a10 10 0 0 0-.429-.006z' />
    </svg>
  )
}
