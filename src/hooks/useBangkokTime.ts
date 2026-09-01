import { useState, useEffect } from 'react';

export interface BangkokStatus {
  isOpen: boolean;
  statusText: string;
  subText: string;
  currentTimeString: string;
  isClosingSoon: boolean;
}

export function useBangkokTime(): BangkokStatus {
  const [status, setStatus] = useState<BangkokStatus>({
    isOpen: false,
    statusText: 'Checking hours...',
    subText: 'Pan Rd, Sathorn',
    currentTimeString: '',
    isClosingSoon: false
  });

  useEffect(() => {
    function calculateStatus() {
      // Calculate current date/time in Bangkok (Asia/Bangkok, UTC+7)
      const now = new Date();
      const bangkokTimeStr = now.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
      const bkkDate = new Date(bangkokTimeStr);
      
      const day = bkkDate.getDay(); // 0 = Sun, 1 = Mon, 2 = Tue, ..., 6 = Sat
      const hours = bkkDate.getHours();
      const minutes = bkkDate.getMinutes();
      const currentDecimalHour = hours + minutes / 60;

      const timeFormatted = bkkDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });

      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = dayNames[day];

      // Schedule: Closed on Mondays (1)
      // Tuesday-Sunday: 09:00 to 18:00 (9 AM to 6 PM)
      if (day === 1) {
        // Monday
        setStatus({
          isOpen: false,
          statusText: 'Closed Today (Monday)',
          subText: 'Opens Tuesday at 9:00 AM',
          currentTimeString: `${timeFormatted} Bangkok Time`,
          isClosingSoon: false
        });
      } else if (currentDecimalHour >= 9 && currentDecimalHour < 18) {
        const isClosingSoon = currentDecimalHour >= 17.25; // within 45 mins of closing
        setStatus({
          isOpen: true,
          statusText: isClosingSoon ? 'Closes Soon • 6:00 PM' : 'Open Today • Until 6:00 PM',
          subText: 'Dine-in & Garden Seating Available',
          currentTimeString: `${timeFormatted} Bangkok Time`,
          isClosingSoon
        });
      } else if (currentDecimalHour < 9) {
        setStatus({
          isOpen: false,
          statusText: `Closed • Opens at 9:00 AM Today`,
          subText: `${currentDayName} Morning`,
          currentTimeString: `${timeFormatted} Bangkok Time`,
          isClosingSoon: false
        });
      } else {
        // After 18:00
        const nextDayText = day === 0 ? 'Closed • Opens Tuesday at 9:00 AM' : 'Closed • Opens 9:00 AM Tomorrow';
        setStatus({
          isOpen: false,
          statusText: nextDayText,
          subText: 'See you for morning tea & brunch',
          currentTimeString: `${timeFormatted} Bangkok Time`,
          isClosingSoon: false
        });
      }
    }

    calculateStatus();
    const interval = setInterval(calculateStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  return status;
}
