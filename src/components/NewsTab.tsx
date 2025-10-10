import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface EventItem {
  id: number;
  title: string;
  date: string;
}

interface NewsTabProps {
  events: EventItem[];
}

const NewsTab = ({ events }: NewsTabProps) => {
  return (
    <Card className="shadow-xl border-0">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-sky-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Icon name="Calendar" size={24} />
          Школьные мероприятия
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-3">
          {events.map((event) => (
            <Card key={event.id} className="hover:shadow-md transition-all duration-300 hover-scale border border-gray-200">
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
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsTab;
