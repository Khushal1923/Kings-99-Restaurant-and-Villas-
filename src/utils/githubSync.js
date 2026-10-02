// GitHub Auto-Sync Utility for Zero-Database Global Deployment

const REPO_OWNER = 'Khushal1923';
const REPO_NAME = 'Kings-99-Restaurant-and-Villas-';
const FILE_PATH = 'src/data/defaultData.js';

// UTF-8 safe Base64 encoder
function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)));
}

export async function pushDataToGitHub(token, siteData) {
  if (!token || !token.trim()) {
    throw new Error("GitHub Access Token is required to sync changes.");
  }

  const cleanToken = token.trim();
  const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`;

  // 1. Get current file sha from GitHub
  const getRes = await fetch(apiUrl, {
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github.v3+json'
    }
  });

  if (!getRes.ok) {
    if (getRes.status === 401 || getRes.status === 403) {
      throw new Error("Invalid GitHub token or insufficient permissions. Please check your 'repo' scope token.");
    }
    const errText = await getRes.text();
    throw new Error(`Failed to fetch current repository state: ${errText}`);
  }

  const fileData = await getRes.json();
  const currentSha = fileData.sha;

  // 2. Prepare new file content
  const fileContent = `// King's 99 - Production Default Data Store\n// Auto-synced from Admin Portal\n\nexport const DEFAULT_SITE_DATA = ${JSON.stringify(siteData, null, 2)};\n`;
  const base64Content = utf8ToBase64(fileContent);

  // 3. Commit new file to main branch
  const putRes = await fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${cleanToken}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: `Admin Update: Sync media & menu changes [${new Date().toLocaleString()}]`,
      content: base64Content,
      sha: currentSha,
      branch: 'main'
    })
  });

  if (!putRes.ok) {
    const errText = await putRes.text();
    throw new Error(`GitHub commit failed: ${errText}`);
  }

  return await putRes.json();
}
