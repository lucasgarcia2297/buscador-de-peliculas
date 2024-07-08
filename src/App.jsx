import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './Components/Movies';
import { useSearch } from './hooks/useSearch'
import { useState, useCallback } from 'react';
import debounce from 'just-debounce-it';

function App() {
  const [sort, setSort] = useState(false);
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({ search, sort });

  const debounceGetMovies = useCallback(
    debounce(search => {
      console.log('search',search);
      getMovies({ search });
    }, 500)
    , [getMovies]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    getMovies({ search });
  }

  const handleSort = () => {
    setSort(!sort);
  }
  const handleChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return;
    updateSearch(newSearch);
    debounceGetMovies(newSearch);
  }
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handleSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent'
          }}
            onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, Toy Story...' />
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> :
            <Movies movies={movies} />
        }
      </main>
    </div>
  )
}

export default App
