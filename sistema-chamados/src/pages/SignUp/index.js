import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/auth";
import "./signUp.css";

import logo from "../../assets/logo.png";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signUp, loadingAuth } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();

    if (name !== "" && email !== "" && password !== "") {
      await signUp(email, password, name);
    }
  }

  return (
    <div className="container-center">
      <div className="register">
        <div className="register-area">
          <img src={logo} alt="Logo do sistema de chamados." />
        </div>

        <form onSubmit={handleSubmit}>
          <h1>Nova conta</h1>
          <input
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="email@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">
            {loadingAuth ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>
      </div>
    </div>
  );
}

export default SignUp;
