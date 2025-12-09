
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const Hero = ({ onLoginClick, onRegisterClick }: HeroProps) => {
  return (
    <section className="relative overflow-hidden pt-32 pb-24 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-[1000px] bg-gradient-to-b from-indigo-50 to-transparent -z-10"></div>
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-700">
              <span className="mr-2">✨</span> 
              Powerful Agile Project Management
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900">
              Transform your <span className="text-indigo-600">agile workflow</span> with Axia
            </h1>
            
            <p className="text-lg text-slate-600 max-w-lg">
              A comprehensive platform designed to streamline your project management process,
              enhance team collaboration, and deliver exceptional results efficiently.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-indigo-600 hover:bg-indigo-700 gap-2"
                onClick={onRegisterClick}
              >
                Get Started
                <ArrowRight size={18} />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-indigo-600 border-indigo-200 hover:bg-indigo-50"
                onClick={() => { document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }) }}
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-slate-500 pt-4">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="h-8 w-8 rounded-full border-2 border-white bg-slate-200"
                  ></div>
                ))}
              </div>
              <p>
                <span className="font-medium text-slate-700">5000+</span> teams already using Axia Agile
              </p>
            </div>
          </div>
          
          <div className="lg:relative animate-blur-in">
            <div className="relative w-full min-h-[400px] sm:min-h-[500px] bg-gradient-to-tr from-white via-slate-100 to-white rounded-lg overflow-hidden border shadow-xl">
              <div className="absolute inset-0 bg-grid-slate-100"></div>
              
              <div className="absolute top-0 left-0 w-full h-full p-6 grid grid-cols-2 grid-rows-2 gap-4">
                <div className="glass col-span-1 row-span-1 rounded-lg p-4 flex flex-col animate-slide-up" style={{ animationDelay: "0.1s" }}>
                  <div className="text-xs font-medium text-indigo-600 mb-2">Sprint Progress</div>
                  <div className="text-sm font-semibold mb-3 text-slate-800">Mobile App Redesign</div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[75%]"></div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">75% completed</div>
                </div>
                
                <div className="glass col-span-1 row-span-1 rounded-lg p-4 flex flex-col animate-slide-up" style={{ animationDelay: "0.2s" }}>
                  <div className="text-xs font-medium text-indigo-600 mb-2">Team Velocity</div>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-3xl font-bold text-slate-800">32</div>
                    <div className="text-sm text-slate-500 ml-2">points/sprint</div>
                  </div>
                </div>
                
                <div className="glass col-span-2 row-span-1 rounded-lg p-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
                  <div className="text-xs font-medium text-indigo-600 mb-2">Sprint Board</div>
                  <div className="grid grid-cols-3 gap-3 mt-2">
                    <div className="bg-slate-100 p-2 rounded">
                      <div className="text-xs font-medium mb-2 text-slate-700">To Do</div>
                      <div className="space-y-2">
                        {[1, 2].map((item) => (
                          <div key={item} className="bg-white p-2 rounded text-xs text-slate-600 shadow-sm">Task #{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                      <div className="text-xs font-medium mb-2 text-slate-700">In Progress</div>
                      <div className="space-y-2">
                        {[3, 4].map((item) => (
                          <div key={item} className="bg-white p-2 rounded text-xs text-slate-600 shadow-sm">Task #{item}</div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                      <div className="text-xs font-medium mb-2 text-slate-700">Done</div>
                      <div className="space-y-2">
                        {[5].map((item) => (
                          <div key={item} className="bg-white p-2 rounded text-xs text-slate-600 shadow-sm">Task #{item}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Demo section anchor */}
      <div id="demo" className="absolute bottom-0"></div>
    </section>
  );
};

export default Hero;
