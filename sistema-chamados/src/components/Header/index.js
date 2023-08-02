import avatarImg from "../../assets/avatar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import { FiHome, FiUser, FiSettings } from "react-icons/fi"

import "./header.css";

function Header() {
  const { user } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl ? user.avatarUrl : avatarImg}
          alt="Foto do usuário"
        />
      </div>

      <Link to="/dashboard">
        <FiHome color="#FFF" size={24} />
        <span>Chamados</span>
      </Link>

      <Link to="/customers">
        <FiUser color="#FFF" size={24} />
        <span>Clientes</span>
      </Link>

      <Link to="/profile">
        <FiSettings color="#FFF" size={24} />
        <span>Perfil</span>
      </Link>
    </div>
  );
}

export default Header;
