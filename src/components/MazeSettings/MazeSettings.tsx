import { useEffect, useRef, useState } from "react";
import { useGameSettings } from "../../contexts/GameSettingsProvider";
import { IoSettings } from "react-icons/io5";
import "./mazesettings.styles.css";
import StartButton from "../StartButton/StartButton";

const MazeSettings = ({ createNewGame }: { createNewGame: () => void; }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [settings, setSettings] = useGameSettings();
	const wrapperRef = useRef<HTMLElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target as HTMLElement)) {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside, true);
		return () => {
			document.removeEventListener("click", handleClickOutside, true);
		};
	}, []);

	const onInputChange = (e: { target: { value: string; id: string; }; }) => {
		const id = e.target.id;
		setSettings((currentSettings => ({ ...currentSettings, [id]: e.target.value })));
	};

	return (
		<section className='settings-icon' ref={wrapperRef}>
			<IoSettings size={40} onClick={() => setIsOpen(!isOpen)} className='dropdown-button' />
			{isOpen ?
				<div className='dropdown'>
					<div className='input-wrapper'>
						<label id='difficulty'>Difficulty ({settings.difficulty}): </label>
						<input type="range" min="1" max="10" value={settings.difficulty} id="difficulty" onChange={onInputChange} />
					</div>
					<div className='input-wrapper'>
						<label id='maxWidth'>Maze width ({settings.maxWidth}): </label>
						<input type="range" min="15" max="25" value={settings.maxWidth} id="maxWidth" onChange={onInputChange} />
					</div>
					<div className='input-wrapper'>
						<label id='maxHeight'>Maze height ({settings.maxHeight}): </label>
						<input type="range" min="15" max="25" value={settings.maxHeight} id="maxHeight" onChange={onInputChange} />
					</div>
					<StartButton text="Set up game" createNewGame={createNewGame} className="regenerate-start-button" />
				</div> : null}
		</section>
	);
};

export default MazeSettings;