import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { deployFromZip, deployFromGit } from './deployEngine.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Configuration upload ZIP
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

app.post('/deploy/zip', upload.single('zipFile'), async (req, res) => {
  if (!req.file) return res.status(400).send({ error: 'Aucun fichier zip envoyé.' });

  try {
    const result = await deployFromZip(req.file.path);
    res.send({ success: true, message: result });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

app.post('/deploy/github', async (req, res) => {
  const { repoUrl, token } = req.body;
  if (!repoUrl) return res.status(400).send({ error: 'URL GitHub manquante.' });

  try {
    const result = await deployFromGit(repoUrl, token);
    res.send({ success: true, message: result });
  } catch (err) {
    res.status(500).send({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 INCONNU WEB BACKEND sur http://localhost:${PORT}`);
});
