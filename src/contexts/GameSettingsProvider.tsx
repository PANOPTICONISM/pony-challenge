import { createContext, useContext, useMemo, useState } from "react";

type SettingsProps = {
    difficulty: string;
    maxWidth: string;
    maxHeight: string;
}

type GameSettingsContextValue = {
    hasGameStarted: boolean;
    setHasGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    settings: SettingsProps;
    setSettings: React.Dispatch<React.SetStateAction<SettingsProps>>;
	hasGameFinished: boolean;
    setHasGameFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameSettingsContext = createContext<GameSettingsContextValue | null>(null);

export const GameSettingsProvider = ({ children }: { children: React.ReactNode; }) => {
	const [hasGameStarted, setHasGameStarted] = useState(false);
	const [settings, setSettings] = useState<SettingsProps>({
		difficulty: "1",
		maxWidth: "15",
		maxHeight: "15",
	});
	const [hasGameFinished, setHasGameFinished] = useState(false);

	const value = useMemo(() => (
		{
			hasGameStarted, setHasGameStarted, settings, setSettings, hasGameFinished, setHasGameFinished
		}
	), [hasGameFinished, hasGameStarted, settings]);

	return (
		<GameSettingsContext.Provider value={value}>
			{children}
		</GameSettingsContext.Provider>
	);
};

const useNullableGameSettingsContext = () => useContext(GameSettingsContext);

const useGameSettingsContext = () => {
	const context = useNullableGameSettingsContext();
	if (context === null) {
		throw new Error("No GameSettingsContext defined.");
	}
	return context;
};

export const useGameStatus = () => {
	const context = useGameSettingsContext();
	return useMemo(() => [context.hasGameStarted, context.setHasGameStarted, context.hasGameFinished, context.setHasGameFinished] as const, [context.hasGameFinished, context.hasGameStarted, context.setHasGameFinished, context.setHasGameStarted]);
};

export const useGameSettings = () => {
	const context = useGameSettingsContext();
	return useMemo(() => [context.settings, context.setSettings] as const, [context.setSettings, context.settings]);
};