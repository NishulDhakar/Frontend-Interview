import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '@/lib/api';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';



interface BlogListProps {
    onSelect: (id: string | number) => void;
    selectedId?: string | number | null;
}

export function BlogList({ onSelect, selectedId }: BlogListProps) {
    const { data: blogs, isLoading, error } = useQuery({
        queryKey: ['blogs'],
        queryFn: getBlogs,
    });

    if (isLoading) {
        return (
            <div className="flex flex-col gap-4 p-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="p-4 text-red-500">Error loading blogs</div>;
    }

    return (
        <div className="flex flex-col gap-4 p-4 overflow-y-auto h-full">
            {blogs?.map((blog) => (
                <Card
                    key={blog.id}
                    className={cn(
                        "cursor-pointer transition-colors hover:bg-accent/50",
                        selectedId === blog.id && "bg-accent border-primary"
                    )}
                    onClick={() => onSelect(blog.id)}
                >
                    <CardHeader>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {blog.category.map((cat) => (
                                <span key={cat} className="text-xs font-semibold px-2 py-1 rounded-full bg-primary/10 text-primary">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <CardTitle className="text-lg">{blog.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{blog.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    );
}
