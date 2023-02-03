export default function Page() {
  return (
    <div className=''>
      <section className="container mx-auto p-8 md:mt-24 md:max-w-[960px]">
        <div className="flex flex-col gap-8">
          <h1 className="font-bold text-5xl">Privacy-first, open-source comment system</h1>
          <h2 className="text-2xl text-gray-700 font-bold">Trusted by 4399 users</h2>
          <div>
            <a className="border-2 border-black py-1 px-3 rounded-full inline-block" href="/dashboard">
              Get started
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}