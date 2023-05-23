import useTimer from "../hooks/useTimer";

const Timer = ({start, end}) => {
  const { nowTimeMinute, nowTimeSecond } = useTimer(start, end);
  
  return (<div>
    <h1>
      {`${nowTimeMinute} : ${nowTimeSecond}`}
    </h1>
  </div>)
}

export default Timer;

