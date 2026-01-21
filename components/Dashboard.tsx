
import React from 'react';
import { Task, ScheduleEvent } from '../types';

interface DashboardProps {
  tasks: Task[];
  schedule: ScheduleEvent[];
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, schedule }) => {
  const pendingTasks = tasks.filter(t => !t.completed);
  const nextClass = schedule[0]; // Simplified: just showing first for now

  return (
    <div className="space-y-8 animate-fadeIn">
      <header>
        <h1 className="text-3xl font-bold text-slate-800">Welcome back, Alex! 👋</h1>
        <p className="text-slate-500 mt-1">Here's what's happening with your studies today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-indigo-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <i className="fa-solid fa-clock text-xl"></i>
            </div>
            <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full">Next Class</span>
          </div>
          <h3 className="text-2xl font-bold">{nextClass?.title || 'No more classes today'}</h3>
          <p className="text-indigo-100 mt-1 opacity-90">{nextClass?.time} • {nextClass?.room}</p>
          <div className="mt-6 h-1 w-full bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full w-2/3"></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <i className="fa-solid fa-list-check text-xl"></i>
            </div>
            <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Task Progress</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">{tasks.length - pendingTasks.length}/{tasks.length}</h3>
          <p className="text-slate-500 mt-1">Tasks completed this week</p>
          <div className="mt-6 flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map(i => (
              <div key={i} className={`h-8 flex-1 rounded-lg ${i < 5 ? 'bg-emerald-400' : 'bg-slate-100'}`}></div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
              <i className="fa-solid fa-fire text-xl"></i>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Study Streak</span>
          </div>
          <h3 className="text-2xl font-bold text-slate-800">12 Days</h3>
          <p className="text-slate-500 mt-1">Keep it up, you're on a roll!</p>
          <div className="mt-6 flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} className="w-10 h-10 rounded-full border-4 border-white" src={`https://picsum.photos/seed/friend${i}/100/100`} alt="Friend" />
            ))}
            <div className="w-10 h-10 rounded-full bg-slate-100 border-4 border-white flex items-center justify-center text-slate-500 text-xs font-bold">+5</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Upcoming Deadlines</h2>
            <button className="text-indigo-600 font-semibold text-sm hover:underline">View all</button>
          </div>
          <div className="space-y-4">
            {pendingTasks.slice(0, 3).map(task => (
              <div key={task.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  task.priority === 'high' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                }`}>
                  <i className="fa-solid fa-file-lines"></i>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800">{task.title}</h4>
                  <p className="text-xs text-slate-500">{task.subject} • Due {task.dueDate}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-300"></i>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
           <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">Quick Study Session</h2>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold uppercase tracking-wider">AI Recommended</div>
          </div>
          <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
            <h4 className="font-bold text-indigo-900">Review: Operating Systems</h4>
            <p className="text-indigo-700 text-sm mt-1">Based on your recent notes, we recommend reviewing "Process Scheduling" for 15 minutes.</p>
            <button className="mt-6 w-full py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2">
              <i className="fa-solid fa-play"></i>
              Start Session
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
