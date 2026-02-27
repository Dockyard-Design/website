import { ListChecks, BadgePercent, BarChart3 } from 'lucide-react'
import { ServicesCard } from './ServicesCard'
import Image from 'next/image'

export default function Services() {
  return (
    <div className="w-full mt-22 flex justify-center items-center flex-col pb-16">
      <h1 className="text-2xl font-bold white-text-shadow-hero ">
        CREATING <span className="text-services bg-[#00CDF4]">UNIQUE</span> WEB PRODUCTS FOR{' '}
        <span className="text-services bg-[#E45DFF]">YOUR BUSINESS</span>
      </h1>

      <div className="border-brand-gradient max-w-xl mx-auto mt-16 z-1">
        <div className="bg-brand-gradient-dark rounded-xl">
          <div className="white-text-shadow-hero p-6 flex flex-col text-center">
            <h1 className="font-bold text-2xl">Quick launch your website</h1>
            <span className="font-semibold pt-2">
              We will design <span className="font-bold">your</span> website, to your needs, from
              start to finish
            </span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto mt-20">
        <h2 className="text-center text-3xl font-semibold tracking-wide text-gradient">
          ADDITIONAL SERVICES
        </h2>
        <h6 className="text-center text-md font-medium mb-16 white-text-shadow-hero max-w-xl mx-auto pt-8">
          Need more from your website?{' '}
          <span className="font-bold text-[#00CDF4]">We can help! </span>
          Our additional services help you get the most from your online presence.
        </h6>
        <div className="flex flex-row justify-center gap-12 mb-12">
          <ServicesCard
            icon={
              <Image
                src="/images/icons/SEO_NoBackground.png"
                alt="SEO Icon"
                width={96}
                height={96}
                className="text-white"
                priority
              />
            }
            title="SEO"
            description="Improve your visibility and rankings in search results"
            cardClassName="bg-services-gradient-card border border-[#FF312E]/50 w-109 h-28"
            iconClassName="bg-gradient-to-t from-[#FF1616] to-[#FF5656]"
            iconWrapperStyle={{ boxShadow: '0px 0px 12px #FF312E' }}
            cardStyle={{ boxShadow: '14px 14px 18px 1px #000, 0px 0px 18px 1px #ff2d55' }}
          />
          <ServicesCard
            icon={
              <Image
                src="/images/icons/Branding_NoBackground.png"
                alt="Branding Icon"
                width={96}
                height={96}
                className="text-white"
                priority
              />
            }
            title="Branding & Logos"
            description="Complete branding and logo designs for your business"
            cardClassName="bg-services-gradient-card border border-[#88FF00]/50 w-109 h-28"
            iconClassName="bg-gradient-to-t from-[#509600] to-[#7DBF30]"
            iconWrapperStyle={{ boxShadow: '0px 0px 12px #88FF00' }}
            cardStyle={{ boxShadow: '14px 14px 18px 1px #000, 0px 0px 18px 1px #a8ff78' }}
          />
        </div>
        <div className="flex justify-center mt-12">
          <ServicesCard
            icon={<BarChart3 size={86} className="text-white" />}
            title="Google Analytics"
            description="Data-driven insights with Google Analytics"
            cardClassName="bg-services-gradient-card border border-[#EA00FF]/50 w-109 h-28"
            iconClassName="bg-gradient-to-t from-[#DE23EE] to-[#E765F3]"
            iconWrapperStyle={{ boxShadow: '0px 0px 12px #EA00FF' }}
            cardStyle={{ boxShadow: '14px 14px 18px 1px #000, 0px 0px 18px 1px #e45dff' }}
          />
        </div>
      </div>
    </div>
  )
}
