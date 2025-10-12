import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface ScheduleImageViewProps {
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  classes: string[];
  scheduleImages: Record<string, string>;
}

const ScheduleImageView = ({
  selectedClass,
  setSelectedClass,
  classes,
  scheduleImages
}: ScheduleImageViewProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const firstToFourthClasses = classes.filter(cls => {
    const grade = parseInt(cls.charAt(0));
    return grade >= 1 && grade <= 4;
  });
  const hasImage = Boolean(scheduleImages[selectedClass]);

  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Calendar" size={24} />
            Расписание уроков
          </div>
          <div className="text-2xl font-bold">{selectedClass}</div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">Выберите класс (1-4):</label>
          <div className="grid grid-cols-7 gap-2 mb-6">
            {firstToFourthClasses.map((cls) => (
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

        {hasImage ? (
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
        ) : (
          <div className="text-center py-12 text-gray-500">
            <Icon name="ImageOff" size={48} className="mx-auto mb-4 text-gray-400" />
            <p>Расписание для класса {selectedClass} пока не добавлено</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ScheduleImageView;