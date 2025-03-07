import {useEffect, useState} from "react";
import "./App.css";
import Auth from "./Auth.jsx";
import {auth} from "./firebase-config";

function App() {
    const [user, setUser] = useState(null);
    const [text, setText] = useState("");
    const [result, setResult] = useState([]);
    const [nextPage, setNextPage] = useState(0);
    const num = 50;

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
        });
        return () => unsubscribe();
    }, []);

    const eventHandler = (event) => setText(event.target.value);

    const clickHandler = async (click) => {
        click.preventDefault();
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BASE_URL}/images?query=${text}&num=${num}&page=${nextPage || 1}`,
                {method: "GET"}
            );
            const json = await response.json();
            setResult(json.images);
            setNextPage(json.nextPage);
        } catch (error) {
            console.error("Errore durante il recupero delle immagini:", error);
        }
    };

    if (!user) {
        return <Auth/>;
    }
    return (
        <>
            <nav className="navbar">
                <div>
                    <button className="logout-button" onClick={() => auth.signOut()}>Logout</button>
                </div>
            </nav>

            <div className="container">
                <form className="form-container" onSubmit={clickHandler}>
                    <input className="input-text" type="text" onChange={eventHandler} required/>
                    <button className="submit-button" type="submit">Invia</button>
                    {nextPage ? <button> Next page: {nextPage}</button> : null}
                </form>

                <div className="flex">
                    {result.map((image) => (
                        <div key={image.thumbnailUrl} className="flex-vertical">
                            <a href={image.imageUrl} target="_blank" rel="noopener noreferrer">
                                <img src={image.thumbnailUrl} alt={image.title} style={{height: 200, width: 250}}/>
                            </a>
                            <h4>{image.title}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
