import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'globert';
  timestamp: Date;
  userName?: string;
}

interface ChatTabProps {
  messages: Message[];
  inputMessage: string;
  setInputMessage: (value: string) => void;
  handleSendMessage: () => void;
  startVoiceRecognition: () => void;
  isListening: boolean;
  userName: string;
  clearHistory: () => void;
}

const ChatTab = ({
  messages,
  inputMessage,
  setInputMessage,
  handleSendMessage,
  startVoiceRecognition,
  isListening,
  userName,
  clearHistory
}: ChatTabProps) => {
  return (
    <Card className="shadow-xl border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Bot" size={24} />
            Чат с Глобертом
          </div>
          <Button
            onClick={clearHistory}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Icon name="Trash2" size={16} className="mr-1" />
            Очистить
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.sender === 'globert' && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-sky-500 rounded-full flex items-center justify-center">
                        <Icon name="Bot" size={14} className="text-white" />
                      </div>
                      <span className="font-semibold text-sm text-gray-700">Глоберт</span>
                    </div>
                  )}
                  <p className={message.sender === 'user' ? 'text-white' : 'text-gray-700'}>
                    {message.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 bg-gray-50 border-t">
          <div className="flex gap-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={userName ? "Задай вопрос Глоберту..." : "Как тебя зовут?"}
              className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
            />
            <Button
              onClick={startVoiceRecognition}
              className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white px-4`}
            >
              <Icon name={isListening ? "MicOff" : "Mic"} size={20} />
            </Button>
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 text-white px-6"
            >
              <Icon name="Send" size={20} />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatTab;
