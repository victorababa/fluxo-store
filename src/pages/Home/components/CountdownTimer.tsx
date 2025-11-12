import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

interface CountdownProps {
  targetDate: Date;
  onComplete?: () => void;
  className?: string;
}

const CountdownTimer = ({ targetDate, onComplete, className = '' }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isComplete: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({
          hours: 0,
          minutes: 0,
          seconds: 0,
          isComplete: true
        });
        if (onComplete) onComplete();
        return;
      }

      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        hours,
        minutes,
        seconds,
        isComplete: false
      });
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Chamada inicial

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  if (timeLeft.isComplete) {
    return (
      <div className="flex items-center bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full">
        <Clock size={16} className="mr-1" />
        Ofertas encerradas!
      </div>
    );
  }

  return (
    <div className={`flex items-center bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full ${className}`}>
      <Clock size={16} className="mr-1" />
      <span className="mr-1">Termina em:</span>
      <span className="bg-black/30 px-1.5 py-0.5 rounded">
        {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
      </span>
    </div>
  );
};

export default CountdownTimer;
