import { useState, useEffect } from 'react'
import './favoritos.css'
import { Link } from 'react-router-dom'

function Favoritos() {

    const [films, set_films] = useState([])

    const excluirFilme = film_id => {
        const updated_list = films.filter(film => film.id !== film_id)
        set_films(updated_list)
        localStorage.setItem("@primeflix", JSON.stringify(updated_list))
    }

    useEffect(() => {

        const my_list = localStorage.getItem("@primeflix")
        set_films(JSON.parse(my_list) || [])
        document.title = "Favoritos"

    }, [])

    return (

        <div className="meus-filmes">
            <h1>Meus filmes</h1>

            {
                films.length === 0 && 
                    <span style={
                        {
                            marginTop: "14px"
                        }
                    }>Você não possui nenhum filme salvo! 😞</span>
            }

            <ul>
                {
                    films.map(film => {
                        return (

                            <li key={film.id}>
                                <span>{film.title}</span>
                                <div>
                                    <Link to={`/filme/${film.id}`}>Ver detalhes</Link>
                                    <button onClick={() => excluirFilme(film.id)}>Excluir</button>
                                </div>
                            </li>

                        )
                    })

                }
            </ul>

        </div>

    )

}

export default Favoritos