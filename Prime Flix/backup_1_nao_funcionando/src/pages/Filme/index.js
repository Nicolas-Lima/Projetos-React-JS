import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from "../../services/api.js"
import "./filme.css"
import { toast } from 'react-toastify'

function Filme() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [film, set_film] = useState({})
    const [loading, set_loading] = useState(true)

    useEffect(() => {
        if(film.title) {
            document.title = film.title
        }
    }, [film])

    useEffect(() => {
        async function load_film() {
            set_loading(true)
            await api.get(`movie/${id}`, {
                params: {
                    api_key: "361d3e82b80b4bb3eda22e71f955d7a9",
                    language: "pt-br"
                }
            })
                .then(response => {
                    set_film(response.data)
                })
                .catch(error => {
                    navigate('/', {
                        replace: true
                    })

                    return
                })

            set_loading(false)
        }
        load_film()
    }, [navigate, id])

    const save_film = () => {
        const my_list = localStorage.getItem("@primeflix")
        const saved_films = JSON.parse(my_list) || []
        const already_saved = saved_films.some(saved_film => 
            saved_film.id === film.id
        )
        if(already_saved) {
            toast.warn('Este filme já está salvo!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }

        saved_films.push(film)
        localStorage.setItem("@primeflix", JSON.stringify(saved_films))
        toast.success('Filme salvo com sucesso!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
    }

    if (loading) {
        return (
            <div className="loading-info">
                <h2>Carregando detalhes...</h2>
            </div>
        )
    }

    return (
        <div className="filme-info">
            <img src={`https://image.tmdb.org/t/p/original/${film.backdrop_path}`} alt={film.title} />

            <h3>Sinopse</h3>
            <span>{film.overview}</span>

            <strong>Avaliação {film.vote_average} / 10</strong>

            <div className="area-buttons">
                <button onClick={save_film}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${film.title}`} target="_blank" rel="noreferrer">
                        {/* rel="external" = Fala para o navegador que o link é externo e você não possui controle sobre. */}
                        Trailer
                    </a>
                </button>
            </div>

        </div>
    )
}

export default Filme