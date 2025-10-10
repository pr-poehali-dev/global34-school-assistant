import { useState, useEffect, useRef } from 'react';
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
  userName?: string;
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

const Index = () => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
    }
    return [
      {
        id: 1,
        text: 'Привет! Я Глоберт, твой ИИ-помощник в школе Global 34. Как тебя зовут?',
        sender: 'globert',
        timestamp: new Date()
      }
    ];
  });
  const [inputMessage, setInputMessage] = useState('');
  const [activeDay, setActiveDay] = useState('понедельник');
  const [selectedClass, setSelectedClass] = useState('5А');
  const [news, setNews] = useState<NewsItem[]>([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('user_name') || '';
  });
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    fetchVKNews();
  }, []);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('user_name', userName);
    }
  }, [userName]);

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
    } finally {
      setIsLoadingNews(false);
    }
  };

  const startVoiceRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Голосовой ввод не поддерживается в вашем браузере');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ru-RU';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const schedulesByClass: Record<string, Record<string, ScheduleItem[]>> = {
    '5А': {
      понедельник: [
        { time: '08:00 - 08:45', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
        { time: '08:55 - 09:40', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
        { time: '09:50 - 10:35', subject: 'Литература', teacher: 'Петрова М.В.', room: '305' },
        { time: '10:55 - 11:40', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '11:50 - 12:35', subject: 'История', teacher: 'Козлова Е.А.', room: '208' }
      ],
      вторник: [
        { time: '08:00 - 08:45', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' },
        { time: '08:55 - 09:40', subject: 'Биология', teacher: 'Соколова Т.М.', room: '310' },
        { time: '09:50 - 10:35', subject: 'География', teacher: 'Морозов Д.И.', room: '215' },
        { time: '10:55 - 11:40', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
        { time: '11:50 - 12:35', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' }
      ],
      среда: [
        { time: '08:00 - 08:45', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '08:55 - 09:40', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
        { time: '09:50 - 10:35', subject: 'Информатика', teacher: 'Николаев В.С.', room: '301' },
        { time: '10:55 - 11:40', subject: 'Обществознание', teacher: 'Козлова Е.А.', room: '208' },
        { time: '11:50 - 12:35', subject: 'Технология', teacher: 'Громов С.П.', room: '118' }
      ],
      четверг: [
        { time: '08:00 - 08:45', subject: 'Русский язык', teacher: 'Петрова М.В.', room: '305' },
        { time: '08:55 - 09:40', subject: 'Литература', teacher: 'Петрова М.В.', room: '305' },
        { time: '09:50 - 10:35', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
        { time: '10:55 - 11:40', subject: 'Музыка', teacher: 'Романова Л.Д.', room: '120' },
        { time: '11:50 - 12:35', subject: 'ИЗО', teacher: 'Белова К.В.', room: '115' }
      ],
      пятница: [
        { time: '08:00 - 08:45', subject: 'Английский язык', teacher: 'Смирнова О.И.', room: '112' },
        { time: '08:55 - 09:40', subject: 'История', teacher: 'Козлова Е.А.', room: '208' },
        { time: '09:50 - 10:35', subject: 'Физкультура', teacher: 'Федоров А.А.', room: 'Спортзал' },
        { time: '10:55 - 11:40', subject: 'Математика', teacher: 'Иванова А.С.', room: '201' },
        { time: '11:50 - 12:35', subject: 'Классный час', teacher: 'Классный руководитель', room: '201' }
      ]
    }
  };

  const schedule = schedulesByClass[selectedClass] || schedulesByClass['5А'];

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

    if (!userName) {
      setUserName(inputMessage.trim());
      const userMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date(),
        userName: inputMessage.trim()
      };
      setMessages([...messages, userMessage]);
      
      const welcomeMessage: Message = {
        id: messages.length + 2,
        text: `Приятно познакомиться, ${inputMessage.trim()}! Теперь я буду обращаться к тебе по имени. Чем могу помочь?`,
        sender: 'globert',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, welcomeMessage]);
      setInputMessage('');
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      userName: userName
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
        body: JSON.stringify({ message: currentInput, userName: userName })
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

  const classes = [
    '1А', '1Б', '1В', '1Г', '1Д', '1Е', '1Ж',
    '2А', '2Б', '2В', '2Г', '2Д', '2Е',
    '3А', '3Б', '3В', '3Г', '3Д', '3Е',
    '4А', '4Б', '4В', '4Г', '4Д', '4Е',
    '5А', '5Б', '5В', '5Г', '5Д', '5Е',
    '6А', '6Б', '6В', '6Г', '6Д', '6Е',
    '7А', '7Б', '7В', '7Г', '7Д', '7Е',
    '8А', '8Б', '8В', '8Г', '8Д', '8Е',
    '9А', '9Б', '9В', '9Г', '9Д', '9Е',
    '10А', '10Б', '11А', '11Б'
  ];

  const getGlobertResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    const greeting = userName ? `${userName}, ` : '';
    
    if (lowerQuestion.includes('расписание') || lowerQuestion.includes('урок')) {
      return `${greeting}расписание уроков доступно во вкладке "Расписание". Там ты найдешь все уроки на неделю с указанием времени, кабинетов и преподавателей.`;
    }
    if (lowerQuestion.includes('домашн') || lowerQuestion.includes('дз')) {
      return `${greeting}домашнее задание можно посмотреть в электронном дневнике или уточнить у преподавателя предмета.`;
    }
    if (lowerQuestion.includes('столовая') || lowerQuestion.includes('обед')) {
      return `${greeting}столовая работает с 10:00 до 15:00. Большая перемена для обеда - с 10:35 до 10:55.`;
    }
    if (lowerQuestion.includes('библиотека')) {
      return `${greeting}школьная библиотека открыта с 8:00 до 17:00. Находится на 2 этаже, кабинет 205.`;
    }
    if (lowerQuestion.includes('кружок') || lowerQuestion.includes('секция')) {
      return `${greeting}в школе работают различные кружки: программирование, робототехника, английский клуб, спортивные секции. Расписание можно узнать у завуча.`;
    }
    
    return `${greeting}спасибо за вопрос! Я помогу тебе с информацией о школе, расписании уроков, кружках и мероприятиях. Что именно тебя интересует?`;
  };

  const clearHistory = () => {
    if (confirm('Очистить историю чата?')) {
      localStorage.removeItem('chat_history');
      localStorage.removeItem('user_name');
      setUserName('');
      setMessages([{
        id: 1,
        text: 'Привет! Я Глоберт, твой ИИ-помощник в школе Global 34. Как тебя зовут?',
        sender: 'globert',
        timestamp: new Date()
      }]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-blue-100 flex">
      <div className="w-1/3 min-h-screen bg-gradient-to-b from-blue-600 to-sky-500 flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-700"></div>
        </div>
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="transition-all duration-200">
            <img 
              src="https://cdn.poehali.dev/files/02c3f99f-1b97-42f4-9400-d56b4033d447.png" 
              alt="Глоберт" 
              className="w-[500px] h-[500px] object-contain drop-shadow-2xl"
            />
          </div>
          <div className="mt-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-2">Глоберт</h2>
            <p className="text-white/90 text-xl">Твой ИИ-помощник</p>
            {userName && (
              <p className="text-white/80 text-lg mt-2">Рад помочь, {userName}!</p>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 md:p-6">
        <header className="mb-6 text-center animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-24 h-24 flex items-center justify-center">
              <img 
                src="https://cdn.poehali.dev/files/a62bbaa2-f9d9-45cf-bc85-68c09311e8f1.png" 
                alt="Логотип Global 34" 
                className="w-full h-full object-contain"
                style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
                Школа Global 34
              </h1>
              <p className="text-gray-600 text-lg mt-1">Умная платформа для учеников</p>
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
                  <div className="grid grid-cols-7 gap-2 mb-6">
                    {classes.map((cls) => (
                      <Button
                        key={cls}
                        onClick={() => setSelectedClass(cls)}
                        variant={selectedClass === cls ? 'default' : 'outline'}
                        className={`h-10 text-sm ${selectedClass === cls ? 'bg-gradient-to-r from-blue-600 to-sky-500 text-white' : 'hover:bg-blue-50'}`}
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
                {isLoadingNews ? (
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
