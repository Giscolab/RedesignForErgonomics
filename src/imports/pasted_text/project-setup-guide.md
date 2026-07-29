Le diagnostic est clair :

1. **`package.json` ou `pnpm-lock.yaml` contient des dépendances invalides** du type :

```json
"@emotion/react@11.14.0": "npm:@emotion/react@11.14.0"
```

C’est faux. Le nom de dépendance doit être :

```json
"@emotion/react": "11.14.0"
```

Pas :

```json
"@emotion/react@11.14.0"
```

2. Ensuite, **Rollup n’a pas installé son paquet natif Windows** :

```text
@rollup/rollup-win32-x64-msvc
```

C’est une conséquence probable d’une installation cassée / lockfile mauvais / mélange npm + pnpm.

3. Tu es sur **Node.js v26.4.0**. Pour un projet Vite 6, je te conseille de stabiliser en **Node 22 LTS**, pas Node 26. Vite 6 annonce le support de Node 18, 20 et 22+. ([vitejs][1])

4. Ton `pnpm` global semble maintenant être en version récente. Depuis pnpm v11, les réglages dans le champ `"pnpm"` de `package.json` ne sont plus lus ; ils doivent être déplacés dans `pnpm-workspace.yaml`. ([pnpm.io][2])

## Correction propre

Dans PowerShell, à la racine du projet :

```powershell
cd C:\Users\cadet\Documents\GitHub\RedesignForErgonomics
git status
```

Puis sauvegarde :

```powershell
Copy-Item package.json package.json.bak -Force
Copy-Item pnpm-lock.yaml pnpm-lock.yaml.bak -Force -ErrorAction SilentlyContinue
```

## 1. Nettoyer les faux alias dans `package.json`

Exécute ceci :

```powershell
@'
const fs = require("fs");

const file = "package.json";
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));

const sections = [
  "dependencies",
  "devDependencies",
  "optionalDependencies",
  "peerDependencies"
];

const removed = [];

for (const section of sections) {
  if (!pkg[section]) continue;

  for (const name of Object.keys(pkg[section])) {
    const looksLikeVersionedAlias =
      /^(?:@[^/]+\/[^@]+|[^@/]+)@\d/.test(name);

    if (looksLikeVersionedAlias) {
      removed.push(`${section}: ${name}`);
      delete pkg[section][name];
    }
  }
}

fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");

console.log("Aliases invalides supprimés :");
console.log(removed.length ? removed.join("\n") : "aucun");
'@ | Set-Content .\fix-package.cjs -Encoding UTF8

node .\fix-package.cjs
```

Ce script supprime seulement les clés invalides du type :

```text
@mui/material@7.3.5
@emotion/react@11.14.0
react-router@7.13.0
```

Il garde les vraies dépendances :

```text
@mui/material
@emotion/react
react-router
```

## 2. Supprimer les installations cassées

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue
Remove-Item -Force npm-shrinkwrap.json -ErrorAction SilentlyContinue
```

## 3. Revenir à pnpm 10 pour ce projet

Vu ton log initial, le projet marchait mieux avec `pnpm v10.33.0`. Fais :

```powershell
npm uninstall -g pnpm
corepack enable
corepack prepare pnpm@10.33.0 --activate
pnpm -v
```

Tu dois obtenir :

```text
10.33.0
```

## 4. Réinstaller proprement

```powershell
pnpm install
```

Puis :

```powershell
pnpm approve-builds
```

Autorise au minimum :

```text
esbuild
@tailwindcss/oxide
```

Ensuite :

```powershell
pnpm dev
```

## 5. Si Rollup manque encore

Ajoute explicitement le paquet natif Windows :

```powershell
pnpm add -D @rollup/rollup-win32-x64-msvc
pnpm dev
```

Le paquet `@rollup/rollup-win32-x64-msvc` est bien le binding natif Windows attendu par Rollup. ([npm][3])

## 6. Option fortement conseillée : Node 22 LTS

Si tu as `nvm-windows` :

```powershell
nvm install 22
nvm use 22
node -v
```

Puis refaire :

```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
pnpm install
pnpm dev
```

## À ne pas faire maintenant

Ne relance pas :

```powershell
npm i
```

Ne mélange pas `npm install` et `pnpm install` dans ce repo tant que le projet n’est pas stabilisé.

## Résumé action immédiate

Fais exactement cette séquence :

```powershell
cd C:\Users\cadet\Documents\GitHub\RedesignForErgonomics

Copy-Item package.json package.json.bak -Force
Copy-Item pnpm-lock.yaml pnpm-lock.yaml.bak -Force -ErrorAction SilentlyContinue

@'
const fs = require("fs");
const file = "package.json";
const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
const sections = ["dependencies", "devDependencies", "optionalDependencies", "peerDependencies"];
for (const section of sections) {
  if (!pkg[section]) continue;
  for (const name of Object.keys(pkg[section])) {
    if (/^(?:@[^/]+\/[^@]+|[^@/]+)@\d/.test(name)) {
      delete pkg[section][name];
    }
  }
}
fs.writeFileSync(file, JSON.stringify(pkg, null, 2) + "\n");
'@ | Set-Content .\fix-package.cjs -Encoding UTF8

node .\fix-package.cjs

Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force pnpm-lock.yaml -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Force yarn.lock -ErrorAction SilentlyContinue

npm uninstall -g pnpm
corepack enable
corepack prepare pnpm@10.33.0 --activate

pnpm install
pnpm approve-builds
pnpm dev
```

Si ça échoue encore, colle uniquement le nouveau `package.json` et les 40 dernières lignes de l’erreur.

[1]: https://vite.dev/blog/announcing-vite6?utm_source=chatgpt.com "Vite 6.0 is out!"
[2]: https://pnpm.io/package_json?utm_source=chatgpt.com "package.json"
[3]: https://www.npmjs.com/package/%40rollup/rollup-win32-x64-msvc?utm_source=chatgpt.com "rollup/rollup-win32-x64-msvc"
