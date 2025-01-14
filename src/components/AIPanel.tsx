import { useState, useEffect } from 'react';
import { X, MessageSquare, Volume2, Mic, Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { usePlayer } from '@/contexts/PlayerContext';
import { supabase } from '@/integrations/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AIPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [hasBluetoothPermission, setHasBluetoothPermission] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const { toast } = useToast();
  const { isPlaying, togglePlay } = usePlayer();

  // Check for Bluetooth availability and request permissions
  const requestBluetoothPermission = async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['generic_access']
      });
      
      setHasBluetoothPermission(true);
      toast({
        title: "Bluetooth Connected",
        description: `Connected to ${device.name}`,
      });
    } catch (error) {
      console.error('Bluetooth error:', error);
      toast({
        title: "Bluetooth Error",
        description: "Could not connect to Bluetooth device",
        variant: "destructive",
      });
    }
  };

  const translateText = async (text: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('translate-audio', {
        body: {
          audioText: text,
          targetLanguage: selectedLanguage
        }
      });

      if (error) throw error;

      setTranslatedText(data.translation);
      toast({
        title: "Translation Complete",
        description: "Text has been translated successfully",
      });
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Failed",
        description: "Could not translate the text",
        variant: "destructive",
      });
    }
  };

  // Handle translation mode toggle
  const handleTranslationMode = async (enabled: boolean) => {
    if (enabled) {
      if (!hasBluetoothPermission) {
        await requestBluetoothPermission();
      }
      
      if (isPlaying) {
        togglePlay();
      }
      
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsTranslating(true);
        
        // Here you would typically set up the speech recognition
        // For demo purposes, we'll use a mock transcription
        setTranscribedText("Hello, how are you?");
        await translateText("Hello, how are you?");
        
        toast({
          title: "Translation Mode Activated",
          description: "You can now speak to translate",
        });
      } catch (error) {
        toast({
          title: "Microphone Error",
          description: "Please enable microphone access for translation",
          variant: "destructive",
        });
      }
    } else {
      setIsTranslating(false);
      setTranscribedText('');
      setTranslatedText('');
      toast({
        title: "Translation Mode Deactivated",
        description: "Returning to music mode",
      });
    }
  };

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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Languages className="w-5 h-5" />
              <span className="text-sm">Translation Mode</span>
            </div>
            <Switch
              checked={isTranslating}
              onCheckedChange={handleTranslationMode}
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">Translate to:</label>
            <Select
              value={selectedLanguage}
              onValueChange={setSelectedLanguage}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="zh">Chinese</SelectItem>
                <SelectItem value="ja">Japanese</SelectItem>
                <SelectItem value="ko">Korean</SelectItem>
                <SelectItem value="ar">Arabic</SelectItem>
                <SelectItem value="hi">Hindi</SelectItem>
                <SelectItem value="pt">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {isTranslating && (
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Original Text</span>
                  <Mic className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <p className="text-gray-400 text-sm">
                  {transcribedText || "Speak to translate..."}
                </p>
              </div>

              {translatedText && (
                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm">Translation</span>
                    <Languages className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-gray-400 text-sm">
                    {translatedText}
                  </p>
                </div>
              )}
            </div>
          )}

          {isTranslating && (
            <Button 
              className="w-full" 
              variant="secondary"
              onClick={() => handleTranslationMode(false)}
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Stop Translation
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default AIPanel;