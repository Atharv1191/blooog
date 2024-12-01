'use client';

import { assets, blog_data } from '@/assets/assets';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Page = ({ params: paramsPromise }) => {
  const [data, setData] = useState(null);
  const [params, setParams] = useState(null);

  // Unwrap the params Promise
  useEffect(() => {
    paramsPromise.then((resolvedParams) => {
      setParams(resolvedParams);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (params) {
      const blog = blog_data.find((item) => Number(params.id) === item.id);
      if (blog) {
        setData(blog);
        console.log(blog);
      }
    }
  }, [params]);

  return (
    data?<>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between item-center '>
            <Link href='/' >
            <Image src={assets.logo} width={180} alt='' className='w-130px sm:w-auto'/>
            </Link>
            <button className='flex item-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow} alt=''/></button>
        </div>
        <div className='text-center my-24'>
            <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
            <Image className='mx-auto mt-6 border border-white rounded-full' src={data.author_img} width={60} height={60} alt='' />
            <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
     
    </div>
    <div className='mx-5 max-w-[800px] md:max-auto mt-[-100px] mb-10'>
        <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt=''/>
        <h1 className='my-8 text-[26px] font-semibold'>Introduction</h1>
        <p>{data.description}</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Reflection and Goal Setting</h3>
        <p className='my-3'>Before you can manage your lifeStyle, you must have a clear understanding what you want to achive, Start by reflecting on your values ,aspirations, and long-term goals.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Reflection and Goal Setting</h3>
        <p className='my-3'>Before you can manage your lifeStyle, you must have a clear understanding what you want to achive, Start by reflecting on your values ,aspirations, and long-term goals.</p>
        <h3 className='my-5 text-[18px] font-semibold'>Conclusion:</h3>
        <p className='my-3'>Managing your lifeStyle is a journy that requires commitment and self-awareness. By following step-by-step guide,You van take control of your life and make amnageful changes thatb lead toa more balanced and fulfilling lifestyle.Remember that's okay to seek support and guidance from proffesionals or mentors along the way.Your well-being and happiness are worth the effort,</p>
        <div className='my-24'>
            <p className='text-black font-semibold my-4'>Share this article on social media</p>
            <div className='flex'>
                <Image src={assets.facebook_icon} width={50} alt=''/>
                <Image src={assets.twitter_icon} width={50} alt=''/>
                <Image src={assets.googleplus_icon} width={50} alt=''/>

            </div>
        </div>

    </div>
    <Footer/>
    </>:<></>
  )
}

export default Page