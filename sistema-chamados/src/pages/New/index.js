import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { FiPlusCircle } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import {
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

import "./new.css";

const listRef = collection(db, "customers");

function New() {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [complemento, setComplemento] = useState("");
  const [idCustomer, setIdCustomer] = useState(false);
  const [assunto, setAssunto] = useState("Suporte");
  const [status, setStatus] = useState("Aberto");

  useEffect(() => {
    const loadCustomers = async () => {
      const querySnapshot = await getDocs(listRef)
        .then(snapshot => {
          const customers = [];
          snapshot.forEach(doc => {
            customers.push({
              id: doc.id,
              nomeFantasia: doc.data().nomeFantasia,
            });
          });
          if (snapshot.docs.size === 0) {
            setCustomers([{ id: "1", nomeFantasia: "FREELA" }]);
            setLoadCustomer(false);
            return;
          }
          setCustomers(customers);
          setLoadCustomer(false);

          if (id) {
            loadId(customers);
            setIdCustomer(true);
          }
        })
        .catch(error => {
          console.log("Erro ao buscar os clientes, error");
          setLoadCustomer(false);
          setCustomers([{ id: "1", nomeFantasia: "FREELA" }]);
        });
    };

    loadCustomers();
  }, [id]);

  async function loadId(customers) {
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
      .then(snapshot => {
        const { assunto, status, complemento, clienteId } =
          snapshot.data() || {};
        setAssunto(assunto);
        setStatus(status);
        setComplemento(complemento);

        // Nova coisa para comentar
        
        let customerIndex = customers.findIndex(
          item => item.id === clienteId
        );
        setSelectedCustomer(customerIndex);
      })
      .catch(error => {
        console.log(error);
        setIdCustomer(false);
      });
  }

  const handleOptionChange = e => {
    setStatus(e.target.value);
  };

  const handleChangeCustomer = e => {
    setSelectedCustomer(e.target.value);
  };

  const handleRegister = async e => {
    e.preventDefault();

    // Registrar um chamado

    if (idCustomer) {
      const docRef = doc(db, "chamados", id);
      await updateDoc(docRef, {
        cliente: customers[selectedCustomer].nomeFantasia,
        clienteId: customers[selectedCustomer].id,
        assunto,
        complemento,
        status,
        userId: user.uid,
      })
        .then(() => {
          toast.info("Chamado atualizado!");
          setSelectedCustomer(0);
          return navigate("/dashboard");
        })
        .catch(error => {
          toast.error("Ops, erro ao atualizar esse chamado!");
        });

      return;
    }

    await addDoc(collection(db, "chamados"), {
      created: new Date(),
      cliente: customers[selectedCustomer].nomeFantasia,
      clienteId: customers[selectedCustomer].id,
      assunto,
      complemento,
      status,
      userId: user.uid,
    })
      .then(() => {
        toast.success("Chamado registrado!");
        setComplemento("");
        setStatus("");
        setAssunto("Suporte");
        setStatus("Aberto");
        setSelectedCustomer(0);
      })
      .catch(error => {
        toast.error("Ops erro ao registrar, tente mais tarde!");
      });
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Title title={id ? "Editando Chamado" : "Novo Chamado"}>
          <FiPlusCircle size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={handleRegister}>
            <label>Clientes</label>
            {loadCustomer ? (
              <input type="text" disabled={true} value="Carregando..." />
            ) : (
              <select
                value={selectedCustomer}
                onChange={handleChangeCustomer}>
                {customers.map((customer, index) => {
                  return (
                    <option key={index} value={index}>
                      {customer.nomeFantasia}
                    </option>
                  );
                })}
              </select>
            )}

            <label>Assunto</label>
            <select
              value={assunto}
              onChange={e => setAssunto(e.target.value)}>
              <option value="Suporte">Suporte</option>
              <option value="Visita Tecnica">Visita Técnica</option>
              <option value="Financeiro">Financeiro</option>
            </select>
            <label>Status</label>
            <div className="status">
              <input
                type="radio"
                name="radio"
                value="Aberto"
                onChange={handleOptionChange}
                checked={status === "Aberto"}
              />
              <span>Em aberto</span>
              <input
                type="radio"
                name="radio"
                value="Progresso"
                onChange={handleOptionChange}
                checked={status === "Progresso"}
              />
              <span>Progresso</span>
              <input
                type="radio"
                name="radio"
                value="Atendido"
                onChange={handleOptionChange}
                checked={status === "Atendido"}
              />
              <span>Atendido</span>
            </div>

            <label>Complemento</label>
            <textarea
              type="text"
              placeholder="Descreva seu problema (opcional)"
              value={complemento}
              onChange={e => setComplemento(e.target.value)}></textarea>

            <button type="submit">Registrar</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default New;
