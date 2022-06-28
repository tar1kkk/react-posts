import React from 'react';
import styles from './Mymodal.module.css';

function Mymodal({ children, visible, setVisible }) {
	const rootClasses = [styles.myModal]
	if (visible) {
		rootClasses.push(styles.active)
	}
	return (
		<div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
			<div className={styles.myModalContent} onClick={e => e.stopPropagation()}>
				{children}
			</div>
		</div>
	);
}

export default Mymodal;