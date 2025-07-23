export default function Page() {
  return (
    <div className='size-full relative flex pt-36'>
      <div className='max-w-4xl mx-auto w-full flex flex-col items-center text-center'>
        <h1 className='text-8xl motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm leading-[1.125] font-semibold tracking-tight'>
          The Open-Source Remote <br /> Server Management Platform.
        </h1>
        <p className='text-muted-foreground motion-opacity-in-0 motion-duration-500 motion-translate-y-in-50 motion-blur-in-sm motion-delay-200 mt-4 max-w-xl text-2xl'>
          No more switching between terminals and remote desktop apps. Access
          all your servers from one beautiful dashboard.
        </p>
      </div>
    </div>
  )
}
