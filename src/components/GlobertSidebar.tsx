interface GlobertSidebarProps {
  userName?: string;
}

const GlobertSidebar = ({ userName }: GlobertSidebarProps) => {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-blue-600 to-sky-500 flex items-center justify-center overflow-hidden z-0">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-white rounded-full animate-pulse delay-700"></div>
      </div>
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="transition-all duration-200">
          <img 
            src="https://cdn.poehali.dev/files/02c3f99f-1b97-42f4-9400-d56b4033d447.png" 
            alt="Глоберт" 
            className="w-[600px] h-[600px] object-contain drop-shadow-2xl"
          />
        </div>
        <div className="mt-8 text-center">
          <h2 className="text-5xl font-bold text-white mb-2">Глоберт</h2>
          <p className="text-white/90 text-2xl">Твой ИИ-помощник</p>
          {userName && (
            <p className="text-white/80 text-xl mt-2">Рад помочь, {userName}!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobertSidebar;