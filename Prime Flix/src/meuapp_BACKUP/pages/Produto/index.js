import { useParams } from "react-router-dom"

function Produto() {

    const { id } = useParams()

    return (

        <div>
            Meu Produto é {id}
        </div>

    )

}

export default Produto