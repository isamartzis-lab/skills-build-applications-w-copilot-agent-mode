import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
      : 'http://localhost:8000/api/teams/';

    console.log('Teams endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams fetched data:', data);
        const normalizedTeams = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setTeams(normalizedTeams);
      })
      .catch((fetchError) => {
        console.error('Teams fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <section className="mb-4">
      <div className="card octofit-card">
        <div className="card-header bg-success text-white d-flex align-items-center justify-content-between">
          <h5 className="mb-0">&#127942; Teams</h5>
          <span className="badge bg-light text-success">{teams.length} record{teams.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
          {!error && teams.length === 0 && (
            <p className="text-muted text-center py-4 mb-0">No teams found.</p>
          )}
          {teams.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Team Name</th>
                  </tr>
                </thead>
                <tbody>
                  {teams.map((team, index) => (
                    <tr key={team.id || team._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td><strong>{team.name || '—'}</strong></td>
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

export default Teams;
