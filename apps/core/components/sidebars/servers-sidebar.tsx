import EnvironmentSelect from '@/components/selects/environment-select'

export default function ServersSidebar() {
  return (
    <aside className='bg-background p-4 rounded-xl border min-w-64 max-w-64 w-64 flex flex-col'>
      <EnvironmentSelect />
    </aside>
  )
}
