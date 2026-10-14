# CLÉE · Partenariats entreprises

One-pager compact bilingue, français par défaut, sans dépendance, backend, service payant ou outil de suivi. Adresse cible : https://e-sall.github.io/clee-partenariats/

## Modifier le site

- `index.html` : contenu français. Chaque attribut `data-en` contient la traduction anglaise correspondante. Les attributs `data-en-aria` traduisent les libellés d’accessibilité.
- `styles.css` : palette, typographie, espacement et adaptations mobiles.
- `config.js` : `GOOGLE_FORM_URL` et adresse de contact. Si le lien est vide ou invalide, le bouton propose explicitement un courriel.
- `app.js` : sélecteur FR/EN, métadonnées, objets et textes des courriels.
- `favicon.svg` : flèche décorative originale, pas un logo officiel.

Les fichiers s’ouvrent directement dans un navigateur. Pour un aperçu HTTP : `python -m http.server 8080`, puis ouvrir http://localhost:8080. Aucun build JavaScript n’est nécessaire : les fichiers statiques constituent la version de production.

