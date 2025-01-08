import { Home, Search, Library, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-primary rounded-full p-2 hover:bg-secondary transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative w-60 h-full bg-black p-6 transition-transform duration-300 ease-in-out z-40`}>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary">XMRT Music</h1>
        </div>
        
        <nav className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <Home size={24} />
            <span>Home</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <Search size={24} />
            <span>Search</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <Library size={24} />
            <span>Your Library</span>
          </a>
        </nav>
        
        <div className="mt-8 pt-8 border-t border-gray-800">
          <button className="flex items-center space-x-3 text-gray-300 hover:text-white">
            <Plus size={24} />
            <span>Create Playlist</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;