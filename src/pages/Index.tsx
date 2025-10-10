import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import GlobertSidebar from '@/components/GlobertSidebar';
import ChatTab from '@/components/ChatTab';
import ScheduleTab from '@/components/ScheduleTab';
import NewsTab from '@/components/NewsTab';
import { useChat } from '@/hooks/useChat';
import { useVoiceRecognition } from '@/hooks/useVoiceRecognition';
import { schedulesByClass, classes } from '@/data/scheduleData';

interface NewsItem {
  id: number;
  text: string;
  date: number;
  url: string;
  image?: string;
}

const Index = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [activeDay, setActiveDay] = useState('понедельник');
  const [selectedClass, setSelectedClass] = useState('5А');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  const { messages, userName, handleSendMessage, clearHistory } = useChat();
  const { isListening, startVoiceRecognition } = useVoiceRecognition((transcript) => {
    setInputMessage(transcript);
  });

  useEffect(() => {
    fetchVKNews();
  }, []);

  const fetchVKNews = async () => {
    setIsLoadingNews(true);
    try {
      const response = await fetch('https://api.vk.com/method/wall.get?domain=sc34global&count=10&access_token=&v=5.131');
      const data = await response.json();
      
      if (data.response && data.response.items) {
        const newsItems: NewsItem[] = data.response.items.slice(0, 5).map((item: any) => ({
          id: item.id,
          text: item.text,
          date: item.date,
          url: `https://vk.com/sc34global?w=wall-${Math.abs(item.owner_id)}_${item.id}`,
          image: item.attachments?.[0]?.photo?.sizes?.[item.attachments[0].photo.sizes.length - 1]?.url
        }));
        setNews(newsItems);
      }
    } catch (error) {
      console.error('Ошибка загрузки новостей:', error);
      setNews([
        {
          id: 1,
          text: 'Приглашаем всех учеников принять участие в школьной олимпиаде по математике. Регистрация открыта до 20 октября.',
          date: Date.now() / 1000,
          url: 'https://vk.com/sc34global'
        },
        {
          id: 2,
          text: '25 октября в нашей школе пройдет День открытых дверей для будущих учеников и их родителей. Начало в 10:00.',
          date: Date.now() / 1000,
          url: 'https://vk.com/sc34global'
        }
      ]);
    } finally {
      setIsLoadingNews(false);
    }
  };

  const handleSend = () => {
    handleSendMessage(inputMessage);
    setInputMessage('');
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const schedule = schedulesByClass[selectedClass] || schedulesByClass['5А'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 flex">
      <GlobertSidebar userName={userName} />

      <div className="flex-1 p-4 md:p-6">
        <header className="mb-6 text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            Школа Global 34
          </h1>
          <p className="text-gray-600 text-lg mt-2">Умная платформа для учеников</p>
        </header>

        <Tabs defaultValue="chat" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6 bg-white/80 backdrop-blur-sm shadow-md h-14">
            <TabsTrigger value="chat" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Чат
            </TabsTrigger>
            <TabsTrigger value="schedule" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
              <Icon name="Calendar" size={20} className="mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="news" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
              <Icon name="Newspaper" size={20} className="mr-2" />
              Новости
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="animate-fade-in">
            <ChatTab
              messages={messages}
              inputMessage={inputMessage}
              setInputMessage={setInputMessage}
              handleSendMessage={handleSend}
              startVoiceRecognition={startVoiceRecognition}
              isListening={isListening}
              userName={userName}
              clearHistory={clearHistory}
            />
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <ScheduleTab
              selectedClass={selectedClass}
              setSelectedClass={setSelectedClass}
              activeDay={activeDay}
              setActiveDay={setActiveDay}
              schedule={schedule}
              classes={classes}
            />
          </TabsContent>

          <TabsContent value="news" className="animate-fade-in">
            <NewsTab
              news={news}
              isLoadingNews={isLoadingNews}
              formatDate={formatDate}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;