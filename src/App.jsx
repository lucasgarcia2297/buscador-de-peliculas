import './App.css'
import { useMovies } from './hooks/useMovies'
import { Movies } from './Components/Movies';
import { useSearch } from './hooks/useSearch'

function App() {
  const { search, updateSearch, error } = useSearch();
  const { movies, loading, getMovies } = useMovies({search});

  const handlerSubmit = (event) => {
    event.preventDefault();
    getMovies();
  }

  const handlerChange = (event) => {
    const newSearch = event.target.value;
    if (newSearch.startsWith(' ')) return;
    updateSearch(newSearch);
  }
  return (
    <div className='page'>
      <header>
        <h1>Buscador de Películas</h1>
        <form className="form" onSubmit={handlerSubmit}>
          <input style={{
            border: '1px solid transparent',
            borderColor: error ? 'red' : 'transparent' 
            }}
            onChange={handlerChange} value={search} name='query' placeholder='Avengers, Star Wars, Toy Story...' />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p>}
      </header>
      <main>
        {
          loading ? <p>Cargando...</p> :
          <Movies movies={ movies }/>
        }
      </main>
    </div>
  )
}

export default App
