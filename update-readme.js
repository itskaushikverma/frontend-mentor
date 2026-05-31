const { readdirSync, readFileSync, writeFileSync } = require('node:fs');
const path = require('node:path');
const https = require('node:https');

function fetchURL() {
  return new Promise((resolve, reject) => {
    https
      .get('https://pget.vercel.app/', (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk.toString();
        });

        res.on('end', () => {
          const cleaned = data.trim();

          try {
            const parsed = JSON.parse(cleaned);
            if (parsed && typeof parsed === 'object') {
              resolve(parsed);
              return;
            }

            if (typeof parsed === 'string') {
              resolve(parsed.replace(/^"(.*)"$/, '$1'));
              return;
            }
          } catch {
            reject('Invalid JSON');
            return;
          }

          resolve(cleaned.replace(/^"(.*)"$/, '$1'));
        });
      })
      .on('error', reject);
  });
}

async function main() {
  try {
    const data = await fetchURL();

    const profile =
      data && typeof data === 'object'
        ? data
        : {
            github: String(data || ''),
            email: '',
            portfolio: '',
            linkedin: '',
            twitter: '',
          };

    const githubUsername = String(profile.github || '')
      .replace('https://github.com/', '')
      .replace(/\/$/, '');

    const variableSectionOneContent = ({ filename }) => {
      return `
    <a href="https://github.com/${githubUsername}/frontend-mentor/tree/main/${filename}">📁 Repository</a>
`;
    };

    const variableSectionTwoContent = `
\`\`\`bash
git clone https://github.com/${githubUsername}/frontend-mentor.git
\`\`\`
`;

    const variableSectionThreeContent = `
<a id="contact"></a>

## 👤 Author

<div align="center">
  <img src="https://github.com/${githubUsername}.png" alt="Developer" width="100" height="100" style="border-radius:50%; width:100px; height:100px; object-fit:cover; display:block;"/>
  
  <h3>Kaushik Verma</h3>
  
  <p><em>Building AI tools that turn long documents into clear decisions.</em></p>

[![Email](https://img.shields.io/badge/Email-${profile.email}%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:${profile.email})
[![Portfolio](https://img.shields.io/badge/Website-${profile.portfolio}-000000?style=flat-square&logo=vercel)](${profile.portfolio})
[![GitHub](https://img.shields.io/badge/GitHub-${githubUsername}-181717?style=flat-square&logo=github)](${profile.github})
[![LinkedIn](https://img.shields.io/badge/LinkedIn-${profile.linkedin}-0077B5?style=flat-square&logo=linkedin)](${profile.linkedin})
[![Twitter](https://img.shields.io/badge/Twitter-${profile.twitter}-1DA1F2?style=flat-square&logo=twitter)](${profile.twitter})

  <p>Open to product feedback, collaboration, and thoughtful conversation.</p>
</div>

<div align="center">
  <p>If you found this project helpful, please consider giving it a ⭐️</p>
  
  [![GitHub stars](https://img.shields.io/github/stars/${githubUsername}/frontend-mentor?style=social)](https://github.com/${githubUsername}/frontend-mentor)
</div>
`;

    const rootDirectory = process.cwd();

    function collectReadmes(directory, files = []) {
      const entries = readdirSync(directory, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
          collectReadmes(fullPath, files);
          continue;
        }

        if (entry.isFile() && entry.name.toLowerCase() === 'readme.md') {
          files.push(fullPath);
        }
      }

      return files;
    }

    const readmeFiles = collectReadmes(rootDirectory);

    for (const readmePath of readmeFiles) {
      const readme = readFileSync(readmePath, 'utf-8');
      let updated = readme;

      const variableSectionOne = `<!-- VARIABLE_SECTION_1_START -->
${variableSectionOneContent({
  filename: path
    .relative(rootDirectory, readmePath)
    .replace(/\\/g, '/')
    .replace(/\/README\.md$/i, ''),
})}
<!-- VARIABLE_SECTION_1_END -->`;

      const variableSectionTwo = `<!-- VARIABLE_SECTION_2_START -->
${variableSectionTwoContent}
<!-- VARIABLE_SECTION_2_END -->`;

      const variableSectionThree = `<!-- VARIABLE_SECTION_3_START -->
${variableSectionThreeContent}
<!-- VARIABLE_SECTION_3_END -->`;

      updated = updated.replace(
        /<!-- VARIABLE_SECTION_1_START -->[\s\S]*?<!-- VARIABLE_SECTION_1_END -->/,
        variableSectionOne,
      );

      updated = updated.replace(
        /<!-- VARIABLE_SECTION_2_START -->[\s\S]*?<!-- VARIABLE_SECTION_2_END -->/,
        variableSectionTwo,
      );

      updated = updated.replace(
        /<!-- VARIABLE_SECTION_3_START -->[\s\S]*?<!-- VARIABLE_SECTION_3_END -->/,
        variableSectionThree,
      );

      if (updated !== readme) {
        writeFileSync(readmePath, updated);
        console.log(`✅ Updated ${path.relative(rootDirectory, readmePath)}`);
      }
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

main();
