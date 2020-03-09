import React, { useEffect, useState, useRef } from "react";

const ModalHook = () => {
	const node = useRef();
	
	const [open, setOpen] = useState(false);
	
	const handleClick = e => {
		if (node.current.contains(e.target)) {
			//inside click
			return;
		}
		//outside click
		setOpen(false);
	};
	
	const handleChange = () => {
		setOpen(false);
	}
	
	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		
		return() => {
			document.removeEventListener("mousedown", handleClick);
		};
	}, []);
	
	return (
		<div ref={node}>
			text inside ref=node
		</div>
	);
}//ModalHook

export default ModalHook;