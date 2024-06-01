import Tooltip from "@mui/material/Tooltip";

export default ({ value, onChange, placeholder, error, type, tooltipTitle }) => {
	return (
		<div style={{ margin: "8px 0px" }} >
			<Tooltip title={tooltipTitle} disableInteractive>
				<input
					className="input"
					placeholder={placeholder}
					type={type}
					style={{width: "100%"}}
					value={ (value) ? value : ''}
					onChange={onChange}
				/>
			</Tooltip>
			{error && <span style={{color: 'red'}}>{error}</span>}
		</div>
	);
};