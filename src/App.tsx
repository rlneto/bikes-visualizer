import React, { useState, useEffect, useCallback } from "react";

const App: React.FC = () => {
	const [image, setImage] = useState<string>("");
	const [isMouseDown, setIsMouseDown] = useState<boolean>(false);

	const centerImage = "007_007.jpg";
	const imagePath = "/bikes/";
	const imageSize = 100;

	const loadImage = useCallback((imageName: string) => {
		const imageUrl = `${imagePath}${imageName}`;
		setImage(imageUrl);
	}, []);

	useEffect(() => {
		loadImage(centerImage);
	}, [loadImage]);

	const handleMove = useCallback(
		(event: React.MouseEvent<HTMLDivElement>) => {
			if (isMouseDown) {
				const clientX = event.clientX;
				const clientY = event.clientY;
				const i = Math.min(
					Math.max(Math.floor(clientX / imageSize), 0),
					14
				)
					.toString()
					.padStart(3, "0");
				const j = Math.min(
					Math.max(Math.floor(clientY / imageSize), 0),
					14
				)
					.toString()
					.padStart(3, "0");
				const imageName = `${i}_${j}.jpg`;
				loadImage(imageName);
			}
		},
		[isMouseDown, loadImage]
	);

	const handleDown = (event: React.MouseEvent<HTMLDivElement>) => {
		if ("button" in event && event.button !== 0) return;
		event.preventDefault();
		setIsMouseDown(true);
	};

	const handleUp = () => {
		setIsMouseDown(false);
	};

	const handleOrientation = useCallback(
		(event: DeviceOrientationEvent) => {
			const { beta, gamma } = event; // beta is front-to-back tilt in degrees (0-180), gamma is left-to-right tilt (-90 to 90)
			if (beta !== null && gamma !== null) {
				const x = ((gamma + 90) / 180) * imageSize;
				const y = ((beta + 180) / 360) * imageSize;
				const i = Math.min(Math.max(Math.floor(x / imageSize), 0), 14)
					.toString()
					.padStart(3, "0");
				const j = Math.min(Math.max(Math.floor(y / imageSize), 0), 14)
					.toString()
					.padStart(3, "0");
				const imageName = `${i}_${j}.jpg`;
				loadImage(imageName);
			}
		},
		[loadImage, imageSize]
	);

	useEffect(() => {
		window.addEventListener("deviceorientation", handleOrientation);
		return () => {
			window.removeEventListener("deviceorientation", handleOrientation);
		};
	}, [handleOrientation]);

	return (
		<div
			onMouseMove={handleMove}
			onMouseDown={handleDown}
			onMouseUp={handleUp}
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
				overflow: "hidden",
				margin: "auto",
			}}
		>
			{image && (
				<img
					src={image}
					alt="Matrix View"
					style={{
						maxWidth: "100%",
						maxHeight: "100%",
						objectFit: "contain",
					}}
					onError={(e) => {
						e.currentTarget.src = "404.jpg";
					}}
				/>
			)}
		</div>
	);
};

export default App;
