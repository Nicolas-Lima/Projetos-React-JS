import { useState, useEffect } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  PageActions,
  FilterList,
} from "./styles.js";
import { FaArrowLeft } from "react-icons/fa";

function Repositorio() {
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [issuesFilter, setIssuesFilter] = useState("open");

  const { repositorio: nomeRepo } = useParams();

  useEffect(() => {
    const load = async () => {
      const [{ data: repoData }, { data: repoIssues }] = await Promise.all(
        [
          api.get(`repos/${nomeRepo}`),
          api.get(`repos/${nomeRepo}/issues`, {
            params: {
              state: "open",
              per_page: 5,
            },
          }),
        ]
      );

      if (repoData) {
        setRepositorio(repoData);
      }

      if (repoIssues) {
        setIssues(repoIssues);
      }
      setLoading(false);
    };

    load();
  }, []);

  useEffect(() => {
    const loadIssue = async () => {
      const response = await api.get(`repos/${nomeRepo}/issues`, {
        params: {
          state: issuesFilter,
          page,
          per_page: 5,
        },
      });

      setIssues(response.data);
    };

    loadIssue();
  }, [page, issuesFilter]);

  const handlePage = action => {
    setPage(action === "back" ? page - 1 : page + 1);
  };

  const handleIssuesFilterChange = state => {
    if (state) {
      setIssuesFilter(state);
      setPage(1);
    }
  };

  if (loading) {
    return (
      <Loading>
        <h1>Carregando</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          fill="currentColor"
          className="bi bi-arrow-clockwise"
          viewBox="0 0 16 16">
          <path
            fillRule="evenodd"
            d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
          />
          <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
        </svg>
      </Loading>
    );
  }

  const FilterButton = ({ filter }) => {
    const filterInLowerCase = filter.toLowerCase();
    return (
      <button
        onClick={() => handleIssuesFilterChange(filterInLowerCase)}
        filterselected={issuesFilter === filterInLowerCase ? "1" : "0"}>
        {filter}
      </button>
    );
  };

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#000" size={30} />
      </BackButton>
      <Owner>
        <img
          src={repositorio.owner.avatar_url}
          alt={repositorio.owner.login}
        />

        <h1>{repositorio.name}</h1>
        <p>{repositorio.description}</p>
      </Owner>
      <FilterList>
        <FilterButton filter="Open" />
        <FilterButton filter="Closed" />
        <FilterButton filter="All" />
      </FilterList>
      <IssuesList>
        {issues.map(issue => {
          return (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.title}
                  </a>
                  {issue.labels.map(label => {
                    return (
                      <span key={String(label.id)}>{label.name}</span>
                    );
                  })}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          );
        })}
      </IssuesList>

      <PageActions>
        <button
          type="button"
          onClick={() => handlePage("back")}
          disabled={page < 2}>
          Voltar
        </button>
        <button type="button" onClick={() => handlePage("next")}>
          Próxima
        </button>
      </PageActions>
    </Container>
  );
}

export default Repositorio;
