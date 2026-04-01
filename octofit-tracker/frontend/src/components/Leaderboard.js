import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
      : 'http://localhost:8000/api/leaderboard/';

    console.log('Leaderboard endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        const normalizedEntries = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setEntries(normalizedEntries);
      })
      .catch((fetchError) => {
        console.error('Leaderboard fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <section className="mb-4">
      <div className="card octofit-card">
        <div className="card-header bg-danger text-white d-flex align-items-center justify-content-between">
          <h5 className="mb-0">&#127942; Leaderboard</h5>
          <span className="badge bg-light text-danger">{entries.length} record{entries.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
          {!error && entries.length === 0 && (
            <p className="text-muted text-center py-4 mb-0">No leaderboard entries found.</p>
          )}
          {entries.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Rank</th>
                    <th scope="col">Team</th>
                    <th scope="col">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((entry, index) => (
                    <tr key={entry.id || entry._id || index}>
                      <td>
                        <span className="rank-badge">{index + 1}</span>
                      </td>
                      <td><strong>{entry.team || '—'}</strong></td>
                      <td>
                        <span className="badge bg-danger fs-6">
                          {entry.points != null ? entry.points : '—'}
                        </span>
                      </td>
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

export default Leaderboard;
