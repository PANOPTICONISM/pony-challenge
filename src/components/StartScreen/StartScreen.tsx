import "./startscreen.styles.css"
import StartButton from '../StartButton/StartButton';

const StartScreen = ({ createNewGame }: { createNewGame: () => void }) => {

    return (
        <div className="wrapper">
            <header>
                <h1>Help save the pony!</h1>
            </header>
            <main>
                <section className="introduction">
                    <h2>The story</h2>
                    <p>AppleJack was so distracted that she didn't see the tangled maze in front of her, and… Oh no! Now she is lost and cannot find her way out!
                        Every maze worthy of its name has a monster protecting it - oh no, it's a Domokun! It is now very angry and is chasing our little friend.
                        Will you help our trapped pony find her way through the maze and rescue her from the Domokun?</p>
                    <h2>Instructions</h2>
                    <p>Using the arrow keys in your keyboard, help AppleJack (yellow) reach the exit (green ball) and escape the monster (brown).</p>
                    <p>You can increase the game's difficulty in the settings panel.</p>
                </section>
                <StartButton text='Start game' createNewGame={createNewGame} />
            </main>
        </div>
    );
}

export default StartScreen;