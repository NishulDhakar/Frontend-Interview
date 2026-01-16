import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlog } from '@/lib/api';
import type { CreateBlogInput } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';

interface CreateBlogProps {
    onSuccess: () => void;
    onCancel: () => void;
}

export function CreateBlog({ onSuccess, onCancel }: CreateBlogProps) {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        coverImage: '',
        content: ''
    });
    const [error, setError] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: createBlog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blogs'] });
            onSuccess();
        },
        onError: () => {
            setError("Failed to create blog. Please try again.");
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Basic validation
        if (!formData.title || !formData.content) {
            setError("Title and Content are required.");
            return;
        }

        const newBlog: CreateBlogInput = {
            title: formData.title,
            category: formData.category.split(',').map(c => c.trim()).filter(c => c.length > 0),
            description: formData.description,
            coverImage: formData.coverImage,
            content: formData.content,
            date: new Date().toISOString()
        };

        mutation.mutate(newBlog);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="h-full overflow-y-auto p-4 md:p-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Blog</CardTitle>
                    <CardDescription>Fill in the details to publish a new post.</CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                name="title"
                                placeholder="Enter blog title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="category">Categories (comma separated)</Label>
                            <Input
                                id="category"
                                name="category"
                                placeholder="Technology, Finance, AI"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Short Description</Label>
                            <Input
                                id="description"
                                name="description"
                                placeholder="Brief summary of the post"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="coverImage">Cover Image (URL)</Label>
                            <Input
                                id="coverImage"
                                name="coverImage"
                                placeholder="https://example.com/image.jpg"
                                value={formData.coverImage}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                name="content"
                                placeholder="Write your blog content here..."
                                className="min-h-[200px]"
                                value={formData.content}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={onCancel} disabled={mutation.isPending}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ? 'Creating...' : 'Create Blog'}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
