import { FiPlus, FiLogOut } from 'react-icons/fi';

const Navbar = ({ userName, onLogout }) => (
  <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
    <div>
      <h1 className="text-xl font-bold text-slate-800">Hello, {userName}</h1>
      <p className="text-sm text-slate-500">Here&apos;s the summary of your invoicing activity.</p>
    </div>
    <div className="flex items-center gap-4">
      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 text-sm transition-colors">
        <FiPlus /> New Invoice
      </button>
      <button onClick={onLogout} className="p-2 text-slate-500 rounded-full hover:bg-slate-200"><FiLogOut /></button>
    </div>
  </header>
);

export default Navbar;
