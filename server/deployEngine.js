
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import unzipper from 'unzipper';
import simpleGit from 'simple-git';

export async function deployFromZip(zipPath) {
  const extractPath = path.join('deploys', Date.now().toString());
  fs.mkdirSync(extractPath, { recursive: true });
  await fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }))
    .promise();
  return `Bot déployé depuis ZIP dans ${extractPath}`;
}

export async function deployFromGit(repoUrl, token = '') {
  const folderName = path.join('deploys', Date.now().toString());
  const git = simpleGit();
  const finalUrl = token ? repoUrl.replace('https://', `https://${token}@`) : repoUrl;
  await git.clone(finalUrl, folderName);
  return `Bot cloné depuis Git dans ${folderName}`;
}
