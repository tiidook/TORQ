import { DateTime } from "luxon";
import { useEffect, useState } from "react";

interface TimeDisplayProps {
    timezoneId: string;
}

export const TimeDisplay = ({ timezoneId }: TimeDisplayProps) => {
    const [currentTime, setCurrentTime] = useState(
        DateTime.now().setZone(timezoneId)
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(DateTime.now().setZone(timezoneId));
        }, 1000);

        return () => clearInterval(interval);
    }, [timezoneId]);

    return (
        <div data-testid='time-display'>
            {currentTime.toFormat("HH:mm:ss")}
        </div>
    );
};
