import { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/users/`
      : 'http://localhost:8000/api/users/';

    console.log('Users endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users fetched data:', data);
        const normalizedUsers = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setUsers(normalizedUsers);
      })
      .catch((fetchError) => {
        console.error('Users fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <section className="mb-4">
      <div className="card octofit-card">
        <div className="card-header bg-primary text-white d-flex align-items-center justify-content-between">
          <h5 className="mb-0">&#128100; Users</h5>
          <span className="badge bg-light text-primary">{users.length} record{users.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
          {!error && users.length === 0 && (
            <p className="text-muted text-center py-4 mb-0">No users found.</p>
          )}
          {users.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id || user._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td><strong>{user.username || '—'}</strong></td>
                      <td>{user.email || '—'}</td>
                      <td>{user.first_name || '—'}</td>
                      <td>{user.last_name || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Users;
