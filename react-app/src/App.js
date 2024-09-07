import React, { useState, useEffect } from 'react';

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/users/github-john-doe')
      .then(response => {
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des données');
        }
        return response.json();
      })
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Profil GitHub</h1>
      {profile && (
        <div className="card">
          <img src={profile.avatar_url} alt={profile.name} className="card-img-top" style={{width: '200px', margin: '0 auto'}} />
          <div className="card-body">
            <h5 className="card-title">{profile.name}</h5>
            <p className="card-text">{profile.bio}</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Repositories publics : {profile.public_repos}</li>
              <li className="list-group-item">Followers : {profile.followers}</li>
              <li className="list-group-item">Following : {profile.following}</li>
            </ul>
            <a href={profile.html_url} className="btn btn-primary mt-3" target="_blank" rel="noopener noreferrer">Voir le profil sur GitHub</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;