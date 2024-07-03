export const getChangeColour = (percentChange) => {
	return percentChange < 0 ? "#ec3c3c" : "#81d481";
};

export const getChangeIcon = (percentChange) => {
	return percentChange < 0 ? (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			width={24}
			height={24}>
			<path
				fill="#ec3c3c"
				d="M182.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-9.2-9.2-11.9-22.9-6.9-34.9s16.6-19.8 29.6-19.8H288c12.9 0 24.6 7.8 29.6 19.8s2.2 25.7-6.9 34.9l-128 128z"
			/>
		</svg>
	) : (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 320 512"
			width={24}
			height={24}>
			<path
				fill="#81d481"
				d="M182.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2-9.2-11.9-22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
			/>
		</svg>
	);
};

export const formatNumber = (number) => {
	return new Intl.NumberFormat().format(number);
};
