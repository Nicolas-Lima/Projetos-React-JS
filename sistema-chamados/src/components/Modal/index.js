import "./modal.css";
import { FiX } from "react-icons/fi";

function Modal({ conteudo, close }) {
  const { cliente, assunto, status, complemento, createdFormat } =
    conteudo;

  return (
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={25} color="#fff" />
          Voltar
        </button>

        <main>
          <h2>Detalhes do chamado</h2>
          <div className="row">
            <span>
              Cliente: <i>{cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Assunto: <i>{assunto}</i>
            </span>
            <span>
              Cadastrado em: <i>{createdFormat}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Status:{" "}
              <i
                className="status-badge"
                style={{
                  color: "#fff",
                  backgroundColor:
                    status === "Aberto" ? "#5cb85c" : "#999",
                }}>
                {status}
              </i>
            </span>
          </div>

          {complemento.trim() !== "" && (
            <>
              <h3>Complemento</h3>
              <p>{complemento}</p>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Modal;
