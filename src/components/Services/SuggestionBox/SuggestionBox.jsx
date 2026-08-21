import React from 'react'
import SuggetionBocCLient from './SuggetionBocCLient'
import ServiceInnerHeader from '../Shared/ServiceInnerHeader'

export default function SuggestionBox() {
    return (
        <div className='mt-3 md:mt-8 space-y-4 md:space-y-6 '
        >

            <ServiceInnerHeader
                title="Suggestion Box / 提案箱"
                title2="صندوق الاقتراحات"
            />
            <SuggetionBocCLient />

        </div>
    )
}
