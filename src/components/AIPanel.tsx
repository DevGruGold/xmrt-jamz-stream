import { useState } from 'react';
import { X, MessageSquare, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AIPanel = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed right-4 top-4 bg-primary rounded-full p-3 hover:bg-secondary transition"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      <div className={`fixed inset-y-0 right-0 w-80 bg-black p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">AI Translation</h2>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Translate to:</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm mb-2">Current Lyrics:</p>
            <p className="text-gray-400 text-sm italic">
              No lyrics available for the current track
            </p>
          </div>

          <div className="bg-gray-900 rounded-lg p-4">
            <p className="text-sm mb-2">Translation:</p>
            <p className="text-gray-400 text-sm italic">
              Select a language to see translation
            </p>
          </div>

          <Button className="w-full" variant="secondary">
            <Volume2 className="w-4 h-4 mr-2" />
            Play Translation
          </Button>
        </div>
      </div>
    </>
  );
};

export default AIPanel;