import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiSettings, FiUpload } from "react-icons/fi";
import "./profile.css";
import avatar from "../../assets/avatar.png";

import { db, storage } from "../../services/firebaseConnection";
import { doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { toast } from "react-toastify";

function Profile() {
  const { user, setUser, storageUser, logout } = useContext(AuthContext);
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);
  const [nome, setNome] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  function handleFile(event) {
    const image = event.target.files[0];

    if (image?.type === "image/jpeg" || image?.type === "image/png") {
      setImageAvatar(image);
      setAvatarUrl(URL.createObjectURL(image));
    } else {
      alert("Envie uma imagem do tipo PNG ou JPEG!");
      setImageAvatar(null);
      return;
    }
  }

  async function handleUpload() {
    const currentUid = user.uid;

    const uploadRef = ref(
      storage,
      `images/${currentUid}/${imageAvatar.name}`
    ); // Passa também o caminho que a imagem irá ficar armazenada

    const uploadTask = await uploadBytes(uploadRef, imageAvatar) // Passa a Referencia e o arquivo.
      .then(snapshot => {
        getDownloadURL(snapshot.ref).then(async downloadURL => {
          const urlFoto = downloadURL;
          const docRef = doc(db, "users", user.uid);
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome,
          });
          const data = {
            ...user,
            nome,
            avatarUrl: urlFoto,
          };

          setUser(data);
          storageUser(data);
          toast.success("Perfil atualizado com sucesso!");
        });
      })
      .catch(error => {
        toast.error("Erro ao enviar sua imagem, tente novamente!");
      });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (imageAvatar === null && nome !== "") {
      // Atualizar apenas o nome do usuário
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome,
      }).then(() => {
        const data = {
          ...user,
          nome,
        };

        setUser(data);
        storageUser(data);
        toast.success("Perfil atualizado com sucesso!");
      });
    } else if (nome !== "" && imageAvatar != null) {
      handleUpload();
    }
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title title={"Minha conta"}>
          <FiSettings size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label htmlFor="avatarUpload" className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>

              <input
                type="file"
                id="avatarUpload"
                accept="image/*"
                onChange={handleFile}
              />
              <br />
              <img
                src={avatarUrl === null ? avatar : avatarUrl}
                alt="Foto de perfil"
                width={250}
                height={250}
              />
            </label>

            <label>Nome</label>
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />
            <label>Email</label>
            <input
              type="text"
              placeholder="teste@teste.com"
              disabled={true}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit">Salvar</button>
          </form>
        </div>
        <div className="container">
          <button className="logout-btn" onClick={() => logout()}>
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
