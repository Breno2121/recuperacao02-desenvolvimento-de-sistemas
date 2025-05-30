'use client'

import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import './styles.css';

type Dev = {
  id: string;
  name: string;
  tech: string;
  description: string;
}


export default function Page() {
  const [devs, setDevs] = useState<Dev[]>([]);
  const [name, setName] = useState<any>();
  const [tech, setTech] = useState<any>();
  const [description, setDescription] = useState<any>();

  useEffect(() => {
    loadDevs();
  })

  async function loadDevs() {
    const response = await axios.get("http://localhost:3333/devs");
    const postDevs = response.data

    setDevs(postDevs)
  }

  async function handleCreateDev(event: FormEvent) {
    event.preventDefault()
    const Dev = {
      name: name,
      tech: tech,
      description: description
    };

    await axios.post("http://localhost:3333/devs", Dev);
    setName("")
    setTech("")
    setDescription("")

    await loadDevs();
  }

  async function handleDeleteDev(id: string) {
    // FAZ CHAMADA DO TIPO DELETE A API (JSON-SERVER)
    // CHAMA O LOADDEVS PARA ATUALIZAR OS DEVS
  }

  return (
    <body className="body">
      <div className="container-principal">
        <div className="container-cadastro">
          <div className="container-cabecalho">
            <h3>Cadastro</h3>
            <div className="inputs">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" />
              <input value={tech} onChange={(e) => setTech(e.target.value)} placeholder="Tecnologias" />
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descrição" />
              <button type="submit" onClick={handleCreateDev}>Cadastrar</button>
            </div>
          </div>
        </div>
        <div className="container-devs">
          <ul>
            {devs.map(Dev => (
              <li key={Dev.id}>
                <strong>{Dev.name}</strong> - {Dev.tech}
                <p>{Dev.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </body>
  )
}
