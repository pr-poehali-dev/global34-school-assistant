import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface NewsItem {
  id: number;
  text: string;
  date: number;
  url: string;
  image?: string;
}

interface NewsTabProps {
  news: NewsItem[];
  isLoadingNews: boolean;
  formatDate: (timestamp: number) => string;
}

const NewsTab = ({ news, isLoadingNews, formatDate }: NewsTabProps) => {
  return (
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
            {news.map((item) => (
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
  );
};

export default NewsTab;
