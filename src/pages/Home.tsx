import { useState } from 'react';
import { BlogList } from '@/components/BlogList';
import { BlogDetail } from '@/components/BlogDetail';
import { CreateBlog } from '@/components/CreateBlog';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    const isMobileDetailOpen = selectedId !== null || isCreating;

    const handleSelectBlog = (id: string | number) => {
        setSelectedId(id);
        setIsCreating(false);
    };

    const handleCreateClick = () => {
        setIsCreating(true);
        setSelectedId(null);
    };

    const handleCreateSuccess = () => {
        setIsCreating(false);
        setSelectedId(null);
    };

    const handleBack = () => {
        setSelectedId(null);
        setIsCreating(false);
    };

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-background">
            <header className="flex items-center justify-between border-b px-4 py-3 md:px-6 md:py-4 bg-card/50 backdrop-blur-sm z-10 shrink-0">
                <div className="flex items-center gap-2">
                    {isMobileDetailOpen && (
                        <Button variant="ghost" size="icon" className="md:hidden" onClick={handleBack}>
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    )}
                    <h1 className="text-xl md:text-2xl font-bold tracking-tight text-primary">CA Monk Blog</h1>
                </div>
                <Button onClick={handleCreateClick} disabled={isCreating} size="sm" className="md:size-default">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span className="hidden md:inline">New Blog</span>
                    <span className="md:hidden">New</span>
                </Button>
            </header>

            <main className="flex flex-1 overflow-hidden relative">
                <aside className={cn(
                    "w-full md:w-1/3 md:min-w-[320px] border-r bg-muted/20 flex flex-col absolute inset-0 md:relative z-0 transition-transform duration-300 ease-in-out",
                    isMobileDetailOpen ? "-translate-x-full md:translate-x-0" : "translate-x-0"
                )}>
                    <div className="p-4 border-b bg-background/50">
                        <h2 className="font-semibold text-lg">Posts</h2>
                    </div>
                    <BlogList onSelect={handleSelectBlog} selectedId={selectedId} />
                </aside>
                <section className={cn(
                    "w-full md:flex-1 overflow-hidden bg-background flex flex-col absolute inset-0 md:relative z-10 transition-transform duration-300 ease-in-out",
                    isMobileDetailOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
                )}>
            
                    {!isMobileDetailOpen && (
                        <div className="hidden md:flex h-full items-center justify-center p-8 text-muted-foreground">
                            Select a blog to view details
                        </div>
                    )}

                    {isCreating ? (
                        <CreateBlog onSuccess={handleCreateSuccess} onCancel={handleBack} />
                    ) : selectedId ? (
                        <BlogDetail id={selectedId} />
                    ) : null}
                </section>
            </main>
        </div>
    );
}
