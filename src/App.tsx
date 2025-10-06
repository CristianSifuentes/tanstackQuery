
import RepoStats from './features/basic/RepoStats'
import UsersList from './features/users/UsersList'


function App() {

  return (
    <div>
      <h1>TanStack Query v5 - Basic - Medium Demo</h1>
      <p className='small'>Devtools are enabled (open the bottom panel icon).</p>



      <section>
        <h2> 1) Basic useQuery (Github repo)</h2>
        <RepoStats />
      </section>


      <section>
        <h2>2) Pagination with placeholderData (keepPreviousData-like)</h2>
        <UsersList onSelect={(id) => console.log('Selected user ID:', id)} />
        <div style={{marginTop: 8}}>

        </div>

      </section>
    </div>
  )
}

export default App
