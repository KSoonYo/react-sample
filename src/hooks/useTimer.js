import { useState, useEffect } from "react"

export default function useTimer(
  startTime="0:0",
  endTime="30:0"
){
  const [startMinute, startSecond] = startTime.split(':').map((unit) => parseInt(unit));
  const [endMinute, endSecond] = endTime.split(':').map((unit) => parseInt(unit)) ;
  
  
  const [nowTimeMinute, setNowTimeMinute] = useState(startMinute);
  const [nowTimeSecond, setNowTimeSecond] = useState(startSecond)
  useEffect(() => {
    const id = setInterval(() => {
      if(nowTimeMinute < endMinute){
        if(nowTimeSecond < 60){
          setNowTimeSecond((nowTimeSecond) => nowTimeSecond + 1);
        } else{
          setNowTimeMinute((nowTimeMinute) => nowTimeMinute + 1);
          setNowTimeSecond(0);
        }
      } else if(nowTimeMinute === endMinute){
        if(nowTimeSecond < endSecond){
          setNowTimeSecond((nowTimeSecond) => nowTimeSecond + 1);
        } 
      } 
    }, 1000);
    return () => clearInterval(id);
  }, [nowTimeMinute, nowTimeSecond, endMinute, endSecond])

  return {
    nowTimeMinute, nowTimeSecond
  }
}