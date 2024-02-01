import { VscDebugStart } from 'react-icons/vsc';
import { useGameStatus } from '../../contexts/GameSettingsProvider';
import "./startbutton.styles.css";

const StartButton = ({ text, createNewGame, className }: { text: string; createNewGame: () => void; className?: string }) => {
    const [, setHasGameStarted] = useGameStatus();
    
    return (
        <button
            type="button"
            onClick={() => {
                createNewGame();
                setHasGameStarted(true);
            }}
            className={`base-button ${className ? className : 'start-button'}`}>
            {text}
            <VscDebugStart />
        </button>
    )
}

export default StartButton