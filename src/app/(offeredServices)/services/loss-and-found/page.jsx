import LossAndFoundSection from '@/components/Services/LossAndFound/LossAndFoundSection'
import LossAndFoundTopSection from '@/components/Services/LossAndFound/LossAndFoundTopSection'
import LostComplainForm from '@/components/Services/LossAndFound/LostComplainForm'


export default function page() {
    return (
        <div className='space-y-8'>
            <LossAndFoundTopSection />
            <LostComplainForm/>
            <LossAndFoundSection />

        </div>
    )
}
