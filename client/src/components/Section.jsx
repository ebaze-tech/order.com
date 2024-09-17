import React from 'react';
import grassTwo from '../assets/grassTwo.avif';
import grassOne from '../assets/grassOne.avif';
import grassThree from '../assets/grassThree.avif';

const Section = () => {
    return (
        <div className='flex flex-col items-center justify-center mt-8 bg-white pt- lg:w-100vw h-100vh w-100vw'>
            <h1 className='flex flex-col items-center justify-center pt-12 text-[4rem] text-center font-pacifico'>Explore Our Services</h1>
            <div className='flex flex-row items-start justify-center gap-12 p-8 flex-nowrap'>
                {/* Service 1 */}
                <div className='flex flex-col items-center justify-center'>
                    <img src={grassOne} alt="Mowing and Edging" className='w-[23rem] lg:w-[100rem] lg:h-[40rem] h-[15rem] object-cover' />
                    <h2 className='font-extrabold text-[3rem] mt-4 text-center text-gray-700 font-robotoSerif'>MOWING AND EDGING</h2>
                    <p className='text-center text-[1.8rem] mt-4'>We offer this essential lawn maintenance that helps keep your lawn looking healthy, neat, and attractive.</p>
                </div>

                {/* Service 2 */}
                <div className='flex flex-col items-center justify-center'>
                    <img src={grassTwo} alt="Fertilization" className='w-[23rem] lg:w-[100rem] lg:h-[40rem] h-[15rem] object-cover' />
                    <h2 className='font-extrabold text-[3rem] mt-4 text-center text-gray-700 font-robotoSerif'>FERTILIZATION</h2>
                    <p className='text-center text-[1.8rem] mt-4'>We add nutrients to the soil to enhance the growth, health of your grass, and overall appearance of the lawn.</p>
                </div>

                {/* Service 3 */}
                <div className='flex flex-col items-center justify-center'>
                    <img src={grassThree} alt="Cleanup" className='w-[23rem] h-[15rem] lg:w-[100rem] lg:h-[40rem] object-cover' />
                    <h2 className='font-extrabold mt-4 text-[3rem] text-center text-gray-700 font-robotoSerif'>CLEANUP</h2>
                    <p className='text-center mt-4 text-[1.8rem]'>We remove debris, leaves, and other litter from your lawn to maintain its health and appearance.</p>
                </div>
            </div>
        </div>
    );
}

export default Section;
