import React, { useState, useEffect, useMemo } from "react";
import {
  FiMenu,
  FiHome,
  FiFileText,
  FiUsers,
  FiSettings,
  FiSearch,
  FiChevronDown,
  FiLogOut,
  FiCheckCircle,
  FiClock,
  FiAlertCircle,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import CountUp from "react-countup";

const invoicesData = [
  {
    id: "INV-001",
    customer: "John Doe",
    date: "2025-06-28",
    dueDate: "2025-07-10",
    amount: 250.0,
    status: "Paid",
  },
  {
    id: "INV-002",
    customer: "Jane Smith",
    date: "2025-07-01",
    dueDate: "2025-07-15",
    amount: 400.5,
    status: "Due",
  },
  {
    id: "INV-003",
    customer: "Acme Corp",
    date: "2025-07-02",
    dueDate: "2025-07-20",
    amount: 1200.0,
    status: "Overdue",
  },
  {
    id: "INV-004",
    customer: "Alice Johnson",
    date: "2025-07-03",
    dueDate: "2025-07-22",
    amount: 550.25,
    status: "Paid",
  },
  {
    id: "INV-005",
    customer: "Globex Corp",
    date: "2025-07-05",
    dueDate: "2025-07-25",
    amount: 1500,
    status: "Due",
  },
];

const statusStyles = {
  Paid: "bg-green-100 text-green-700",
  Due: "bg-yellow-100 text-yellow-700",
  Overdue: "bg-red-100 text-red-700",
};

const statusIcons = {
  Paid: <FiCheckCircle className="inline mr-1" />,
  Due: <FiClock className="inline mr-1" />,
  Overdue: <FiAlertCircle className="inline mr-1" />,
};

const navItems = [
  { name: "Dashboard", icon: <FiHome />, key: "dashboard" },
  { name: "Invoices", icon: <FiFileText />, key: "invoices" },
  { name: "Customers", icon: <FiUsers />, key: "customers" },
  { name: "Settings", icon: <FiSettings />, key: "settings" },
];

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("dashboard");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle dark mode class on body
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  // Filter invoices by search
  const filteredInvoices = useMemo(() => {
    const s = search.toLowerCase();
    return invoicesData.filter(
      (inv) =>
        inv.id.toLowerCase().includes(s) ||
        inv.customer.toLowerCase().includes(s) ||
        inv.status.toLowerCase().includes(s)
    );
  }, [search]);

  // Calculate summary counts
  const summary = {
    total: invoicesData.length,
    paid: invoicesData.filter((i) => i.status === "Paid").length,
    due: invoicesData.filter((i) => i.status === "Due").length,
    overdue: invoicesData.filter((i) => i.status === "Overdue").length,
  };

  return (
    <div className={`flex h-screen font-sans ${darkMode ? "dark bg-gray-900" : "bg-gray-50"}`}>
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-width duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-700">
          <h1
            className={`text-2xl font-bold text-green-600 dark:text-green-400 transition-opacity duration-300 ${
              sidebarOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            InvoicePro
          </h1>
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-green-600"
          >
            <FiMenu size={24} />
          </button>
        </div>
        <nav className="flex flex-col flex-grow mt-4 space-y-1 px-1">
          {navItems.map(({ name, icon, key }) => (
            <button
              key={key}
              onClick={() => setActiveNav(key)}
              className={`group flex items-center gap-3 rounded-md py-3 px-3 mx-2 transition-colors
              ${
                activeNav === key
                  ? "bg-green-100 text-green-700 dark:bg-green-700 dark:text-green-300"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-600 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
              aria-current={activeNav === key ? "page" : undefined}
            >
              <span className="text-xl">{icon}</span>
              <span
                className={`whitespace-nowrap overflow-hidden ${
                  sidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0"
                } transition-all duration-300`}
              >
                {name}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Top Navbar */}
        <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-4 w-1/2 max-w-lg">
            <div className="relative w-full">
              <input
                type="search"
                placeholder="Search invoices, customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 pl-10 text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white dark:bg-gray-700"
              />
              <FiSearch className="absolute left-3 top-2.5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <button
              aria-label="Toggle dark mode"
              onClick={() => setDarkMode(!darkMode)}
              className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400"
            >
              {darkMode ? <FiSun size={22} /> : <FiMoon size={22} />}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                className="flex items-center gap-2 rounded-full border border-gray-300 dark:border-gray-600 px-3 py-1 bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <span className="text-gray-700 dark:text-gray-200 font-semibold">
                  John Customer
                </span>
                <FiChevronDown
                  className={`transition-transform duration-200 ${
                    profileMenuOpen ? "rotate-180" : ""
                  } text-gray-700 dark:text-gray-200`}
                />
              </button>

              {profileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                  role="menu"
                >
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-green-100 dark:hover:bg-green-600"
                    role="menuitem"
                    onClick={() => alert("Logout clicked")}
                  >
                    <FiLogOut className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-8 overflow-auto flex-grow">
          {/* Summary Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <SummaryCard title="Total Invoices" value={summary.total} color="bg-green-600" icon={<FiFileText />} />
            <SummaryCard title="Paid" value={summary.paid} color="bg-blue-600" icon={<FiCheckCircle />} />
            <SummaryCard title="Due" value={summary.due} color="bg-yellow-500" icon={<FiClock />} />
            <SummaryCard title="Overdue" value={summary.overdue} color="bg-red-600" icon={<FiAlertCircle />} />
          </section>

          {/* Invoices Table */}
          <section className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
              Recent Invoices
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left table-fixed border-collapse">
                <thead>
                  <tr className="border-b border-gray-300 dark:border-gray-700">
                    <th className="py-3 px-4 w-32 text-gray-600 dark:text-gray-300">Invoice ID</th>
                    <th className="py-3 px-4 text-gray-600 dark:text-gray-300">Customer</th>
                    <th className="py-3 px-4 w-36 text-gray-600 dark:text-gray-300">Date</th>
                    <th className="py-3 px-4 w-36 text-gray-600 dark:text-gray-300">Due Date</th>
                    <th className="py-3 px-4 w-32 text-right text-gray-600 dark:text-gray-300">Amount (₹)</th>
                    <th className="py-3 px-4 w-32 text-center text-gray-600 dark:text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInvoices.length > 0 ? (
                    filteredInvoices.map(({ id, customer, date, dueDate, amount, status }) => (
                      <tr
                        key={id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-200 dark:border-gray-700"
                      >
                        <td className="py-3 px-4 font-mono text-sm text-gray-700 dark:text-gray-300">{id}</td>
                        <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{customer}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{date}</td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-400">{dueDate}</td>
                        <td className="py-3 px-4 font-semibold text-gray-800 dark:text-gray-100 text-right">
                          {amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[status]}`}
                          >
                            {statusIcons[status]}
                            {status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="py-4 text-center text-gray-500 dark:text-gray-400">
                        No invoices found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color, icon }) {
  return (
    <div
      className={`flex items-center gap-4 rounded-lg shadow-lg text-white p-6 ${color}`}
      style={{ minHeight: "120px" }}
    >
      <div className="text-4xl">{icon}</div>
      <div>
        <div className="text-sm opacity-90">{title}</div>
        <CountUp
          end={value}
          duration={1.5}
          separator=","
          className="text-3xl font-bold"
        />
      </div>
    </div>
  );
}
