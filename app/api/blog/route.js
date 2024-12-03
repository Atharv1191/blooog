import { connectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
const fs = require('fs')
// Establish database connection
await connectDB();

// API endpoint to get all blogs
export async function GET(request) {
  try {
    const url = new URL(request.url); // Use URL object to parse the query parameters
    const blogId = url.searchParams.get("id");

    if (blogId) {
      const blog = await BlogModel.findById(blogId); // Directly pass the ID string
      if (!blog) {
        return NextResponse.json({ error: "Blog not found" }, { status: 404 });
      }
      return NextResponse.json(blog);
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData(); // Parse form data
    const timestamp = Date.now();

    // Handling image upload
    const image = formData.get("image");
    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path, buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    // Prepare blog data
    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imgUrl,
      authorImg: formData.get("authorImg"),
    };

    // Save blog to the database
    await BlogModel.create(blogData);
    console.log("Blog saved");

    return NextResponse.json({ success: true, message: "Blog Added" });
  } catch (error) {
    console.error("Error uploading blog:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
//cretating api endpoint to delete blog
export async function DELETE(request) {
    try {
      const id = request.url.split('id=')[1]; // Safely extract the `id` parameter
      if (!id) {
        return NextResponse.json({ success: false, message: 'Blog ID is required' }, { status: 400 });
      }
  
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
      }
  
      // Delete the associated image file
      try {
        if (blog.image) {
          await fs.unlink(`./public${blog.image}`);
        }
      } catch (fileError) {
        console.error('Error deleting image file:', fileError);
      }
  
      // Delete the blog document from the database
      await BlogModel.findByIdAndDelete(id);
  
      return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Error handling DELETE request:', error);
      return NextResponse.json({ success: false, message: 'Server error occurred' }, { status: 500 });
    }
  }