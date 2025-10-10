import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'globert';
  timestamp: Date;
}

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface NewsItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я Глоберт, твой ИИ-помощник в школе Global 34. Чем могу помочь?',
      sender: 'globert',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [activeDay, setActiveDay] = useState('понедельник');

  const schedule: Record<string, ScheduleItem[]> = {
    понедельник: [
      { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
      { time: '09:25 - 10:10', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
      { time: '10:25 - 11:10', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
      { time: '11:25 - 12:10', subject: 'Физика', teacher: 'Сидоров П.Н.', room: '405' },
      { time: '12:20 - 13:05', subject: 'История', teacher: 'Козлова Е.А.', room: '208' }
    ],
    вторник: [
      { time: '08:30 - 09:15', subject: 'Информатика', teacher: 'Николаев В.С.', room: '301' },
      { time: '09:25 - 10:10', subject: 'Химия', teacher: 'Волкова Н.П.', room: '407' },
      { time: '10:25 - 11:10', subject: 'Литература', teacher: 'Петрова М.В.', room: '305' },
      { time: '11:25 - 12:10', subject: 'География', teacher: 'Морозов Д.И.', room: '215' },
      { time: '12:20 - 13:05', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' }
    ],
    среда: [
      { time: '08:30 - 09:15', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
      { time: '09:25 - 10:10', subject: 'Биология', teacher: 'Соколова Т.М.', room: '310' },
      { time: '10:25 - 11:10', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
      { time: '11:25 - 12:10', subject: 'Обществознание', teacher: 'Козлова Е.А.', room: '208' },
      { time: '12:20 - 13:05', subject: 'Искусство', teacher: 'Белова К.В.', room: '115' }
    ],
    четверг: [
      { time: '08:30 - 09:15', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
      { time: '09:25 - 10:10', subject: 'Физика', teacher: 'Сидоров П.Н.', room: '405' },
      { time: '10:25 - 11:10', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
      { time: '11:25 - 12:10', subject: 'Технология', teacher: 'Громов С.П.', room: '118' },
      { time: '12:20 - 13:05', subject: 'Музыка', teacher: 'Романова Л.Д.', room: '120' }
    ],
    пятница: [
      { time: '08:30 - 09:15', subject: 'Информатика', teacher: 'Николаев В.С.', room: '301' },
      { time: '09:25 - 10:10', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
      { time: '10:25 - 11:10', subject: 'История', teacher: 'Козлова Е.А.', room: '208' },
      { time: '11:25 - 12:10', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' },
      { time: '12:20 - 13:05', subject: 'Классный час', teacher: 'Классный руководитель', room: '201' }
    ]
  };

  const news: NewsItem[] = [
    {
      id: 1,
      title: 'Олимпиада по математике',
      date: '15 октября 2025',
      content: 'Приглашаем всех учеников принять участие в школьной олимпиаде по математике. Регистрация открыта до 20 октября.',
      category: 'Олимпиады'
    },
    {
      id: 2,
      title: 'День открытых дверей',
      date: '12 октября 2025',
      content: '25 октября в нашей школе пройдет День открытых дверей для будущих учеников и их родителей. Начало в 10:00.',
      category: 'События'
    },
    {
      id: 3,
      title: 'Новая библиотека открылась',
      date: '8 октября 2025',
      content: 'В школе открылась обновленная библиотека с современной зоной для чтения и компьютерными местами.',
      category: 'Новости школы'
    },
    {
      id: 4,
      title: 'Спортивные соревнования',
      date: '5 октября 2025',
      content: 'Наша школьная команда по баскетболу заняла первое место в городских соревнованиях! Поздравляем!',
      category: 'Спорт'
    }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);

    setTimeout(() => {
      const globertResponse: Message = {
        id: messages.length + 2,
        text: getGlobertResponse(inputMessage),
        sender: 'globert',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, globertResponse]);
    }, 800);

    setInputMessage('');
  };

  const getGlobertResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('расписание') || lowerQuestion.includes('урок')) {
      return 'Расписание уроков доступно во вкладке "Расписание". Там ты найдешь все уроки на неделю с указанием времени, кабинетов и преподавателей.';
    }
    if (lowerQuestion.includes('домашн') || lowerQuestion.includes('дз')) {
      return 'Домашнее задание можно посмотреть в электронном дневнике или уточнить у преподавателя предмета.';
    }
    if (lowerQuestion.includes('столовая') || lowerQuestion.includes('обед')) {
      return 'Столовая работает с 10:00 до 15:00. Большая перемена для обеда - с 11:10 до 11:25.';
    }
    if (lowerQuestion.includes('библиотека')) {
      return 'Школьная библиотека открыта с 8:00 до 17:00. Находится на 2 этаже, кабинет 205.';
    }
    if (lowerQuestion.includes('кружок') || lowerQuestion.includes('секция')) {
      return 'В школе работают различные кружки: программирование, робототехника, английский клуб, спортивные секции. Расписание можно узнать у завуча.';
    }
    
    return 'Спасибо за вопрос! Я помогу тебе с информацией о школе, расписании уроков, кружках и мероприятиях. Что именно тебя интересует?';
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Олимпиады':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'События':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Спорт':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <header className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Icon name="Bot" className="text-white" size={32} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
              Глоберт
            </h1>
          </div>
          <p className="text-gray-600 text-lg">ИИ-помощник школы Global 34</p>
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
            <Card className="shadow-xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bot" size={24} />
                  Чат с Глобертом
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
                      placeholder="Задай вопрос Глоберту..."
                      className="flex-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
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
          </TabsContent>

          <TabsContent value="schedule" className="animate-fade-in">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calendar" size={24} />
                  Расписание уроков
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                  {Object.keys(schedule).map((day) => (
                    <Button
                      key={day}
                      onClick={() => setActiveDay(day)}
                      variant={activeDay === day ? 'default' : 'outline'}
                      className={`capitalize whitespace-nowrap ${
                        activeDay === day
                          ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white'
                          : 'hover:bg-blue-50'
                      }`}
                    >
                      {day}
                    </Button>
                  ))}
                </div>

                <div className="space-y-3">
                  {schedule[activeDay].map((item, index) => (
                    <Card key={index} className="hover:shadow-md transition-all duration-300 hover-scale border border-gray-200">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                              {index + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-1">
                              <h3 className="font-bold text-lg text-gray-800">{item.subject}</h3>
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                {item.time}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <div className="flex items-center gap-1">
                                <Icon name="User" size={16} className="text-blue-600" />
                                <span>{item.teacher}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Icon name="MapPin" size={16} className="text-blue-600" />
                                <span>Каб. {item.room}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="animate-fade-in">
            <Card className="shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Newspaper" size={24} />
                  Школьные новости
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {news.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-all duration-300 hover-scale border border-gray-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-bold text-xl text-gray-800">{item.title}</h3>
                          <Badge className={`${getCategoryColor(item.category)} border`}>
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3 leading-relaxed">{item.content}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Icon name="Clock" size={16} className="text-blue-600" />
                          <span>{item.date}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
