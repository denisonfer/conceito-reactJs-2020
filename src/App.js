import React, { useEffect, useState } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositorios, setRepositorios] = useState([]);

  async function getData() {
    const { data } = await api.get("repositories");

    setRepositorios(data);
  }

  useEffect(() => {
    getData();
  }, []);

  async function handleAddRepository() {
    const { data } = await api.post("repositories", {
      title: "Menu 3D animado",
      url: "https://github.com/denisonfer/menu-3d-animado-rn",
      techs: ["react-native", "react-native-reanimated"],
    });

    setRepositorios([...repositorios, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    getData();
  }

  return (
    <div>
      <button onClick={handleAddRepository}>Adicionar</button>

      <ul data-testid="repository-list">
        {repositorios.map((repo) => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
