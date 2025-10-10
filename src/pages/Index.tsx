import { useState, useEffect } from 'react';
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
  text: string;
  date: number;
  url: string;
  image?: string;
}

interface VKPost {
  id: number;
  text: string;
  date: number;
  url: string;
  image: string;
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
  const [selectedClass, setSelectedClass] = useState('5');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);

  useEffect(() => {
    setIsLoadingNews(false);
  }, []);

  const schedulesByClass: Record<string, Record<string, ScheduleItem[]>> = {
    '5': {
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
    ],
    },
    '9': {
      понедельник: [
        { time: '08:30 - 09:15', subject: 'Алгебра', teacher: 'Кузнецова М.И.', room: '301' },
        { time: '09:25 - 10:10', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
        { time: '10:25 - 11:10', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '11:25 - 12:10', subject: 'Физика', teacher: 'Сидоров П.Н.', room: '405' },
        { time: '12:20 - 13:05', subject: 'История', teacher: 'Козлова Е.А.', room: '208' },
        { time: '13:15 - 14:00', subject: 'География', teacher: 'Морозов Д.И.', room: '215' }
      ],
      вторник: [
        { time: '08:30 - 09:15', subject: 'Информатика', teacher: 'Николаев В.С.', room: '301' },
        { time: '09:25 - 10:10', subject: 'Химия', teacher: 'Волкова Н.П.', room: '407' },
        { time: '10:25 - 11:10', subject: 'Литература', teacher: 'Петрова М.В.', room: '305' },
        { time: '11:25 - 12:10', subject: 'Геометрия', teacher: 'Кузнецова М.И.', room: '301' },
        { time: '12:20 - 13:05', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' },
        { time: '13:15 - 14:00', subject: 'Обществознание', teacher: 'Козлова Е.А.', room: '208' }
      ],
      среда: [
        { time: '08:30 - 09:15', subject: 'Алгебра', teacher: 'Кузнецова М.И.', room: '301' },
        { time: '09:25 - 10:10', subject: 'Биология', teacher: 'Соколова Т.М.', room: '310' },
        { time: '10:25 - 11:10', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '11:25 - 12:10', subject: 'Физика', teacher: 'Сидоров П.Н.', room: '405' },
        { time: '12:20 - 13:05', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
        { time: '13:15 - 14:00', subject: 'ОБЖ', teacher: 'Григорьев И.П.', room: '120' }
      ],
      четверг: [
        { time: '08:30 - 09:15', subject: 'Геометрия', teacher: 'Кузнецова М.И.', room: '301' },
        { time: '09:25 - 10:10', subject: 'Физика', teacher: 'Сидоров П.Н.', room: '405' },
        { time: '10:25 - 11:10', subject: 'История', teacher: 'Козлова Е.А.', room: '208' },
        { time: '11:25 - 12:10', subject: 'Химия', teacher: 'Волкова Н.П.', room: '407' },
        { time: '12:20 - 13:05', subject: 'Литература', teacher: 'Петрова М.В.', room: '305' },
        { time: '13:15 - 14:00', subject: 'Информатика', teacher: 'Николаев В.С.', room: '301' }
      ],
      пятница: [
        { time: '08:30 - 09:15', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '09:25 - 10:10', subject: 'Биология', teacher: 'Соколова Т.М.', room: '310' },
        { time: '10:25 - 11:10', subject: 'Алгебра', teacher: 'Кузнецова М.И.', room: '301' },
        { time: '11:25 - 12:10', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' },
        { time: '12:20 - 13:05', subject: 'Обществознание', teacher: 'Козлова Е.А.', room: '208' },
        { time: '13:15 - 14:00', subject: 'Классный час', teacher: 'Классный руководитель', room: '301' }
      ]
    }
  };

  const schedule = schedulesByClass[selectedClass] || schedulesByClass['5'];

  const mockNews: NewsItem[] = [
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
  ];

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    const currentInput = inputMessage;
    setMessages([...messages, userMessage]);
    setInputMessage('');

    try {
      const response = await fetch('https://functions.poehali.dev/6dbbeb29-e040-4809-8d29-70ba1132099b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentInput })
      });

      const data = await response.json();
      
      const globertResponse: Message = {
        id: messages.length + 2,
        text: data.reply || getGlobertResponse(currentInput),
        sender: 'globert',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, globertResponse]);
    } catch (error) {
      console.error('Ошибка:', error);
      const globertResponse: Message = {
        id: messages.length + 2,
        text: getGlobertResponse(currentInput),
        sender: 'globert',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, globertResponse]);
    }
  };

  const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const displayNews = news.length > 0 ? news : mockNews;

  const classes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        <header className="mb-8 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-2">
            <img 
              src="https://cdn.poehali.dev/files/02c3f99f-1b97-42f4-9400-d56b4033d447.png" 
              alt="Глоберт" 
              className="w-24 h-24 object-contain"
            />
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Глоберт
              </h1>
              <p className="text-gray-600 text-lg">ИИ-помощник школы Global 34</p>
            </div>
          </div>
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
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Выберите класс:</label>
                  <div className="grid grid-cols-6 md:grid-cols-11 gap-2 mb-6">
                    {classes.map((cls) => (
                      <Button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        variant={selectedClass === cls ? 'default' : 'outline'}
                        className={`h-12 ${selectedClass === cls ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white' : 'hover:bg-blue-50'}`}
                      >
                        {cls}
                      </Button>
                    ))}
                  </div>
                </div>

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
                {isLoadingNews && news.length === 0 ? (
                  <div className="text-center py-8">
                    <Icon name="Loader2" className="animate-spin mx-auto text-blue-600" size={32} />
                    <p className="text-gray-600 mt-2">Загрузка новостей...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {displayNews.map((item) => (
                      <Card key={item.id} className="hover:shadow-md transition-all duration-300 hover-scale border border-gray-200">
                        <CardContent className="p-5">
                          <div className="flex gap-4">
                            {item.image && (
                              <img 
                                src={item.image} 
                                alt="Новость" 
                                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                              />
                            )}
                            <div className="flex-1">
                              <p className="text-gray-700 mb-3 leading-relaxed">{item.text}</p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                  <Icon name="Clock" size={16} className="text-blue-600" />
                                  <span>{formatDate(item.date)}</span>
                                </div>
                                <a 
                                  href={item.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
                                >
                                  Читать в VK
                                  <Icon name="ExternalLink" size={14} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;