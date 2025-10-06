
import { Suspense, useState } from 'react'
import RepoStats from './features/basic/RepoStats'
import UsersList from './features/users/UsersList'
import UserPosts from './features/users/UserPosts'
import PrefetchLink from './features/shared/PrefetchLink';


function App() {

  // const selectedUserId = 1; // Example user ID for demonstration
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);


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
        <UsersList onSelect={(id) => setSelectedUserId(id)} />
        <div style={{marginTop: 8}}>
          {
            selectedUserId && (
              <PrefetchLink/>
              
          )}

        </div>

      </section>



      <section>
        <h3>3) Dependent query (User → Posts) + Suspense</h3>
        <Suspense fallback={<div>Loading posts…</div>}>
          {/* Render the posts for the selected user here */}
          <UserPosts userId={selectedUserId} />
        </Suspense>
      </section>
    </div>
  )
}

export default App
