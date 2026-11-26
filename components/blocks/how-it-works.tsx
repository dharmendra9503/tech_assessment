import Link from 'next/link'
import { Compass, LineChart, Wallet } from 'lucide-react'
import { SectionHeader } from '@/components/ui/section-header'

const steps = [
  {
    icon: Compass,
    title: 'Discover Properties',
    description:
      'Browse a curated catalog of premium residential and commercial real estate, vetted and ready for fractional ownership.',
    href: '/properties',
  },
  {
    icon: Wallet,
    title: 'Invest with Crypto',
    description:
      'Buy verified shares from just $100 using USDC, ETH or BTC. Settlement happens on-chain with transparent tokenized ownership.',
    href: '/how-it-works',
  },
  {
    icon: LineChart,
    title: 'Earn & Diversify',
    description:
      'Track performance and yields in real time, and diversify a portfolio across multiple properties from a single dashboard.',
    href: '/how-it-works',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-surface-elevated py-28 transition-colors duration-300 sm:py-36">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title={
            <>
              Your path to{' '}
              <span className="font-display italic font-medium text-brand">fractional</span> real
              estate
            </>
          }
          description="From discovery to ownership in three simple steps — backed by blockchain transparency and a curated selection of vetted properties."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3 lg:gap-8">
          {steps.map((step) => (
            <article
              key={step.title}
              className="group rounded-2xl border border-border bg-card p-8 shadow-sm shadow-slate-950/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/25 hover:shadow-lg hover:shadow-slate-950/10 dark:shadow-black/25 dark:hover:shadow-black/35"
            >
              <step.icon className="h-10 w-10 text-brand" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="mt-7 text-xl font-semibold text-card-foreground">{step.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">{step.description}</p>
              <Link
                href={step.href}
                className="mt-7 inline-flex items-center gap-3 text-sm font-semibold text-brand transition-colors hover:text-brand-soft"
              >
                Learn More
                <span
                  aria-hidden
                  className="block h-px w-10 bg-current transition-all duration-300 group-hover:w-16"
                />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
