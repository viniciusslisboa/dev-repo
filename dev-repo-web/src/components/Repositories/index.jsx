import React, { useState } from 'react';

const Repositories = ({ onDelete, onAddRepo, repositories }) => {
  const [newRepo, setNewRepo] = useState('');

  return (
    <>
      <section className="repositories">
          <h2 className="title">Repositórios</h2>

        <ul className="list">
          {
            repositories.map(repository => (
              <li className="item" key={repository._id}>
                <div className="info">
                  <div className="owner">
                    {repository.name.substring(0, repository.name.indexOf('/'))}
                  </div>
                  <div className="name">
                    {repository.name.substring(repository.name.indexOf('/') + 1)}
                  </div>
                </div>
                <button onClick={() => onDelete(repository)}>X</button>
              </li>
            ))
          }
        </ul>
      </section>

        <section className="new">
          <label htmlFor="new-repo">Novo Repositório:</label>
          <input type="text" name="new-repo" id="new-repo" value={newRepo} onChange={e => setNewRepo(e.target.value)} />
          <button onClick={() => {
            onAddRepo(newRepo)
          }}>Adicionar</button>
      </section>
    </>

    
  );
}

export default Repositories;






