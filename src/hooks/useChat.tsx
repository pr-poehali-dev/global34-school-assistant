import { useState, useEffect } from 'react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'globert';
  timestamp: Date;
  userName?: string;
}

export const useChat = () => {
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

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('user_name') || '';
  });

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (userName) {
      localStorage.setItem('user_name', userName);
    }
  }, [userName]);

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

  const handleSendMessage = async (inputMessage: string) => {
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
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      userName: userName
    };

    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('https://functions.poehali.dev/6dbbeb29-e040-4809-8d29-70ba1132099b', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage, userName: userName })
      });

      const data = await response.json();
      
      const globertResponse: Message = {
        id: messages.length + 2,
        text: data.reply || getGlobertResponse(inputMessage),
        sender: 'globert',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, globertResponse]);
    } catch (error) {
      console.error('Ошибка:', error);
      const globertResponse: Message = {
        id: messages.length + 2,
        text: `${userName ? `${userName}, ` : ''}извини, пожалуйста, но сейчас у меня проблемы с подключением. Попробуй задать вопрос позже!`,
        sender: 'globert',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, globertResponse]);
    }
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

  return {
    messages,
    userName,
    handleSendMessage,
    clearHistory
  };
};