import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../services/firebaseConnection";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { toast } from "react-toastify";

const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStorageData = localStorage.getItem("@ticketsPro");
    if (userStorageData) {
      setUser(JSON.parse(userStorageData));
    }
    setLoading(false);
  }, []);

  const navigate = useNavigate();

  const signIn = async (email, password) => {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);
        const userDataFromDB = docSnap.data();

        const userData = {
          uid,
          nome: userDataFromDB.nome,
          email: value.user.email,
          avatarUrl: userDataFromDB.avatarUrl,
        };

        setUser(userData);
        storageUser(userData);
        toast.success("Bem vindo de volta!");
        navigate("/dashboard");
      })
      .catch(error => {
        toast.error("Ops, algo deu errado!");
      });
    setLoadingAuth(false);
  };

  const signUp = async (email, password, name) => {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async value => {
        const uid = value.user.uid;

        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          const userData = {
            uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };
          setUser(userData);
          storageUser(userData);
          toast.success("Seja bem vindo ao sistema!");
          navigate("/dashboard");
        });
      })
      .catch(error => {
        toast.error("Ops, algo deu errado!");
      });

    setLoadingAuth(false);
  };

  function storageUser(userData) {
    localStorage.setItem("@ticketsPro", JSON.stringify(userData));
  }

  async function logout() {
    await signOut(auth);
    localStorage.removeItem("@ticketsPro");
    setUser(null);
  }

  const contextValue = {
    signed: !!user,
    user,
    signIn,
    signUp,
    loadingAuth,
    loading,
    logout,
    storageUser,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
export default AuthProvider;
