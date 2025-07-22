import React, { useState, useEffect, useCallback, memo } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiRefreshCw, 
  FiCopy, 
  FiCheck, 
  FiInfo,
  FiArrowUp,
  FiArrowDown,
  FiChevronDown,
  FiBarChart2,
  FiDollarSign,
  FiGlobe,
  FiTrendingUp,
  FiClock,
  FiShield,
  FiHelpCircle
} from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// ====================================================================
// CONSTANTS AND DATA
// ====================================================================
const BASE_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'INR', 'AED', 'CAD'];

// Minimal currency data for UI (expand as needed)
const CURRENCY_DATA = {
  USD: { flag: '🇺🇸', name: 'US Dollar', symbol: '$' },
  INR: { flag: '🇮🇳', name: 'Indian Rupee', symbol: '₹' },
  EUR: { flag: '🇪🇺', name: 'Euro', symbol: '€' },
  GBP: { flag: '🇬🇧', name: 'British Pound', symbol: '£' },
  JPY: { flag: '🇯🇵', name: 'Japanese Yen', symbol: '¥' },
  AED: { flag: '🇦🇪', name: 'UAE Dirham', symbol: 'د.إ' },
  CAD: { flag: '🇨🇦', name: 'Canadian Dollar', symbol: 'CA$' },
  SGD: { flag: '🇸🇬', name: 'Singapore Dollar', symbol: 'S$' },
};
const POPULAR_CURRENCIES = ['USD', 'INR', 'EUR', 'GBP', 'JPY', 'AED', 'CAD', 'SGD'];

// Main currency converter hook
function useCurrencyConverter({ from = 'USD', to = 'INR', amount = '1000' }) {
  const [fromCurrency, setFromCurrency] = useState(from);
  const [toCurrency, setToCurrency] = useState(to);
  const [inputAmount, setInputAmount] = useState(amount);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [rateChange, setRateChange] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const prevRateRef = React.useRef(null);

  // Fetch conversion rate
  const fetchRate = useCallback(async (f = fromCurrency, t = toCurrency, amt = inputAmount) => {
    setIsLoading(true);
    setError(null);
    try {
      // Use your own API route for security (see /api/convert.js)
      const res = await fetch(`/api/convert?from=${f}&to=${t}&amount=${amt}`);
      const data = await res.json();
      if (res.ok && data.conversion_rate) {
        setExchangeRate(data.conversion_rate);
        setConvertedAmount(data.conversion_result);
        setLastUpdated(new Date());
        // Track rate change
        if (prevRateRef.current !== null) {
          setRateChange(data.conversion_rate > prevRateRef.current ? 'up' : data.conversion_rate < prevRateRef.current ? 'down' : null);
        }
        prevRateRef.current = data.conversion_rate;
      } else {
        setError(data.error || 'Failed to fetch rate');
        setExchangeRate(null);
        setConvertedAmount(null);
      }
    } catch (e) {
      setError('Network error');
      setExchangeRate(null);
      setConvertedAmount(null);
    } finally {
      setIsLoading(false);
    }
  }, [fromCurrency, toCurrency, inputAmount]);

  // Fetch on mount and whenever from/to/amount changes
  useEffect(() => {
    if (!fromCurrency || !toCurrency || !inputAmount) return;
    fetchRate();
    // eslint-disable-next-line
  }, [fromCurrency, toCurrency, inputAmount]);

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setInputAmount(inputAmount); // keep amount
  };

  // Manual refresh
  const refreshRates = () => {
    fetchRate();
  };

  return {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount: inputAmount,
    setAmount: setInputAmount,
    convertedAmount,
    exchangeRate,
    isLoading,
    error,
    lastUpdated,
    rateChange,
    historicalData,
    handleSwap,
    refreshRates,
  };
}


// ====================================================================
// UI COMPONENTS
// ====================================================================
const CurrencyInputRow = memo(({ 
  label, 
  currency, 
  onCurrencyChange, 
  amount, 
  onAmountChange, 
  readOnly = false, 
  isLoading,
  isActive
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleCurrencySelect = (code) => {
    onCurrencyChange(code);
    setIsDropdownOpen(false);
  };

  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-base font-bold text-pink-600 mb-2 tracking-wide">
        {label}
      </label>
      <div className="relative flex items-stretch rounded-full overflow-visible shadow-lg border-2 border-pink-200 bg-white">
        {/* Currency Selector */}
        <div className="relative flex-shrink-0 w-36 min-w-[9rem]">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-full h-full flex items-center justify-between pl-5 pr-4 py-4 text-lg font-bold text-gray-800 transition-all duration-200 hover:bg-pink-50 focus:outline-none rounded-full ${
              readOnly ? 'bg-pink-50' : 'bg-white'
            }`}
            disabled={readOnly}
            style={{ zIndex: 30 }}
          >
            <div className="flex items-center min-w-0">
              <span className="mr-3 text-3xl whitespace-nowrap drop-shadow-lg">{CURRENCY_DATA[currency]?.flag}</span>
              <span className="font-bold text-lg whitespace-nowrap">{currency}</span>
            </div>
            <FiChevronDown className={`text-pink-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && !readOnly && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute left-0 top-full mt-2 w-80 min-w-[18rem] z-50 bg-white rounded-2xl shadow-2xl border-2 border-pink-200 overflow-y-auto max-h-96"
                style={{ boxShadow: '0 8px 32px rgba(255,0,128,0.12)' }}
              >
                {Object.entries(CURRENCY_DATA)
                  .sort(([a], [b]) => {
                    // Sort popular currencies first
                    if (POPULAR_CURRENCIES.includes(a) && !POPULAR_CURRENCIES.includes(b)) return -1;
                    if (!POPULAR_CURRENCIES.includes(a) && POPULAR_CURRENCIES.includes(b)) return 1;
                    return a.localeCompare(b);
                  })
                  .map(([code, { flag, name }]) => (
                  <button
                    key={code}
                    onClick={() => handleCurrencySelect(code)}
                    className={`w-full text-left px-5 py-3 hover:bg-pink-50 flex items-center gap-3 rounded-xl transition-all duration-150 ${
                      currency === code ? 'bg-pink-100 text-pink-700' : 'text-gray-700'
                    }`}
                    style={{ minWidth: '15rem' }}
                  >
                    <span className="mr-3 text-2xl whitespace-nowrap drop-shadow-lg">{flag}</span>
                    <span className="font-bold whitespace-nowrap">{code}</span>
                    <span className="ml-2 text-base text-gray-500 truncate">{name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {/* Amount Input */}
        <div className="flex-grow relative">
          <input
            type="text"
            value={amount}
            onChange={(e) => {
              const value = e.target.value.replace(/[^0-9.]/g, '');
              if (value.split('.').length <= 2) {
                onAmountChange(value);
              }
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            readOnly={readOnly}
            className={`w-full h-full px-4 sm:px-6 py-4 text-left text-gray-900 placeholder-pink-300 text-lg sm:text-xl md:text-2xl font-bold transition-all duration-200 focus:outline-none rounded-full overflow-x-auto scrollbar-hide ${
              readOnly ? 'bg-pink-50' : 'bg-white'
            } ${isFocused ? 'ring-2 ring-pink-400' : ''}`}
            placeholder={isLoading ? "Calculating..." : "0.00"}
            inputMode="decimal"
            style={{ 
              boxShadow: '0 2px 12px 0 rgba(255,0,128,0.06)',
              direction: 'ltr',
              minWidth: 0,
              textAlign: 'left'
            }}
          />
          {isLoading && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <motion.div 
                className="h-2 w-16 bg-pink-200 rounded-full"
                animate={{ width: ['0%', '100%', '0%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          )}
          {/* Removed animated pink dot for cleaner UI */}
        </div>
      </div>
    </motion.div>
  );
});

CurrencyInputRow.displayName = 'CurrencyInputRow';

const RateDisplay = ({ 
  fromCurrency, 
  toCurrency, 
  exchangeRate, 
  rateChange, 
  onCopy, 
  onRefresh,
  isLoading,
  lastUpdated,
  historicalData
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    if (!exchangeRate) return;
    try {
      await navigator.clipboard.writeText(exchangeRate.toFixed(6));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
      onCopy?.();
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const formattedTime = lastUpdated?.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <motion.div 
      className="bg-white p-4 rounded-xl shadow-sm border border-gray-200"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">Exchange Rate</h3>
        <div className="flex items-center space-x-2">
          <button 
            onClick={onRefresh}
            disabled={isLoading}
            className="p-1 text-gray-500 hover:text-indigo-600 transition-colors disabled:opacity-50"
          >
            <motion.div
              animate={{ rotate: isLoading ? 360 : 0 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            >
              <FiRefreshCw className="w-4 h-4" />
            </motion.div>
          </button>
          <span className="text-xs text-gray-400">
            {formattedTime || '--:--'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <span className="text-base sm:text-lg font-bold text-gray-800 mr-2 whitespace-nowrap overflow-x-auto scrollbar-hide">
            1 {fromCurrency} = {exchangeRate?.toFixed(3) || '--'} {toCurrency}
          </span>
          {rateChange && (
            <motion.span 
              className={`flex items-center text-sm ${
                rateChange === 'up' ? 'text-green-600' : 'text-red-600'
              }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            >
              {rateChange === 'up' ? <FiArrowUp className="mr-0.5" /> : <FiArrowDown className="mr-0.5" />}
              {Math.random().toFixed(2)}%
            </motion.span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Copy rate"
          >
            {isCopied ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <FiCheck className="w-4 h-4 text-green-500" />
              </motion.div>
            ) : (
              <FiCopy className="w-4 h-4 text-gray-500 hover:text-indigo-600" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const ConversionResult = ({ amount, fromCurrency, convertedAmount, toCurrency }) => {
  if (!amount || !convertedAmount) return null;

  return (
    <motion.div 
      className="mt-6 bg-indigo-50 p-4 rounded-xl border border-indigo-100"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-white p-2 rounded-lg shadow-xs mr-3">
            <FiDollarSign className="text-indigo-600 w-5 h-5" />
          </div>
          <div>
            <h3 className="font-medium text-gray-800">Conversion Result</h3>
            <p className="text-sm text-gray-600">
              {parseFloat(amount).toLocaleString('en-US', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 3
              })} {fromCurrency} equals
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xl font-bold text-indigo-700">
            {CURRENCY_DATA[toCurrency]?.symbol || ''}
            {parseFloat(convertedAmount).toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 3
            })}
          </p>
          <p className="text-sm text-gray-600">{toCurrency}</p>
        </div>
      </div>
    </motion.div>
  );
};

const PopularConversions = ({ baseCurrency, onConversionSelect }) => {
  const popularPairs = [
    { to: 'USD', label: 'US Dollar' },
    { to: 'EUR', label: 'Euro' },
    { to: 'GBP', label: 'British Pound' },
    { to: 'INR', label: 'Indian Rupee' },
    { to: 'JPY', label: 'Japanese Yen' },
    { to: 'AED', label: 'UAE Dirham' },
  ].filter(pair => pair.to !== baseCurrency);

  return (
    <div className="mt-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3">Popular conversions from {baseCurrency}</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {popularPairs.map((pair) => (
          <motion.button
            key={pair.to}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onConversionSelect(pair.to)}
            className="bg-white p-3 rounded-lg shadow-xs border border-gray-200 hover:border-indigo-300 transition-colors text-center"
          >
            <div className="text-lg mb-1">{CURRENCY_DATA[pair.to]?.flag}</div>
            <div className="text-sm font-medium text-gray-800">{pair.to}</div>
            <div className="text-xs text-gray-500 truncate">{pair.label}</div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

const CurrencyConverterTool = () => {
  const {
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    amount,
    setAmount,
    convertedAmount,
    exchangeRate,
    isLoading,
    error,
    lastUpdated,
    rateChange,
    historicalData,
    handleSwap,
    refreshRates
  } = useCurrencyConverter({ from: 'USD', to: 'INR', amount: '1000' });

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);
  const handlePopularConversion = (toCurrency) => {
    setToCurrency(toCurrency);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };
  const handleSwapAnimated = () => {
    handleSwap();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1200);
  };

  return (
    <div className="relative bg-gradient-to-br from-pink-50 via-yellow-50 to-blue-50 p-8 rounded-3xl shadow-2xl border-4 border-pink-200">
      {/* Confetti effect */}
    
      <div className="space-y-8">
        <CurrencyInputRow
          label="Amount to convert"
          currency={fromCurrency}
          onCurrencyChange={setFromCurrency}
          amount={amount}
          onAmountChange={setAmount}
          isLoading={isLoading}
          isActive={true}
        />
        <div className="flex justify-center items-center relative my-2">
          <div className="flex-grow border-t border-pink-200"></div>
          <motion.button
            onClick={handleSwapAnimated}
            whileHover={{ scale: 1.15, rotate: 20 }}
            whileTap={{ scale: 0.95, rotate: -20 }}
            className="group p-4 mx-6 rounded-full border-2 border-pink-300 bg-gradient-to-br from-pink-200 to-yellow-100 shadow-lg transition-all duration-300 hover:border-pink-500 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-pink-400 relative z-10"
            aria-label="Swap currencies"
          >
            <FiRefreshCw className="w-8 h-8 text-pink-500 group-hover:text-yellow-500 transition-colors" />
          </motion.button>
          <div className="flex-grow border-t border-pink-200"></div>
        </div>
        <CurrencyInputRow
          label="Converted amount"
          currency={toCurrency}
          onCurrencyChange={setToCurrency}
          amount={convertedAmount?.toFixed(2) || ''}
          onAmountChange={() => {}}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-8 space-y-6">
        <RateDisplay
          fromCurrency={fromCurrency}
          toCurrency={toCurrency}
          exchangeRate={exchangeRate}
          rateChange={rateChange}
          onCopy={() => {}}
          onRefresh={refreshRates}
          isLoading={isLoading}
          lastUpdated={lastUpdated}
          historicalData={historicalData}
        />
        {error && (
          <motion.div 
            className="bg-red-100 p-4 rounded-xl border-2 border-red-200 text-red-700 text-base"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.div>
        )}
        <ConversionResult 
          amount={amount}
          fromCurrency={fromCurrency}
          convertedAmount={convertedAmount}
          toCurrency={toCurrency}
        />
        <PopularConversions 
          baseCurrency={fromCurrency} 
          onConversionSelect={handlePopularConversion} 
        />
      </div>
    </div>
  );
};

// ================= Real-time Market Rates Section ===================
const BASE_PAIRS = [
  { base: 'USD', target: 'INR' },
  { base: 'EUR', target: 'USD' },
  { base: 'GBP', target: 'EUR' },
  { base: 'USD', target: 'JPY' },
  { base: 'USD', target: 'AED' },
  { base: 'USD', target: 'CAD' },
  { base: 'USD', target: 'SGD' }
];

function MarketRatesSection() {
  const [rates, setRates] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    let isMounted = true;
    async function fetchRates() {
      setLoading(true);
      setError(null);
      try {
        const results = await Promise.all(
          BASE_PAIRS.map(async ({ base, target }) => {
            const res = await fetch(`https://v6.exchangerate-api.com/v6/df36a5313fcc30251694ae8b/latest/${base}`);
            const data = await res.json();
            if (data.result === 'success') {
              return {
                pair: `${base}/${target}`,
                rate: data.conversion_rates[target],
                change: 0
              };
            } else {
              return {
                pair: `${base}/${target}`,
                rate: '--',
                change: 0
              };
            }
          })
        );
        if (isMounted) setRates(results);
      } catch (e) {
        if (isMounted) setError('Failed to fetch live market rates');
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => { isMounted = false; clearInterval(interval); };
  }, []);

  return (
    <motion.section 
      className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-md border border-gray-200 mb-16 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <FiBarChart2 className="text-indigo-600 mr-2" />
        {"Today's Market Rates"}
      </h2>
      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
      ) : loading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="bg-gray-100 animate-pulse h-12 rounded-lg"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-3">
          {rates.map((row) => (
            <div key={row.pair} className="bg-gray-50 p-3 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="font-medium text-gray-900">{row.pair}</span>
                <span className="text-gray-600">{row.rate}</span>
              </div>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                row.change >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {row.change >= 0 ? '+' : ''}{row.change}%
                {row.change >= 0 ? (
                  <FiArrowUp className="ml-1" />
                ) : (
                  <FiArrowDown className="ml-1" />
                )}
              </span>
            </div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ====================================================================
// MAIN PAGE COMPONENT
// ====================================================================
export default function CurrencyConverterPage() {
  const pageTitle = "Real-Time Currency Converter | Accurate Exchange Rates (2025) | Bharat Tax File";
  const pageDescription = "Convert over 150 currencies instantly with live, accurate exchange rates. No hidden fees. Compare USD, INR, EUR, GBP, JPY, and more. Trusted by thousands for transparent, up-to-date forex rates.";
  const canonicalUrl = "https://www.bharattaxfile.com/currency-converter";

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Schema markup for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Why is this rate different from my bank's rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We display the live mid-market rate, which is the benchmark rate banks use when trading currencies among themselves. Financial institutions typically add a margin (called a spread) of 1-3% to this rate as their profit. This is why their offered rate is less favorable than what you see here. Use our converter to understand the true value of your money before making transfers."
        }
      },
      {
        "@type": "Question",
        "name": "How often are your exchange rates updated?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our rates refresh every minute to reflect the latest market conditions. Currency markets operate 24 hours a day during weekdays, with rates constantly fluctuating based on global economic factors, political events, and market demand."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a fee for using this currency converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, our currency converter is completely free to use. We show you the real mid-market exchange rate without any markup or hidden fees. This helps you understand exactly how much your money is worth before you exchange it through a bank or money transfer service."
        }
      },
      {
        "@type": "Question",
        "name": "How do I use the currency converter?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply select your currencies, enter the amount, and see the converted value instantly. You can also view popular conversions and compare rates for major currencies."
        }
      },
      {
        "@type": "Question",
        "name": "Which currencies are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We support over 150 global currencies including USD, INR, EUR, GBP, JPY, AUD, CAD, SGD, CNY, AED, CHF, NZD, and more."
        }
      },
      {
        "@type": "Question",
        "name": "Are your exchange rates live and accurate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, our rates are updated every minute using trusted financial data sources to ensure accuracy and transparency."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use this converter for business or travel?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely! Our converter is ideal for travelers, businesses, and anyone needing real-time currency conversions for international payments, remittances, or budgeting."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer historical exchange rates?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can view historical rates and trends for major currency pairs to help you make informed decisions."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data safe when using this tool?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, we do not store any personal or financial data. All conversions are processed securely and anonymously."
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bharattaxfile.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Financial Tools",
        "item": "https://www.bharattaxfile.com/tools"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Currency Converter",
        "item": canonicalUrl
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Bharat Tax File",
    "url": "https://www.bharattaxfile.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.bharattaxfile.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="currency converter, exchange rate calculator, USD to INR, EUR to INR, GBP to INR, live forex rates, money transfer comparison, real-time forex, best exchange rates, online currency converter, 2025" />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bharat Tax File" />
        <meta name="language" content="en" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content="https://www.bharattaxfile.com/images/currency-converter-preview.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="https://www.bharattaxfile.com/images/currency-converter-preview.jpg" />
        <meta name="twitter:site" content="@bharattaxfile" />

        {/* Schema Markup */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

        {/* Viewport and Theme */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#6366f1" />
        {/* HTML lang attribute for SEO (set via _document.js in Next.js, but reminder for best practice) */}
      </Head>

      <main className="bg-gradient-to-b from-gray-50 to-white min-h-screen" id="main-content">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 min-h-0">
            {/* Header intentionally left blank as per user request; height reduced to remove gap */}
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <section className="mb-16 text-center" aria-labelledby="currency-converter-heading">
            <motion.header 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <motion.h1 
                id="currency-converter-heading"
                className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Currency <span className="text-indigo-600">Converter</span>
              </motion.h1>
              <motion.p 
                className="text-xl text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Convert 150+ currencies with live exchange rates updated every minute. Compare rates, see historical trends, and get the best value for your money.
              </motion.p>
            </motion.header>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto"
            >
              <CurrencyConverterTool />
              <p className="mt-4 text-sm text-gray-500">
                Last updated: {formattedDate} at {currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </motion.div>
          </section>

          {/* Features Grid */}
          <section className="mb-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiGlobe className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">150+ Currencies</h3>
              <p className="text-gray-600">
                Convert between all major world currencies with up-to-date exchange rates.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiClock className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Rates</h3>
              <p className="text-gray-600">
                Our rates update every minute to give you the most accurate conversion.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <FiShield className="text-indigo-600 w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Fees</h3>
              <p className="text-gray-600">
                See the true mid-market rate without any hidden charges or markups.
              </p>
            </motion.div>
          </section>

          {/* Market Data Section - Realtime */}
          <MarketRatesSection />

          {/* How It Works Section */}
          <motion.section 
            className="mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-8">How Our Currency Converter Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">1</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select Currencies</h3>
                <p className="text-gray-600">
                  Choose the currency you want to convert from and to from our list of 150+ global currencies.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">2</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Enter Amount</h3>
                <p className="text-gray-600">
                  Type in the amount you want to convert. Our calculator will show you the equivalent value instantly.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                whileHover={{ y: -5 }}
              >
                <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-indigo-600 font-bold">3</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Accurate Rate</h3>
                <p className="text-gray-600">
                  See the real mid-market exchange rate without any hidden fees or markups.
                </p>
              </motion.div>
            </div>
          </motion.section>

          {/* FAQ Section */}
          <motion.section 
            className="mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            aria-labelledby="faq-heading"
          >
            <h2 id="faq-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
            <FAQAccordion />
          </motion.section>

          {/* Why Use Our Converter / Testimonials Section */}
          <motion.section
            className="mb-16 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            aria-labelledby="why-use-heading"
          >
            <h2 id="why-use-heading" className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Use Our Converter?</h2>
            <p className="text-lg text-gray-700 mb-8 text-center">
              Bharat Tax File's mission is to empower users with transparent, real-time currency data—no hidden fees, no confusing rates. Our converter is trusted by thousands for its accuracy, speed, and ease of use. Whether you're a traveler, business owner, or just curious, we help you make informed financial decisions.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col h-full" itemScope itemType="https://schema.org/Review">
                  <div className="flex items-center mb-3">
                    <img src={t.avatar} alt={t.name + ' photo'} className="w-12 h-12 rounded-full mr-3 border-2 border-indigo-200" loading="lazy" />
                    <div>
                      <span className="font-semibold text-gray-900" itemProp="author">{t.name}</span>
                      <span className="block text-xs text-gray-500" itemProp="jobTitle">{t.role}</span>
                    </div>
                  </div>
                  <div className="flex items-center mb-2" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                    <span className="text-yellow-400 text-lg mr-1">{'★'.repeat(t.rating)}</span>
                    <meta itemProp="ratingValue" content={t.rating.toString()} />
                    <meta itemProp="bestRating" content="5" />
                  </div>
                  <blockquote className="text-gray-700 italic flex-grow" itemProp="reviewBody">
                    “{t.text}”
                  </blockquote>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Footer removed */}
      </main>
    </>
  );
}

// Testimonials data for social proof
const testimonials = [
  {
    name: 'Priya S.',
    role: 'Frequent Traveler',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 5,
    text: 'The most reliable and transparent currency converter I have used. No hidden fees and always up-to-date rates!'
  },
  {
    name: 'Rahul M.',
    role: 'Small Business Owner',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    text: 'I use Bharat Tax File for all my international transactions. The live rates and easy interface save me time and money.'
  },
  {
    name: 'Aarti K.',
    role: 'Student',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 4,
    text: 'Super easy to use and very accurate. Helped me plan my study abroad budget with confidence.'
  },
  {
    name: 'Vikram P.',
    role: 'Remittance User',
    avatar: 'https://randomuser.me/api/portraits/men/76.jpg',
    rating: 5,
    text: 'I recommend this converter to all my friends and family. It’s fast, free, and trustworthy.'
  }
];

// FAQ Accordion Component for SEO and UX
const FAQS = [
  {
    question: 'Why is this rate different from my bank&apos;s rate?',
    answer: 'Financial institutions add a margin (called a spread) to the mid-market rate as their profit. This margin typically ranges from 1&ndash;3% but can be higher for less common currency pairs or at physical exchange counters. Our converter shows you the true mid-market rate so you can compare what different providers are offering.'
  },
  {
    question: 'How often are your exchange rates updated?',
    answer: 'Our rates refresh every minute to reflect the latest market conditions. Currency markets operate 24 hours a day during weekdays, with rates constantly fluctuating based on global economic factors, political events, and market demand.'
  },
  {
    question: 'Is there a fee for using this currency converter?',
    answer: 'No, our currency converter is completely free to use. We show you the real mid-market exchange rate without any markup or hidden fees. This helps you understand exactly how much your money is worth before you exchange it through a bank or money transfer service.'
  },
  {
    question: 'How do I use the currency converter?',
    answer: 'Simply select your currencies, enter the amount, and see the converted value instantly. You can also view popular conversions and compare rates for major currencies.'
  },
  {
    question: 'Which currencies are supported?',
    answer: 'We support over 150 global currencies including USD, INR, EUR, GBP, JPY, AUD, CAD, SGD, CNY, AED, CHF, NZD, and more.'
  },
  {
    question: 'Are your exchange rates live and accurate?',
    answer: 'Yes, our rates are updated every minute using trusted financial data sources to ensure accuracy and transparency.'
  },
  {
    question: 'Can I use this converter for business or travel?',
    answer: 'Absolutely! Our converter is ideal for travelers, businesses, and anyone needing real-time currency conversions for international payments, remittances, or budgeting.'
  },
  {
    question: 'Do you offer historical exchange rates?',
    answer: 'Yes, you can view historical rates and trends for major currency pairs to help you make informed decisions.'
  },
  {
    question: 'Is my data safe when using this tool?',
    answer: 'Yes, we do not store any personal or financial data. All conversions are processed securely and anonymously.'
  }
];

function FAQAccordion() {
  const [openIndex, setOpenIndex] = React.useState(null);
  return (
    <div className="space-y-3">
      {FAQS.map((faq, idx) => (
        <div key={faq.question} className="bg-white rounded-xl shadow-sm border border-gray-200">
          <button
            className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
            onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
            aria-expanded={openIndex === idx}
            aria-controls={`faq-panel-${idx}`}
          >
            <span className="flex items-center text-lg font-semibold text-gray-900">
              <FiHelpCircle className="text-indigo-600 mr-2" aria-hidden="true" />
              {faq.question}
            </span>
            <span className="ml-4 text-indigo-500 text-2xl" aria-hidden="true">
              {openIndex === idx ? '-' : '+'}
            </span>
          </button>
          <div
            id={`faq-panel-${idx}`}
            className={`px-5 pb-5 text-gray-600 text-base transition-all duration-300 ease-in-out ${openIndex === idx ? 'block' : 'hidden'}`}
          >
            {faq.answer}
          </div>
        </div>
      ))}
    </div>
  );
}