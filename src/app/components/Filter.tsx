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
    <div className="max-w-full bg-white shadow p-4 rounded-2xl sm:p-6">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg font-bold sm:text-xl">Filter</h2>
        <button onClick={() => onClear()} className="text-gray-500">
          <X size={20}  />
        </button>
      </div>

      <div className="mb-4 sm:mb-6">
        <DateRange 
          initialDateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm font-medium mb-2">Transaction Type</h3>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('transactionType')}
            className={`w-full bg-gray-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between cursor-pointer ${openDropdown === 'transactionType' ? 'border-2 border-black' : ''}`}
          >
            <span className="text-sm truncate">
              {transactionType.length === 0 ? 'Select types' : 
               transactionType.length > 2 ? `${transactionType[0]}, ${transactionType[1]}, ...` : 
               transactionType.join(', ')}
            </span>
            <ChevronDown size={14}  className="text-gray-500" />
          </div>
          
          {openDropdown === 'transactionType' && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
              <div className="p-2">
                {['Store Transactions', 'Get Tipped', 'Withdrawals', 'Chargebacks', 'Cashbacks', 'Refer & Earn'].map(type => (
                  <div key={type} className="py-1 px-2 sm:py-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={transactionType.includes(type)}
                        onChange={() => toggleTransactionType(type)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{type}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mb-4 sm:mb-6">
        <h3 className="text-sm font-medium mb-2">Transaction Status</h3>
        <div className="relative">
          <div 
            onClick={() => toggleDropdown('transactionStatus')}
            className={`w-full bg-gray-50 rounded-lg px-3 py-2 sm:px-4 sm:py-3 flex items-center justify-between cursor-pointer ${openDropdown === 'transactionStatus' ? 'border-2 border-black' : ''}`}
          >
            <span className="text-sm truncate">
              {transactionStatus.length === 0 ? 'Select status' : transactionStatus.join(', ')}
            </span>
            <ChevronDown size={14}  className="text-gray-500" />
          </div>
          
          {openDropdown === 'transactionStatus' && (
            <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
              <div className="p-2">
                {['Successful', 'Pending', 'Failed'].map(status => (
                  <div key={status} className="py-1 px-2 sm:py-2">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={transactionStatus.includes(status)}
                        onChange={() => toggleTransactionStatus(status)}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">{status}</span>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-12">
        <button
          onClick={handleClear}
          className="flex-1 py-2 sm:py-3 border border-gray-200 rounded-lg text-center text-sm"
        >
          Clear
        </button>
        <button
          onClick={handleApply}
          className="flex-1 py-2 sm:py-3 bg-black text-white rounded-lg text-center text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Filter;