export default function ApiLoading() {
  return (
    <div className="flex justify-center" aria-label="Now loading...">
      <div className="animate-spin h-20 w-20 mt-5 boader-8 boader-blue-500 rounded-full border-b-transparent"></div>
    </div>
  )
}