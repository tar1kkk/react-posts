import React, { useState } from "react";

function UseState() {
	const [value, setValue] = useState('Welcome to my social club)');
	return (
		<div>
			<h2 value={value}>{value}</h2>
			<input value={value} onChange={event => setValue(event.target.value)}></input>
		</div>
	)
}

export default UseState;