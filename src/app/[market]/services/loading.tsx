export default function Loading() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="h-10 w-2/3 animate-pulse rounded-lg bg-gray-200" />

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-gray-200"
          >
            <div className="aspect-[4/3] animate-pulse bg-gray-200" />

            <div className="space-y-3 p-5">
              <div className="h-5 animate-pulse rounded bg-gray-200" />
              <div className="h-4 animate-pulse rounded bg-gray-100" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}