import { useEffect, useState } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
      : 'http://localhost:8000/api/workouts/';

    console.log('Workouts endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts fetched data:', data);
        const normalizedWorkouts = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setWorkouts(normalizedWorkouts);
      })
      .catch((fetchError) => {
        console.error('Workouts fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <section className="mb-4">
      <div className="card octofit-card">
        <div className="card-header bg-info text-dark d-flex align-items-center justify-content-between">
          <h5 className="mb-0">&#127939; Workouts</h5>
          <span className="badge bg-dark text-info">{workouts.length} record{workouts.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
          {!error && workouts.length === 0 && (
            <p className="text-muted text-center py-4 mb-0">No workouts found.</p>
          )}
          {workouts.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Workout Name</th>
                    <th scope="col">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map((workout, index) => (
                    <tr key={workout.id || workout._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td><strong>{workout.name || '—'}</strong></td>
                      <td>
                        <span className={`badge ${
                          workout.difficulty === 'easy' ? 'bg-success' :
                          workout.difficulty === 'medium' ? 'bg-warning text-dark' :
                          workout.difficulty === 'hard' ? 'bg-danger' : 'bg-secondary'
                        }`}>
                          {workout.difficulty || '—'}
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

export default Workouts;
