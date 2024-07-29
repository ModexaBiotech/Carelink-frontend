import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function EducationalContent() {
    return (
        <>
            <h1 className='font-semibold text-[24px]'>News</h1>
            <div className='flex gap-10'>
                {/* First image of the article */}
                <div className='w-[347px]  bg-gray-200 border-top-right-radius: 0.75rem'>
                    <div>
                        <Image src="/brokenheart.png" height={234} width={347} alt='EducImage' />
                    </div>

                    <a href="https://modexabio.com/" target="_blank">
                        <div className='overflow-hidden noreferrer'>
                            <h1 className='font-semibold leading-4 text-[24px] mt-3'>Tokotsubo Cardiomyopathy</h1>
                            <p className='mt-3 pb-5 text-[14px]'>After hearing her life story for six years, i can’t
                                do it anymore. This life is hard. He says, urging
                                men to fear women...</p>
                        </div>
                    </a>
                </div>

                {/* second image of the article */}

                <div className='w-[347px]  bg-gray-200 border-top-right-radius: 0.75rem'>
                    <div>
                        <Image src="/brokenheart.png" height={234} width={347} alt='EducImage' />
                    </div>

                    <a href="https://modexabio.com/" target="_blank">
                        <div className='overflow-hidden noreferrer'>
                            <h1 className='font-semibold leading-4 text-[24px] mt-3'>G6PD</h1>
                            <p className='mt-3 pb-5 text-[14px]'>Medical research doctor who spent his whole life researching cancer drops the vile with the only cure in
                                the toilet. His collueges claim he said he didn’t want to leave his creation in their clumsy hands while going
                                to the restroom...</p>
                        </div>
                    </a>
                </div>
            </div>

        </>
    )
}

export default EducationalContent