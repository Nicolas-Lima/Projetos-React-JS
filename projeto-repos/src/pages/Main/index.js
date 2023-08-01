import { useState, useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub,
  FaPlus,
  FaSpinner,
  FaBars,
  FaTrash,
} from "react-icons/fa";
import {
  Container,
  Form,
  SubmitButton,
  List,
  DeleteButton,
} from "./styles";

import api from "../../services/api";

import { toast } from "react-toastify";

function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  // Buscar

  useEffect(() => {
    const storedRepos = localStorage.getItem("repos");
    if (storedRepos) {
      setRepositorios(JSON.parse(storedRepos));
    }
  }, []);

  // Salvar alterações

  useEffect(() => {
    if (repositorios && repositorios.length) {
      localStorage.setItem("repos", JSON.stringify(repositorios));
    }
  }, [repositorios]);

  const handleInputChange = e => {
    setNewRepo(e.target.value);
  };

  const handleDelete = useCallback(
    repo => {
      const findRepo = repositorios.filter(r => r.name !== repo);
      setRepositorios(findRepo);
    },
    [repositorios]
  );

  useEffect(() => {
    console.clear();
    console.group("Documentar");
    console.log("Documentar STYLED COMPONENTS se tiver algo novo");
    console.log("Documentar Hook 'useCallback' se tiver algo novo");
    console.groupEnd();
  }, []);

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      setLoading(true);

      const submit = async () => {
        try {
          if (newRepo.trim() === "") {
            toast.error("Você precisa indicar um repositório!", {
              toastId: "emptyNewRepoInput",
            });
            return;
          }

          toast.dismiss("emptyNewRepoInput");

          const response = await api.get(`repos/${newRepo}`);

          const alreadyHasRepo = repositorios.find(
            repo => repo.name === newRepo
          );

          if (alreadyHasRepo) {
            toast.error("Você já possui este repositório em sua lista!", {
              toastId: "alreadyHasRepo",
            });
          } else {
            toast.dismiss("alreadyHasRepo");

            const data = {
              name: response.data.full_name,
            };

            setRepositorios([...repositorios, data]);
            setNewRepo("");
          }
        } catch (error) {
          const errorMessage = error?.response?.data?.message;
          toast.dismiss("emptyNewRepoInput");
          toast.dismiss("alreadyHasRepo");
          switch (errorMessage) {
            case "Not Found":
              toast.error("Esse repositório não existe!", {
                toastId: "repoNotFound",
              });
              break;
          }
        } finally {
          setLoading(false);
        }
      };

      submit();
    },
    [newRepo, repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub size={25} />
        Meus Repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositórios"
          value={newRepo}
          onChange={handleInputChange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#fff" size={14} />
          ) : (
            <FaPlus color="#fff" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map((repo, index) => (
          <li key={`${repo.name}-${index}`}>
            <span>
              <DeleteButton
                size={14}
                onClick={() => handleDelete(repo.name)}>
                <FaTrash />
              </DeleteButton>
              {repo.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

export default Main;
