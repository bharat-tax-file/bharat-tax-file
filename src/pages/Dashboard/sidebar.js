import { FiFileText, FiUser, FiDollarSign, FiSettings } from 'react-icons/fi';

const Sidebar = () => (
  <nav className="w-20 bg-white border-r border-slate-200 p-4 flex-col items-center justify-between hidden lg:flex">
    <div>
      <a href="#" className="bg-blue-600 text-white p-3 rounded-lg block mb-10"><FiFileText size={20} /></a>
      <div className="space-y-6">
        <a href="#" className="text-slate-500 hover:text-blue-600"><FiUser size={20} /></a>
        <a href="#" className="text-slate-500 hover:text-blue-600"><FiDollarSign size={20} /></a>
      </div>
    </div>
    <a href="#" className="text-slate-500 hover:text-blue-600"><FiSettings size={20} /></a>
  </nav>
);

export default Sidebar;
