
// import React, { useEffect, useState } from 'react'
// import BlogItem from './BlogItem'
// import axios from 'axios'

// const BlogList = () => {
//     const [menu,setMenu] = useState("All")
//     const [blogs,setBlogs] = useState([]);
//     const fetchBlogs = async()=>{
//         const response = await axios.get('/api/blog');
//         setBlogs(response.data.blogs);
//         console.log(response.data.blogs);
//     }
//     useEffect(()=>{
//       fetchBlogs()
//     },[])

//   return (
//     <div>
//         <div className='flex justify-center gap-6 my-10'>
//             <button onClick={()=>setMenu('All')} className={menu==="All"?`bg-black text-white py-1 px-4 rounded-sm`:""}>All</button>
//             <button onClick={()=>setMenu('Technology')} className={menu==="Technology"?`bg-black text-white py-1 px-4 rounded-sm`:""}>Technology</button>
//             <button onClick={()=>setMenu('Startup')} className={menu==="Startup"?`bg-black text-white py-1 px-4 rounded-sm`:""}>Startup</button>
//             <button onClick={()=>setMenu('Lifestyle')} className={menu==="Lifestyle"?`bg-black text-white py-1 px-4 rounded-sm`:""}>Lifestyle</button>
//         </div>
//         <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
//             {blogs.filter((item)=>menu==="All"?true:item.category===menu).map((item,index)=>{
//                 return <BlogItem key={index} image={item.image} id={item._id} title={item.title} description={item.description} category={item.category}/>

//             })}
//         </div>
//     </div>
//   )
// }

// export default BlogList
import React, { useEffect, useState } from 'react';
import BlogItem from './BlogItem';
import axios from 'axios';

const BlogList = () => {
  const [menu, setMenu] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const fetchBlogs = async () => {
    const response = await axios.get('/api/blog');
    setBlogs(response.data.blogs);
    setFilteredBlogs(response.data.blogs); // Initialize filteredBlogs
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Update filtered blogs when menu or searchQuery changes
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();

    const filtered = blogs.filter((item) => {
      const matchesCategory = menu === 'All' || item.category === menu;
      const matchesSearch =
        item.title.toLowerCase().includes(lowerCaseQuery) ||
        item.description.toLowerCase().includes(lowerCaseQuery) ||
        item.category.toLowerCase().includes(lowerCaseQuery);

      return matchesCategory && matchesSearch;
    });

    setFilteredBlogs(filtered);
  }, [menu, searchQuery, blogs]);

  return (
    <div>
      {/* Search Bar */}
      <div className="mb-6 flex justify-center">
        <div className="relative w-full sm:w-1/2">
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.243 4.243a1 1 0 01-1.414 1.414l-4.243-4.243zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Category Buttons */}
      <div className="flex justify-center gap-6 my-10">
        <button
          onClick={() => setMenu('All')}
          className={menu === 'All' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          All
        </button>
        <button
          onClick={() => setMenu('Technology')}
          className={menu === 'Technology' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Technology
        </button>
        <button
          onClick={() => setMenu('Startup')}
          className={menu === 'Startup' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Startup
        </button>
        <button
          onClick={() => setMenu('Lifestyle')}
          className={menu === 'Lifestyle' ? 'bg-black text-white py-1 px-4 rounded-sm' : ''}
        >
          Lifestyle
        </button>
      </div>

      {/* Blog Items */}
      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((item, index) => (
            <BlogItem
              key={index}
              image={item.image}
              id={item._id}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))
        ) : (
          <p className="text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
