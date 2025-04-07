'use client';
import React, { useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onChange: (dates: { startDate: Date; endDate: Date }) => void;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [dates, setDates] = useState({
    startDate: new Date(startDate),
    endDate: new Date(endDate),
  });

  const handleSelect = (ranges: RangeKeyDict) => {
    const selected = ranges.selection;
    const start = selected.startDate instanceof Date ? selected.startDate : new Date();
    const end = selected.endDate instanceof Date ? selected.endDate : new Date();

    setDates({ startDate: start, endDate: end });
    onChange({ startDate: start, endDate: end });
  };

  const selectionRange = {
    startDate: dates.startDate,
    endDate: dates.endDate,
    key: 'selection',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        <span>
          {dates.startDate instanceof Date && !isNaN(dates.startDate.getTime())
            ? format(dates.startDate, 'MMM d, yyyy')
            : 'Invalid start date'}
          {' - '}
          {dates.endDate instanceof Date && !isNaN(dates.endDate.getTime())
            ? format(dates.endDate, 'MMM d, yyyy')
            : 'Invalid end date'}
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {showPicker && (
        <div className="absolute right-0 mt-2 z-10 bg-white shadow-lg rounded-lg overflow-hidden">
          <DateRange
            ranges={[selectionRange]}
            onChange={handleSelect}
            months={2}
            direction="horizontal"
          />
          <div className="flex justify-end p-2 border-t">
            <button
              onClick={() => setShowPicker(false)}
              className="px-4 py-1 bg-black text-white rounded text-sm"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
