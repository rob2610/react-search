import {useState} from 'react'
import './App.css'

function App() {
    const [text, setText] = useState('')
    const [result, setResult] = useState([])
    const [nextPage, setNextPage] = useState(0)
    const eventHandler = (event) => setText(event.target.value)
    const clickHandler = async (click) => {
        click.preventDefault()
        const response = await fetch(`${import.meta.env.VITE_BASE_URL}/images?query=${text}&page=${nextPage || 1}`, {method: 'GET'})
        const json = await response.json()
        setResult(json.images)
        setNextPage(json.nextPage)
    }

    return (
        <>
            <div>
                <form className="form-container" onSubmit={clickHandler}>
                    <input className="input-text" type="text" onChange={eventHandler} required/>
                    <button className="submit-button" type="submit"> Invia</button>
                    {nextPage ? <button> Next page: {nextPage}</button> : null}
                </form>

                <div className="flex">
                    {result.map((image, index) =>
                        <div key={image.thumbnailUrl} className="flex-vertical">
                           <a href={image.imageUrl} target="_blank"><img src={image.thumbnailUrl} style={{height: 200, width: 250}}/></a>
                            <h4>{image.title}</h4>
                        </div>)}
                </div>
            </div>
        </>

    )
}

export default App
