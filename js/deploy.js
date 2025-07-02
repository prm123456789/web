const apiUrl = 'http://localhost:4000'; // Change si tu déploies ailleurs

// Upload ZIP
export async function uploadZip(file) {
  if (!file) throw new Error('Aucun fichier sélectionné');

  const formData = new FormData();
  formData.append('zipFile', file);

  const res = await fetch(`${apiUrl}/deploy/zip`, {
    method: 'POST',
    body: formData
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erreur lors de l’upload ZIP');
  }
  return await res.json();
}

// Déploiement GitHub
export async function deployGitHub(repoUrl, token = '') {
  if (!repoUrl) throw new Error('URL GitHub manquante');

  const res = await fetch(`${apiUrl}/deploy/github`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ repoUrl, token })
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Erreur lors du déploiement GitHub');
  }
  return await res.json();
}
