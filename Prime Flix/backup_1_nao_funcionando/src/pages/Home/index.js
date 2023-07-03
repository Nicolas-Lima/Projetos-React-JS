import { useEffect, useState } from 'react'
import api from "../../services/api" 
import { Link } from "react-router-dom"
import "./home.css"

function Home() {

    const [ films, set_films ] = useState([]) 
    const [loading, set_loading] = useState(false)

    useEffect(() => {   
        document.title = "Prime Flix"
        async function loadFilms() {
            set_loading(true)
            const response = await api.get("movie/now_playing", {
                params: {
                    api_key: "361d3e82b80b4bb3eda22e71f955d7a9",
                    language: "pt-BR",
                    page: 1
                }
            }) 

            set_films(response.data.results.slice(0, 10))
            set_loading(false)

        }

        loadFilms()

    }, [])

    if(loading) {
        return (
            <div className="loading">
                <h2>Carregando filmes...</h2>
            </div>
        )
    }

    return (
        <div className="container">
            <div className="lista-filmes">
                {
                    films.map(film => {
                        return (

                            <article key={film.id}>
                                <strong>{film.title}</strong>
                                <img src={`https://image.tmdb.org/t/p/original/${film.poster_path}`} alt={film.title} />
                                <Link to={`filme/${film.id}`}>Acessar</Link>

                            </article>

                        )
                    })
                }
            </div>
    
        </div>
    )
}

export default Home