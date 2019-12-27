import React, { Component } from 'react';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'
import { Container, Form, SubmitButton, List } from './styles';
import api from '../../services/api';
import { Link } from 'react-router-dom';

export default class Main extends Component {

  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
  };

  //carregar os dados
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  //salvar os dados
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;
    if (prevState.repositories !== this.state.repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;
    if (newRepo !== '' ) {
      this.setState({ loading: true, error: false })
      try {
        const isDuplicated = !!repositories.find(repo => repo.name.toLowerCase() === newRepo.toLowerCase());
        this.isDuplicated = isDuplicated;
        if (isDuplicated) {
          throw new Error('Repo duplicado!');
        }
        const response = await api.get(`/repos/${newRepo}`);
        const data = {
          name: response.data.full_name,
        };

        this.setState({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
        })
      } catch (e) {
        const typeOfError = this.isDuplicated ? 'Repositorio Duplicado!' : 'Repositorio não encontrado!';
        this.typeOfError = typeOfError;
        this.setState({
          loading: false,
          newRepo: '',
          error: true,
        });
      }
    }
  }

  handleDelete = (repository) => {
    this.setState({ repositories: this.state.repositories.filter(repo => repo !== repository) });
  }

  letInputWhite = _ => {
    this.setState({ error: false });
    this.isDuplicated = false;
  }


  render() {

    const { newRepo, loading, repositories, error } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error} onClick={this.letInputWhite}>
          <input
            type="text"
            placeholder={`${error ? this.typeOfError : 'Adcionar Repositorio'}`}
            value={newRepo}
            onChange={this.handleInputChange}

          />

          <SubmitButton loading={loading}>
            { loading ? <FaSpinner color="#FFF" size={14} /> :
              <FaPlus color="#FFF" size={14} />
            }
          </SubmitButton>

        </Form>

        <List>
            {repositories.map(repository => (
              <li key={repository.name}>
                <span>{repository.name}</span>
                <div>
                  <Link to={`/repository/${encodeURIComponent(repository.name)}`}>Detalhes</Link>
                  <button type="button" onClick={() => this.handleDelete(repository)}>×</button>
                </div>

              </li>
            ))}
        </List>
      </Container>
    );
  }
}

