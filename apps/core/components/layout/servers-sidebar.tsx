import EnvironmentSelect from '@/components/features/environment/environment-select'

export default async function ServersSidebar() {
  return (
    <aside className='bg-background w-64 max-w-64 min-w-64 rounded-xl p-4 shadow-xs'>
      <EnvironmentSelect />
    </aside>
  )
}
