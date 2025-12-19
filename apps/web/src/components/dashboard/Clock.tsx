import moment from "moment";
import { useEffect, useState } from "react";

export default function Clock() {
  const [hour, setHour] = useState(moment().format("LTS"));

  useEffect(() => {
    const interval = setInterval(() => {
      setHour(moment().format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <p className="text-muted-foreground text-2xl">{hour}</p>;
}
