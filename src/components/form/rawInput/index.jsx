export default ({ value, onChange, placeholder, error, type }) => {
	return (
		<div style={{ margin: "8px 0px" }} >
			<input
				className="input"
				placeholder={placeholder}
				type={type}
				style={{ width: "100%"}}
				value={value}
				onChange={onChange}
			/>
			{error && <span style={{ color: 'red' }}>{error}</span>}
		</div>
	);
};