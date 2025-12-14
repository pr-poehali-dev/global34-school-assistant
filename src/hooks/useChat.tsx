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
    return [];
  });

  const [userName, setUserName] = useState<string>(() => {
    return localStorage.getItem('user_name') || '';
  });

  const [isTyping, setIsTyping] = useState(false);

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
    
    if (lowerQuestion.includes('расписание') || lowerQuestion.includes('урок')) {
      return 'Расписание уроков доступно во вкладке "Расписание".';
    }
    if (lowerQuestion.includes('домашн') || lowerQuestion.includes('дз')) {
      return 'Домашнее задание можно посмотреть в электронном дневнике.';
    }
    if (lowerQuestion.includes('столовая') || lowerQuestion.includes('обед')) {
      return 'Столовая работает с 10:00 до 15:00. Большая перемена для обеда - с 10:35 до 10:55.';
    }
    if (lowerQuestion.includes('библиотека')) {
      return 'Школьная библиотека открыта с 8:00 до 17:00. Находится на 2 этаже, кабинет 205.';
    }
    if (lowerQuestion.includes('кружок') || lowerQuestion.includes('секция')) {
      return 'В школе работают различные кружки: программирование, робототехника, английский клуб, спортивные секции.';
    }
    
    return 'Я помогу с информацией о школе №34 города Липецка.';
  };

  const handleSendMessage = async (inputMessage: string) => {
    if (!inputMessage.trim()) return;



    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setIsTyping(true);

    try {
      const recentMessages = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text
      }));

      const response = await fetch('https://functions.poehali.dev/1386c7ff-146f-4053-b3ce-cd5539a1d521', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [
            ...recentMessages,
            { role: 'user', content: inputMessage }
          ],
          userName: ''
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.response || getGlobertResponse(inputMessage);
        
        const globertResponse: Message = {
          id: messages.length + 2,
          text: aiResponse,
          sender: 'globert',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, globertResponse]);
      } else {
        throw new Error('API error');
      }
    } catch (error) {
      const fallbackResponse: Message = {
        id: messages.length + 2,
        text: getGlobertResponse(inputMessage),
        sender: 'globert',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearHistory = () => {
    if (confirm('Очистить историю чата?')) {
      localStorage.removeItem('chat_history');
      localStorage.removeItem('user_name');
      setUserName('');
      setMessages([]);
    }
  };

  return {
    messages,
    userName,
    handleSendMessage,
    clearHistory,
    isTyping
  };
};