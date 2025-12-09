
import { Search } from "lucide-react";
import { toast } from "sonner";

export const SearchBar = () => {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchQuery = formData.get("search") as string;
    
    if (searchQuery?.trim()) {
      toast.info(`Searching for: ${searchQuery}`, {
        description: "Searching across projects, tasks, and documents"
      });
    }
  };

  return (
    <form className="relative w-full max-w-md" onSubmit={handleSearch}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
        <Search size={18} />
      </div>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="block w-full pl-10 pr-3 py-2 border border-input bg-background rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-foreground"
      />
    </form>
  );
};
