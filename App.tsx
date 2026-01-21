
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudyBuddy from './components/StudyBuddy';
import FlashcardGen from './components/FlashcardGen';
import { AppTab, Task, ScheduleEvent } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DASHBOARD);
  
  // Initial Mock Data
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Calculus Assignment 4', subject: 'Mathematics', dueDate: 'Tomorrow', completed: false, priority: 'high' },
    { id: '2', title: 'History Essay Draft', subject: 'History', dueDate: 'Friday', completed: false, priority: 'medium' },
    { id: '3', title: 'Quiz Review: Cellular Biology', subject: 'Biology', dueDate: 'In 2 days', completed: true, priority: 'high' },
    { id: '4', title: 'Lab Report: pH levels', subject: 'Chemistry', dueDate: 'Monday', completed: false, priority: 'low' },
  ]);

  const [schedule, setSchedule] = useState<ScheduleEvent[]>([
    { id: '1', day: 'Monday', title: 'Data Structures', time: '10:00 AM - 11:30 AM', room: 'Hall B', subject: 'CS201' },
    { id: '2', day: 'Monday', title: 'Intro to Philosophy', time: '1:00 PM - 2:30 PM', room: 'Room 402', subject: 'PHI101' },
    { id: '3', day: 'Tuesday', title: 'Algorithms Lab', time: '9:00 AM - 12:00 PM', room: 'Computer Lab 1', subject: 'CS202' },
  ]);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case AppTab.DASHBOARD:
        return <Dashboard tasks={tasks} schedule={schedule} />;
      case AppTab.STUDY_BUDDY:
        return <StudyBuddy />;
      case AppTab.FLASHCARDS:
        return <FlashcardGen />;
      case AppTab.TASKS:
        return (
          <div className="space-y-6 animate-fadeIn">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Assignment Tracker</h1>
                <p className="text-slate-500">Manage your deadlines and projects.</p>
              </div>
              <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 shadow-lg shadow-indigo-100">
                <i className="fa-solid fa-plus"></i>
                New Task
              </button>
            </header>
            <div className="grid grid-cols-1 gap-4">
              {tasks.map(task => (
                <div key={task.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => toggleTask(task.id)}
                      className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all ${
                        task.completed ? 'bg-indigo-600 border-indigo-600 text-white' : 'border-slate-200 text-transparent hover:border-indigo-300'
                      }`}
                    >
                      <i className="fa-solid fa-check text-xs"></i>
                    </button>
                    <div>
                      <h4 className={`font-bold text-lg ${task.completed ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                        {task.title}
                      </h4>
                      <p className="text-sm text-slate-500">{task.subject} • Due {task.dueDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      task.priority === 'high' ? 'bg-rose-50 text-rose-600' : task.priority === 'medium' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-600'
                    }`}>
                      {task.priority}
                    </span>
                    <button className="text-slate-300 hover:text-slate-600"><i className="fa-solid fa-ellipsis"></i></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case AppTab.SCHEDULE:
        return (
          <div className="space-y-6 animate-fadeIn">
            <header>
              <h1 className="text-3xl font-bold text-slate-800">Weekly Schedule</h1>
              <p className="text-slate-500">Your academic timetable at a glance.</p>
            </header>
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm overflow-x-auto">
              <div className="min-w-[800px]">
                <div className="grid grid-cols-6 border-b border-slate-100 pb-4 mb-4">
                  <div className="font-bold text-slate-400">Time</div>
                  <div className="font-bold text-slate-800">Monday</div>
                  <div className="font-bold text-slate-800">Tuesday</div>
                  <div className="font-bold text-slate-800">Wednesday</div>
                  <div className="font-bold text-slate-800">Thursday</div>
                  <div className="font-bold text-slate-800">Friday</div>
                </div>
                {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00'].map(time => (
                  <div key={time} className="grid grid-cols-6 py-4 border-b border-slate-50 min-h-[80px]">
                    <div className="text-xs font-medium text-slate-400">{time}</div>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                      const event = schedule.find(e => e.day === day && e.time.startsWith(time));
                      return (
                        <div key={day} className="px-2">
                          {event && (
                            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-2 rounded-lg text-xs">
                              <p className="font-bold text-indigo-900">{event.title}</p>
                              <p className="text-indigo-700">{event.room}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard tasks={tasks} schedule={schedule} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 md:ml-64 p-4 md:p-8 lg:p-12 pb-24 md:pb-8 max-w-7xl mx-auto w-full transition-all">
        {renderTabContent()}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 px-6 py-3 flex justify-between items-center z-50">
        <button onClick={() => setActiveTab(AppTab.DASHBOARD)} className={`flex flex-col items-center gap-1 ${activeTab === AppTab.DASHBOARD ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-house"></i>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.TASKS)} className={`flex flex-col items-center gap-1 ${activeTab === AppTab.TASKS ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-check-double"></i>
          <span className="text-[10px]">Tasks</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.STUDY_BUDDY)} className={`flex flex-col items-center gap-1 ${activeTab === AppTab.STUDY_BUDDY ? 'text-indigo-600' : 'text-slate-400'}`}>
          <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center -mt-8 shadow-lg shadow-indigo-200">
            <i className="fa-solid fa-robot"></i>
          </div>
          <span className="text-[10px]">Tutor</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.FLASHCARDS)} className={`flex flex-col items-center gap-1 ${activeTab === AppTab.FLASHCARDS ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-layer-group"></i>
          <span className="text-[10px]">Cards</span>
        </button>
        <button onClick={() => setActiveTab(AppTab.SCHEDULE)} className={`flex flex-col items-center gap-1 ${activeTab === AppTab.SCHEDULE ? 'text-indigo-600' : 'text-slate-400'}`}>
          <i className="fa-solid fa-calendar-days"></i>
          <span className="text-[10px]">Calendar</span>
        </button>
      </nav>
    </div>
  );
};

export default App;
