'use client';

import { assets, blog_data } from '@/assets/assets';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Page = ({ params: paramsPromise }) => {
  const [data, setData] = useState(null);
  const [params, setParams] = useState(null);

  // Unwrap the params promise and store it in the state
  useEffect(() => {
    if (paramsPromise && typeof paramsPromise.then === 'function') {
      paramsPromise.then((resolvedParams) => {
        setParams(resolvedParams); // Safely unwrap the promise and set it
      });
    } else {
      setParams(paramsPromise); // Handle cases where it's not a promise
    }
  }, [paramsPromise]);

  // Function to fetch blog data from API
  const fetchBlogData = async (id) => {
    try {
      const response = await axios.get('/api/blog', { params: { id } });
      setData(response.data);
    } catch (error) {
      console.error('Error fetching blog data:', error);
    }
  };

  // Fetch or find blog data once params are available
  useEffect(() => {
    if (params && params.id) {
      const blogId = params.id;
      const blog = blog_data.find((item) => Number(blogId) === item.id);
      if (blog) {
        setData(blog); // Use local data if found
      } else {
        fetchBlogData(blogId); // Fetch from API if not found locally
      }
    }
  }, [params]);

  // Loading state
  if (!data) {
    return <div className="text-center py-20 text-gray-500">Loading...</div>;
  }

  // Render UI
  return (
    <>
      <div className="bg-gray-100 py-6 px-4 md:px-12 lg:px-28">
        <div className="flex justify-between items-center mb-8">
          <Link href="/">
            <Image src={assets.logo} width={180} alt="Logo" className="cursor-pointer" />
          </Link>
          <button className="flex items-center gap-2 font-medium py-2 px-4 sm:py-3 sm:px-6 border border-black shadow-md bg-white hover:bg-gray-200 transition">
            Get Started
            <Image src={assets.arrow} alt="Arrow Icon" width={20} height={20} />
          </button>
        </div>
        <div className="text-center my-16">
          <h1 className="text-3xl sm:text-5xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          {data.authorImg && (
            <Image
              className="mx-auto mt-6 border border-gray-300 rounded-full"
              src={data.authorImg}
              width={60}
              height={60}
              alt="Author Image"
            />
          )}
          <p className="mt-2 text-lg text-gray-700">{data.author}</p>
        </div>
      </div>
      <div className="px-4 md:px-12 lg:px-28 mt-[-60px] mb-10">
        {data.image && (
          <Image
            className="border border-gray-300 rounded-lg"
            src={data.image}
            width={1280}
            height={720}
            alt="Blog Image"
          />
        )}
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed">{data.description}</p>
        </div>
        <h3 className="mt-8 text-xl font-semibold">Step 2: Self-Reflection and Goal Setting</h3>
        <p className="text-gray-700 leading-relaxed">
          Before you can manage your lifestyle, you must have a clear understanding of what you want to achieve.
          Start by reflecting on your values, aspirations, and long-term goals.
        </p>
        <h3 className="mt-8 text-xl font-semibold">Step 3: Implement Changes</h3>
        <p className="text-gray-700 leading-relaxed">
          Implementing changes based on your self-reflection is key. Start small and build habits over time.
        </p>
        <h3 className="mt-8 text-xl font-semibold">Conclusion:</h3>
        <p className="text-gray-700 leading-relaxed">
          Managing your lifestyle is a journey that requires commitment and self-awareness. By following this guide,
          you can make meaningful changes for a more balanced and fulfilling life.
        </p>
        <div className="mt-16">
          <p className="text-gray-800 font-semibold mb-4">Share this article on social media</p>
          <div className="flex gap-4">
            <Image src={assets.facebook_icon} width={50} alt="Facebook Icon" />
            <Image src={assets.twitter_icon} width={50} alt="Twitter Icon" />
            <Image src={assets.googleplus_icon} width={50} alt="Google Plus Icon" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Page;
