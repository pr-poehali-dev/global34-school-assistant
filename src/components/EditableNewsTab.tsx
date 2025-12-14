import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface EventItem {
  id: number;
  title: string;
  date: string;
}

interface EditableNewsTabProps {
  events: EventItem[];
  setEvents: (events: EventItem[]) => void;
}

const EditableNewsTab = ({ events, setEvents }: EditableNewsTabProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; date: string }>({ title: '', date: '' });

  const handlePasswordSubmit = () => {
    if (password === 'qwer1234') {
      setIsEditMode(true);
      setPassword('');
    } else {
      alert('Неверный пароль');
      setPassword('');
    }
  };

  const handleEditClick = (event: EventItem) => {
    setEditingEvent(event);
    setEditForm({ title: event.title, date: event.date });
  };

  const handleSaveEdit = () => {
    if (editingEvent) {
      const updatedEvents = events.map(e => 
        e.id === editingEvent.id 
          ? { ...e, title: editForm.title, date: editForm.date }
          : e
      );
      setEvents(updatedEvents);
      localStorage.setItem('edited_events', JSON.stringify(updatedEvents));
      setEditingEvent(null);
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            Школьные мероприятия
          </div>
          {!isEditMode ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                  <Icon name="Lock" size={16} className="mr-1" />
                  Режим редактирования
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Введите пароль</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit()}
                  />
                  <Button onClick={handlePasswordSubmit} className="w-full">
                    Войти
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              onClick={() => setIsEditMode(false)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Unlock" size={16} className="mr-1" />
              Выйти из редактирования
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {events.map((event) => (
            <Card 
              key={event.id} 
              className={`hover:shadow-md transition-all duration-300 border border-gray-200 ${isEditMode ? 'cursor-pointer hover:border-blue-400' : ''}`}
              onClick={() => isEditMode && handleEditClick(event)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center shadow-md">
                      <Icon name="CalendarDays" size={28} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800 mb-1">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Icon name="Clock" size={16} className="text-blue-600" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                  </div>
                  {isEditMode && (
                    <Icon name="Edit" size={20} className="text-blue-600" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>

      {editingEvent && (
        <Dialog open={!!editingEvent} onOpenChange={() => setEditingEvent(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать мероприятие</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Название</label>
                <Input
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  placeholder="День учителя"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Дата</label>
                <Input
                  value={editForm.date}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  placeholder="5 октября"
                />
              </div>
              <Button onClick={handleSaveEdit} className="w-full">
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default EditableNewsTab;
