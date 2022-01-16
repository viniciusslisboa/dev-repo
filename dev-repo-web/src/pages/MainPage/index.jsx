import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

import "./styles.css";

import Nav from "../../components/Nav";
import Search from '../../components/Search/';
import Repositories from '../../components/Repositories';

import { getRepositories, createRepository, destroyRepository } from '../../services/api';
import { useAuth } from "../../hooks/useAuth";


const MainPage = () => {
  const { user, logout } = useAuth();
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(false);


  const loadData = async (query = "") => {
    try {
      setLoading(true)
      const { data } = await getRepositories(user?.id, query);
      setRepositories(data);
      setLoading(false)
    } catch (err) {
      console.error(err);
      return setLoadingError(true)
    }
  }

  useEffect(() => {
    (async () => await loadData())();

  }, [])

  const handleLogout = () => {
    logout();
  }


  const handleSearch = async (query) => {
    await loadData(query);
  }

  const handleDeleteRepo = async (repository) => {
    await destroyRepository(user?.id, repository._id);
    await loadData();
  }

  const handleAddRepo = async (url) => {
    try {
      await createRepository(user?.id, url);
      await loadData();
      
    } catch (err) {
      console.error(err);
      setLoadingError(true)
    }
  }

  if(loadingError) {
    return (
      <div className="loading">
        Erro ao carregar os dados de repositório. <Link to='/login'>Voltar</Link>
      </div>
    );
  }

  if(loading) {
    return (
      <div className="loading">
        Carregando...
      </div>
    );
  }

  return (
    <div id="main">
      <Nav onLogout={handleLogout}/>
      <Search onSearch={handleSearch} />
      <Repositories 
        onDelete={handleDeleteRepo} 
        onAddRepo={handleAddRepo} 
        repositories={repositories} 
      />
    </div>
  );
}

export default MainPage;