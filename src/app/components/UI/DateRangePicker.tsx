import { useState } from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateRangeProps {
  initialDateRange: { start: string; end: string };
  onDateRangeChange: (dateRange: { start: string; end: string }) => void;
}

const DateRange = ({ initialDateRange, onDateRangeChange }: DateRangeProps) => {
  const [dateRange, setDateRange] = useState(initialDateRange);
  const [calendarOpen, setCalendarOpen] = useState<'start' | 'end' | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2023, 6)); // July 2023

  const handleDatePreset = (preset: string) => {
    const today = new Date();
    let start = new Date();
    let end = new Date();
    
    switch(preset) {
      case 'today':
        start = today;
        end = today;
        break;
      case 'last7':
        start = new Date(today);
        start.setDate(today.getDate() - 7);
        end = today;
        break;
      case 'thisMonth':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = today;
        break;
      case 'last3Months':
        start = new Date(today);
        start.setMonth(today.getMonth() - 3);
        end = today;
        break;
    }
    
    const newDateRange = {
      start: formatDate(start),
      end: formatDate(end)
    };
    
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };
  
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };
  
  const toggleCalendar = (field: 'start' | 'end') => {
    if (calendarOpen === field) {
      setCalendarOpen(null);
    } else {
      setCalendarOpen(field);
      
      const dateParts = field === 'start' ? dateRange.start.split(' ') : dateRange.end.split(' ');
      const monthMap: {[key: string]: number} = {
        'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
        'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
      };
      
      const month = monthMap[dateParts[1]];
      const year = parseInt(dateParts[2]);
      setCurrentMonth(new Date(year, month));
    }
  };
  
  const handleDateSelect = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const formattedDate = formatDate(newDate);
    
    let newDateRange;
    if (calendarOpen === 'start') {
      newDateRange = { ...dateRange, start: formattedDate };
    } else if (calendarOpen === 'end') {
      newDateRange = { ...dateRange, end: formattedDate };
    } else {
      return;
    }
    
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
    setCalendarOpen(null);
  };
  
  const changeMonth = (increment: number) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + increment);
    setCurrentMonth(newMonth);
  };
  
  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1).getDay() || 7;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="text-center"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = 
        calendarOpen === 'start' && dateRange.start.includes(`${i} ${currentMonth.toLocaleString('default', { month: 'short' })}`) ||
        calendarOpen === 'end' && dateRange.end.includes(`${i} ${currentMonth.toLocaleString('default', { month: 'short' })}`);
      
      days.push(
        <div 
          key={i}
          onClick={() => handleDateSelect(i)}
          className={`text-center p-2 cursor-pointer ${isSelected ? 'bg-black text-white rounded-full' : 'hover:bg-gray-100 rounded-full'}`}
        >
          {i}
        </div>
      );
    }
    
    return days;
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Date Range</h3>
      
      <div className="flex gap-2 mb-6 overflow-x-auto">
        <button 
          onClick={() => handleDatePreset('today')} 
          className="px-4 py-2 bg-gray-50 rounded-full text-sm whitespace-nowrap"
        >
          Today
        </button>
        <button 
          onClick={() => handleDatePreset('last7')}
          className="px-4 py-2 bg-gray-50 rounded-full text-sm whitespace-nowrap"
        >
          Last 7 days
        </button>
        <button 
          onClick={() => handleDatePreset('thisMonth')}
          className="px-4 py-2 bg-gray-50 rounded-full text-sm whitespace-nowrap"
        >
          This month
        </button>
        <button 
          onClick={() => handleDatePreset('last3Months')}
          className="px-4 py-2 bg-gray-50 rounded-full text-sm whitespace-nowrap"
        >
          Last 3 months
        </button>
      </div>
      
      <div className="flex gap-2">
      <div className="relative w-full">
        <div 
          onClick={() => toggleCalendar('start')}
          className={`w-full bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer ${calendarOpen === 'start' ? 'border-2 border-black w-[200%]' : ''}`}
        >
          <span>{dateRange.start}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        
        {calendarOpen === 'start' && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1">
                  <ChevronLeft size={16} />
                </button>
                <h3 className="font-medium">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => changeMonth(1)} className="p-1">
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {generateCalendar()}
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="relative w-full">
        <div 
          onClick={() => toggleCalendar('end')}
          className={`w-full bg-gray-50 rounded-lg px-4 py-3 flex items-center justify-between cursor-pointer ${calendarOpen === 'end' ? 'border-2 border-black w-[200%]' : ''}`}
        >
          <span>{dateRange.end}</span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
        
        {calendarOpen === 'end' && (
          <div className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-lg z-10">
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-1">
                  <ChevronLeft size={16} />
                </button>
                <h3 className="font-medium">
                  {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
                </h3>
                <button onClick={() => changeMonth(1)} className="p-1">
                  <ChevronRight size={16} />
                </button>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                  <div key={day} className="text-center text-sm font-medium text-gray-500 py-1">
                    {day}
                  </div>
                ))}
                {generateCalendar()}
              </div>
            </div>
          </div>
        )}
      </div>
</div>

    </div>
  );
};

export default DateRange;