export function SectionHeading({
  heading,
  description,
}: {
  heading: string
  description: string
}) {
  return (
    <div className="flex flex-col items-center px-6 text-center">
      <h2 className="max-w-2xl font-heading text-3xl font-semibold tracking-tight text-balance xs:text-4xl md:text-5xl 3xl:max-w-4xl 3xl:text-6xl">
        {heading}
      </h2>
      <p className="mt-3 max-w-xl text-base text-balance text-muted-foreground xs:text-lg 3xl:max-w-2xl 3xl:text-xl">
        {description}
      </p>
    </div>
  )
}
