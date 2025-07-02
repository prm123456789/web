import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import simpleGit from 'simple-git';

// Déploiement à partir d’un fichier ZIP
export async function deployFromZip(zipPath) {
  const extractPath = path.join('deploys', Date.now().toString());

  // Créer le dossier
  fs.mkdirSync(extractPath, { recursive: true });

  await fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();

  // Simule un déploiement (tu peux intégrer PM2 ici)
  return `Bot déployé depuis ZIP dans ${extractPath}`;
}

// Déploiement à partir d’un repo Git
export async function deployFromGit(repoUrl, token = '') {
  const folderName = path.join('deploys', Date.now().toString());

  const git = simpleGit();
  const finalUrl = token
    ? repoUrl.replace('https://', `https://${token}@`)
    : repoUrl;

  await git.clone(finalUrl, folderName);

  // Simule un démarrage avec PM2
  return `Bot cloné depuis Git dans ${folderName}`;
}
