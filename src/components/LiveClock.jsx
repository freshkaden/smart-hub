import { useState, useEffect } from 'react';
function LiveClock(){
	const [time, setTime] = useState(new Date());

	useEffect(() => {
		const timerID = setInterval(() => {
			setTime(new Date());
		}, 1000);
		//cleanup function
		return () => {
			clearInterval(timerID);
			console.log("clock stop");
		};
		}, []);


	return (
		<div className="Live-Clock-Class">
			<h2 className="time-heading">Local Time: </h2>
			<div className="live-time-display">{time.toLocaleTimeString()} </div>
		</div>
	);
}

export default LiveClock;

