import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { bellSchedule } from '@/data/scheduleData';

interface ScheduleItem {
  time: string;
  subject: string;
  teacher: string;
  room: string;
}

interface ScheduleTabProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  activeDay: string;
  setActiveDay: (value: string) => void;
  schedule: Record<string, ScheduleItem[]>;
  classes: string[];
}

const ScheduleTab = ({
  selectedClass,
  setSelectedClass,
  activeDay,
  setActiveDay,
  schedule,
  classes
}: ScheduleTabProps) => {
  const [showBells, setShowBells] = useState(false);

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            Расписание уроков
          </div>
          <Button
            onClick={() => setShowBells(!showBells)}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <Icon name="Bell" size={16} className="mr-1" />
            {showBells ? 'Скрыть звонки' : 'Расписание звонков'}
          </Button>
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
        ) : (
          <div className="space-y-3">
            {schedule[activeDay]?.map((item, index) => (
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleTab;