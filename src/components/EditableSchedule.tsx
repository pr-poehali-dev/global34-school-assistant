import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { bellSchedule } from '@/data/scheduleData';

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface EditableScheduleProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classes: string[];
  scheduleImages: Record<string, string>;
  schedule: Record<string, ScheduleItem[]>;
  activeDay: string;
  setActiveDay: (value: string) => void;
}

const EditableSchedule = ({
  selectedClass,
  setSelectedClass,
  classes,
  scheduleImages,
  schedule,
  activeDay,
  setActiveDay
}: EditableScheduleProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showBells, setShowBells] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [password, setPassword] = useState('');
  const [editingItem, setEditingItem] = useState<{ day: string; index: number } | null>(null);
  const [editForm, setEditForm] = useState<ScheduleItem>({ time: '', subject: '', teacher: '', room: '' });
  
  const hasImage = Boolean(scheduleImages[selectedClass]);

  const handlePasswordSubmit = () => {
    if (password === 'qwer1234') {
      setIsEditMode(true);
      setPassword('');
    } else {
      alert('Неверный пароль');
      setPassword('');
    }
  };

  const handleEditClick = (day: string, index: number, item: ScheduleItem) => {
    setEditingItem({ day, index });
    setEditForm({ ...item });
  };

  const handleSaveEdit = () => {
    if (editingItem) {
      const newSchedule = { ...schedule };
      newSchedule[editingItem.day][editingItem.index] = { ...editForm };
      localStorage.setItem('edited_schedule', JSON.stringify(newSchedule));
      setEditingItem(null);
      window.location.reload();
    }
  };

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            Расписание уроков
          </div>
          <div className="flex items-center gap-4">
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
            <Button
              onClick={() => setShowBells(!showBells)}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <Icon name="Bell" size={16} className="mr-1" />
              {showBells ? 'Скрыть звонки' : 'Расписание звонков'}
            </Button>
            <div className="text-2xl font-bold">{selectedClass}</div>
          </div>
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

        {showBells ? (
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Расписание звонков</h3>
            {bellSchedule.map((bell) => (
              <Card key={bell.lesson} className="border border-gray-200">
                <CardContent className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-sky-500 rounded-lg flex items-center justify-center text-white font-bold">
                        {bell.lesson}
                      </div>
                      <span className="font-semibold text-gray-700">{bell.time}</span>
                    </div>
                    {bell.break && (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Перемена {bell.break}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : hasImage ? (
          <>
            <div className="flex justify-center">
              <img 
                src={scheduleImages[selectedClass]} 
                alt={`Расписание ${selectedClass}`}
                className="max-w-full h-auto rounded-lg shadow-lg cursor-pointer hover:opacity-90 transition-opacity"
                onClick={() => setIsFullscreen(true)}
              />
            </div>
            
            {isFullscreen && (
              <div 
                className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
                onClick={() => setIsFullscreen(false)}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-4 right-4 text-white hover:bg-white/20 w-12 h-12"
                  onClick={() => setIsFullscreen(false)}
                >
                  <Icon name="X" size={24} />
                </Button>
                <img 
                  src={scheduleImages[selectedClass]} 
                  alt={`Расписание ${selectedClass}`}
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            )}
          </>
        ) : schedule && Object.keys(schedule).length > 0 ? (
          <>
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
              {schedule[activeDay]?.map((item, index) => (
                <Card 
                  key={index} 
                  className={`hover:shadow-md transition-all duration-300 border border-gray-200 ${isEditMode ? 'cursor-pointer hover:border-blue-400' : ''}`}
                  onClick={() => isEditMode && handleEditClick(activeDay, index, item)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-sky-500 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-bold text-lg text-gray-800">{item.subject || '—'}</h3>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                            {item.time}
                          </Badge>
                        </div>
                        {item.subject && (
                          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                            {item.teacher && (
                              <div className="flex items-center gap-1">
                                <Icon name="User" size={16} className="text-blue-600" />
                                <span>{item.teacher}</span>
                              </div>
                            )}
                            {item.room && (
                              <div className="flex items-center gap-1">
                                <Icon name="MapPin" size={16} className="text-blue-600" />
                                <span>Каб. {item.room}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      {isEditMode && (
                        <Icon name="Edit" size={20} className="text-blue-600" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Icon name="ImageOff" size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Расписание для класса {selectedClass} пока не добавлено</p>
          </div>
        )}
      </CardContent>

      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Редактировать урок</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Время</label>
                <Input
                  value={editForm.time}
                  onChange={(e) => setEditForm({ ...editForm, time: e.target.value })}
                  placeholder="08:30 - 09:10"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Предмет</label>
                <Input
                  value={editForm.subject}
                  onChange={(e) => setEditForm({ ...editForm, subject: e.target.value })}
                  placeholder="Математика"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Учитель</label>
                <Input
                  value={editForm.teacher}
                  onChange={(e) => setEditForm({ ...editForm, teacher: e.target.value })}
                  placeholder="Иванов И.И."
                />
              </div>
              <div>
                <label className="text-sm font-medium">Кабинет</label>
                <Input
                  value={editForm.room}
                  onChange={(e) => setEditForm({ ...editForm, room: e.target.value })}
                  placeholder="205"
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

export default EditableSchedule;
