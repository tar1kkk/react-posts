import React from 'react';

function MySelect({ options, defaultValue, value, onChange }) {
	return (
		<select value={value} onChange={event => onChange(event.target.value)}>
			<option disabled value=''>{defaultValue}</option>
			{
				options.map((op, index) =>
					<option value={op.value} key={index + 1}>
						{op.name}
					</option>
				)
			}
		</select >
	);
}

export default MySelect;