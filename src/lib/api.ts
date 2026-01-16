import type { Blog, CreateBlogInput } from "@/types";

const API_URL = "http://localhost:3001";

export async function getBlogs(): Promise<Blog[]> {
    const response = await fetch(`${API_URL}/blogs`);
    if (!response.ok) {
        throw new Error("Failed to fetch blogs");
    }
    return response.json();
}

export async function getBlogById(id: string | number): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs/${id}`);
    if (!response.ok) {
        throw new Error(`Failed to fetch blog with id ${id}`);
    }
    return response.json();
}

export async function createBlog(blog: CreateBlogInput): Promise<Blog> {
    const response = await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(blog),
    });
    if (!response.ok) {
        throw new Error("Failed to create blog");
    }
    return response.json();
}
