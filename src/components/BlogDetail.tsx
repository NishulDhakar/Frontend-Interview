import { useQuery } from '@tanstack/react-query';
import { getBlogById } from '@/lib/api';
import { Skeleton } from '@/components/ui/skeleton';

interface BlogDetailProps {
    id: string | number | null | undefined;
}

export function BlogDetail({ id }: BlogDetailProps) {
    const { data: blog, isLoading, error } = useQuery({
        queryKey: ['blog', id],
        queryFn: () => getBlogById(id!),
        enabled: !!id,
    });

    if (!id) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-muted-foreground">
                Select a blog to view details
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="space-y-4 p-8">
                <Skeleton className="h-64 w-full rounded-xl" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-4 w-1/4" />
                <div className="space-y-2 pt-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">Error loading blog details</div>;
    }

    if (!blog) return null;

    return (
        <div className="h-full overflow-y-auto p-8">
            <div className="max-w-3xl mx-auto space-y-6">
                {blog.coverImage && (
                    <div className="overflow-hidden rounded-xl border bg-muted">
                        <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-64 object-cover object-center transition-transform hover:scale-105"
                        />
                    </div>
                )}

                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tight">{blog.title}</h1>

                    <div className="flex items-center gap-4 text-muted-foreground text-sm">
                        <time dateTime={blog.date}>
                            {new Date(blog.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                        <div className="flex gap-2">
                            {blog.category.map((cat) => (
                                <span key={cat} className="bg-secondary px-2 py-0.5 rounded text-secondary-foreground font-medium">
                                    {cat}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="prose prose-slate dark:prose-invert max-w-none pt-4 whitespace-pre-wrap leading-relaxed">
                        {blog.content}
                    </div>
                </div>
            </div>
        </div>
    );
}
