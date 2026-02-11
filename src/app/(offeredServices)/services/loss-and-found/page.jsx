import LossAndFoundSection from '@/components/Services/LossAndFound/LossAndFoundSection'
import LossAndFoundTopSection from '@/components/Services/LossAndFound/LossAndFoundTopSection'
import LostComplainForm from '@/components/Services/LossAndFound/LostComplainForm'
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1'


export default function page() {
  return (
    <div className='space-y-8'>
      <LossAndFoundTopSection />

      <GradientBorderWrapper1 rounded="rounded-[20px]"
        innerRounded="rounded-[19px]" >
        <LostComplainForm />
      </GradientBorderWrapper1>


      <LossAndFoundSection />

    </div>
  )
}
