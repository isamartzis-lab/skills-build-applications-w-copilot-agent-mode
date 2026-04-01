import { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
    const endpoint = codespaceName
      ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
      : 'http://localhost:8000/api/activities/';

    console.log('Activities endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities fetched data:', data);
        const normalizedActivities = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setActivities(normalizedActivities);
      })
      .catch((fetchError) => {
        console.error('Activities fetch error:', fetchError);
        setError(fetchError.message);
      });
  }, []);

  return (
    <section className="mb-4">
      <div className="card octofit-card">
        <div className="card-header bg-warning text-dark d-flex align-items-center justify-content-between">
          <h5 className="mb-0">&#9889; Activities</h5>
          <span className="badge bg-dark text-warning">{activities.length} record{activities.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body p-0">
          {error && <div className="alert alert-danger m-3 mb-0">{error}</div>}
          {!error && activities.length === 0 && (
            <p className="text-muted text-center py-4 mb-0">No activities found.</p>
          )}
          {activities.length > 0 && (
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered octofit-table mb-0">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">User</th>
                    <th scope="col">Activity Type</th>
                    <th scope="col">Duration (min)</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={activity.id || activity._id || index}>
                      <th scope="row">{index + 1}</th>
                      <td>{activity.user || '—'}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {activity.type || '—'}
                        </span>
                      </td>
                      <td>{activity.duration != null ? activity.duration : '—'}</td>
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

export default Activities;
