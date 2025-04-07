import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import DateRange from '@/app/components/UI/DateRangePicker';

interface FilterProps {
  onApply: (filters: {
    dateRange: { start: string; end: string };
    transactionType: string[];
    transactionStatus: string[];
  }) => void;
  onClear: () => void;
  initialFilters: {
    dateRange: { start: string; end: string };
    transactionType: string[];
    transactionStatus: string[];
  };
}

const Filter = ({ onApply, onClear, initialFilters }: FilterProps) => {
  const [dateRange, setDateRange] = useState(initialFilters.dateRange);
  const [transactionType, setTransactionType] = useState(initialFilters.transactionType);
  const [transactionStatus, setTransactionStatus] = useState(initialFilters.transactionStatus);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const handleApply = () => {
    onApply({
      dateRange,
      transactionType,
      transactionStatus
    });
    setOpenDropdown(null);
  };
  
  const handleClear = () => {
    setDateRange(initialFilters.dateRange);
    setTransactionType(initialFilters.transactionType);
    setTransactionStatus(initialFilters.transactionStatus);
    onClear();
    setOpenDropdown(null);
  };
  
  const toggleTransactionType = (type: string) => {
    if (transactionType.includes(type)) {
      setTransactionType(transactionType.filter(t => t !== type));
    } else {
      setTransactionType([...transactionType, type]);
    }
  };
  
  const toggleTransactionStatus = (status: string) => {
    if (transactionStatus.includes(status)) {
      setTransactionStatus(transactionStatus.filter(s => s !== status));
    } else {
      setTransactionStatus([...transactionStatus, status]);
    }
  };
  
  const toggleDropdown = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(dropdown);
    }
  };
  
  const handleDateRangeChange = (newDateRange: { start: string; end: string }) => {
    setDateRange(newDateRange);
  };
  
  return (
    <div className="w-full max-w-full bg-white shadow p-3 rounded-xl sm:p-6 md:rounded-2xl">
      <div className="flex justify-between items-center mb-3 sm:mb-6">
        <h2 className="text-base font-bold sm:text-lg md:text-xl">Filter</h2>
        <button 
          onClick={() => onClear()} 
          className="text-gray-500 p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Clear filters"
        >
          <X size={18} className="sm:size-20" />
        </button>
      </div>

      <div className="mb-3 sm:mb-6">
        <DateRange 
          initialDateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <div className="mb-3 sm:mb-6">
        <h3 className="text-xs font-medium mb-1 sm:text-sm sm:mb-2">Transaction Type</h3>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('transactionType')}
            className={`w-full bg-gray-50 rounded-lg px-2 py-2 sm:px-4 sm:py-3 flex items-center justify-between cursor-pointer transition-all ${openDropdown === 'transactionType' ? 'border-2 border-black' : 'border border-gray-100 hover:border-gray-300'}`}
          >
            <span className="text-xs sm:text-sm truncate">
              {transactionType.length === 0 ? 'Select types' : 
               transactionType.length > 2 ? `${transactionType.length} types selected` : 
               transactionType.join(', ')}
            </span>
            <ChevronDown size={12} className="text-gray-500 sm:size-14" />
          </div>
          
          {openDropdown === 'transactionType' && (
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-20 border border-gray-100 max-h-56 overflow-y-auto">
              <div className="p-1 sm:p-2">
                {['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn'].map(type => (
                  <div key={type} className="py-1 px-2 hover:bg-gray-50 rounded">
                    <label className="flex items-center space-x-2 cursor-pointer w-full">
                      <input 
                        type="checkbox" 
                        checked={transactionType.includes(type)}
                        onChange={() => toggleTransactionType(type)}
                        className="w-3 h-3 sm:w-4 sm:h-4 accent-black"
                      />
                      <span className="text-xs sm:text-sm">{type}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-xs font-medium mb-1 sm:text-sm sm:mb-2">Transaction Status</h3>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('transactionStatus')}
            className={`w-full bg-gray-50 rounded-lg px-2 py-2 sm:px-4 sm:py-3 flex items-center justify-between cursor-pointer transition-all ${openDropdown === 'transactionStatus' ? 'border-2 border-black' : 'border border-gray-100 hover:border-gray-300'}`}
          >
            <span className="text-xs sm:text-sm truncate">
              {transactionStatus.length === 0 ? 'Select status' : 
               transactionStatus.length > 2 ? `${transactionStatus.length} statuses selected` : 
               transactionStatus.join(', ')}
            </span>
            <ChevronDown size={12} className="text-gray-500 sm:size-14" />
          </div>
          
          {openDropdown === 'transactionStatus' && (
            <div className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-lg z-20 border border-gray-100">
              <div className="p-1 sm:p-2">
                {['Successful', 'Pending', 'Failed'].map(status => (
                  <div key={status} className="py-1 px-2 hover:bg-gray-50 rounded">
                    <label className="flex items-center space-x-2 cursor-pointer w-full">
                      <input 
                        type="checkbox" 
                        checked={transactionStatus.includes(status)}
                        onChange={() => toggleTransactionStatus(status)}
                        className="w-3 h-3 sm:w-4 sm:h-4 accent-black"
                      />
                      <span className="text-xs sm:text-sm">{status}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-6 sm:mt-8 md:mt-12">
        <button
          onClick={handleClear}
          className="flex-1 py-2 px-4 border border-gray-200 rounded-lg text-center text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-2 px-4 bg-black text-white rounded-lg text-center text-xs sm:text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;