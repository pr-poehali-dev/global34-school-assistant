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
import ScheduleImageView from '@/components/ScheduleImageView';

interface EventItem {
  id: number;
  title: string;
  date: string;
}

const Index = () => {
  const [inputMessage, setInputMessage] = useState('');
  const [activeDay, setActiveDay] = useState('понедельник');
  const [selectedClass, setSelectedClass] = useState('5А');
  const [events] = useState<EventItem[]>([
    { id: 1, title: 'День добра и уважения', date: '1 октября' },
    { id: 2, title: 'День музыки', date: '2 октября' },
    { id: 3, title: 'День Учителя', date: '3 октября' },
    { id: 4, title: 'День защиты животных', date: '6 октября' },
    { id: 5, title: 'Всероссийский день чтения', date: '9 октября' },
    { id: 6, title: 'День отца', date: '15 октября' },
    { id: 8, title: 'Декада подростка. Закон', date: '20-25 октября' },
    { id: 9, title: 'Международный день школьных библиотек', date: '27 октября' },
    { id: 11, title: 'День народного единства', date: '4 ноября' },
    { id: 12, title: 'День против фашизма, расизма и антисемитизма', date: '10 ноября' },
    { id: 13, title: '295 лет со дня рождения А.В. Суворова', date: '13 ноября' },
    { id: 14, title: 'День ракетных войск и артиллерии', date: '19 ноября' },
    { id: 15, title: '255 лет со дня рождения И.Ф. Крузенштерна', date: '19 ноября' }
  ]);

  const { messages, userName, handleSendMessage, clearHistory } = useChat();
  const { isListening, startVoiceRecognition } = useVoiceRecognition((transcript) => {
    setInputMessage(transcript);
  });



  const handleSend = () => {
    handleSendMessage(inputMessage);
    setInputMessage('');
  };



  const schedule = schedulesByClass[selectedClass] || schedulesByClass['5А'];

  const scheduleImages: Record<string, string> = {
    '1Б': 'https://cdn.poehali.dev/files/bdd55cf8-7dae-431b-94ab-cfb3bf103b0d.jpeg',
    '1В': 'https://cdn.poehali.dev/files/8b4ca682-cb27-48f2-9033-fdd63a011ae9.jpeg',
    '1Г': 'https://cdn.poehali.dev/files/bbe96489-5c80-415b-a87d-62f2b0ead6a0.jpeg',
    '1Д': 'https://cdn.poehali.dev/files/8455c65c-69cf-46cf-a07a-9086e9354155.jpeg',
    '1Е': 'https://cdn.poehali.dev/files/349d5bbc-19ee-46d1-a07f-c830f75a254d.jpeg'
  };

  const isFirstToFourthGrade = () => {
    const grade = parseInt(selectedClass.charAt(0));
    return grade >= 1 && grade <= 4;
  };

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
            <TabsTrigger value="events" className="text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-sky-500 data-[state=active]:text-white">
              <Icon name="Calendar" size={20} className="mr-2" />
              Мероприятия
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
            {isFirstToFourthGrade() ? (
              <ScheduleImageView
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                classes={classes}
                scheduleImages={scheduleImages}
              />
            ) : (
              <ScheduleTab
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                schedule={schedule}
                classes={classes}
              />
            )}
          </TabsContent>

          <TabsContent value="events" className="animate-fade-in">
            <NewsTab
              events={events}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;