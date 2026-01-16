export interface Blog {
    id: string | number;
    title: string;
    category: string[];
    description: string;
    date: string;
    coverImage: string;
    content: string;
}

export type CreateBlogInput = Omit<Blog, 'id'>;
