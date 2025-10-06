
import './App.css'
import RepoStats from './features/basic/RepoStats'


function App() {

  return (
    <div>
      <h1>TanStack Query v5 - Basic - Medium Demo</h1>
      <p className='small'>Devtools are enabled (open the bottom panel icon).</p>



      <section>
        <h2> 1) Basic useQuery (Github repo)</h2>
        <RepoStats />
      </section>
    </div>
  )
}

export default App
