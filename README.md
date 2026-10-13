# CLÉE · Partenariats entreprises

One-pager compact bilingue, français par défaut, sans dépendance, backend, service payant ou outil de suivi. Adresse cible : https://e-sall.github.io/clee-partenariats/

## Modifier le site

- `index.html` : contenu français. Chaque attribut `data-en` contient la traduction anglaise correspondante. Les attributs `data-en-aria` traduisent les libellés d’accessibilité.
- `styles.css` : palette, typographie, espacement et adaptations mobiles.
- `config.js` : `GOOGLE_FORM_URL` et adresse de contact. Si le lien est vide ou invalide, le bouton propose explicitement un courriel.
- `app.js` : sélecteur FR/EN, métadonnées, objets et textes des courriels.
- `favicon.svg` : flèche décorative originale, pas un logo officiel.

Les fichiers s’ouvrent directement dans un navigateur. Pour un aperçu HTTP : `python -m http.server 8080`, puis ouvrir http://localhost:8080. Aucun build JavaScript n’est nécessaire : les fichiers statiques constituent la version de production.

## Publier sur GitHub Pages

1. Créer le dépôt public `e-sall/clee-partenariats` (s’il n’existe pas), puis ajouter le contenu de ce dossier à sa racine sur `main`, y compris `.github/workflows/pages.yml` et `.nojekyll`.
2. Dans **Settings → Pages → Build and deployment**, choisir **GitHub Actions**.
3. Dans **Actions → Publish GitHub Pages**, lancer **Run workflow** si nécessaire.
4. Attendre le succès du déploiement, puis vérifier https://e-sall.github.io/clee-partenariats/ et https://e-sall.github.io/clee-partenariats/?lang=en.

Chaque modification poussée sur `main` redéploie le site. Les assets utilisent des chemins relatifs pour fonctionner sous `/clee-partenariats/`. Le workflow ne publie que les six fichiers nécessaires au site, pas ce README ni les notes de vérification.

## Sources et limites éditoriales

- Brochures consultées : `CLEE_Workshops_Entreprises_2026-2027(2).pdf`, `CLEE Workshops 2026-2027 EN.pdf` et `Cahier de l'ingénieur 2027 - Proposition de commandite.pdf`, fournies le 13 octobre 2026 (UTC). Contenus repris : formats, ciblage, co-construction, coordination, quatre axes du Cahier et possibilités du partenariat fondateur.
- Brief fourni par Elimane : texte source pour la présentation générale et la description du Cahier 2026–2027.
- Non disponibles au moment de la construction : `Copie de Logo V2025.png` et fichiers des logos officiels de Polytechnique.
- Aucun logo officiel n’a été inventé. Les noms sont présentés en texte et le visuel principal est une composition CSS originale. Les fichiers de marque pourront remplacer ces mentions dès réception.
- Les avantages du Cahier sont tirés des pages 3 à 7 de la proposition et présentés sans prix ni garantie de résultat. La liste des entreprises citées dans les activités prévisionnelles, les chiffres de diffusion, les noms d’universités et l’accès à la base de candidats ne sont pas repris. Le rôle d’Elimane suit le brief et les deux brochures workshops : VP Partenariats.
- Le nom propre français `Cahier de l’ingénieur` est conservé dans la version anglaise.
- Le formulaire fourni est intégré tel quel. Son contenu et ses paramètres ne sont pas modifiés par ce site. Vérifier son accessibilité externe et la langue de ses questions avant les campagnes.
- Les métadonnées Open Graph initiales sont françaises. Le navigateur les met à jour en anglais, mais les robots de partage sans JavaScript peuvent conserver le français.

## Vérifications manuelles à refaire après déploiement

- FR/EN : textes, navigation, boutons, contact, objet et corps du courriel.
- Clavier : lien d’évitement, focus visible, sélecteur et CTA.
- Largeurs 360, 390, 768 et 1440 px : aucun débordement, CTA lisibles.
- Formulaire : ouverture externe, accès sans connexion forcée non souhaitée.
- Courriel : destinataire, objet et corps dans l’application de messagerie.
- Ancres : possibilités, approche et contact.
- Vérifier les ressources dans le sous-chemin public, le HTTPS et le statut du workflow.

## Version compacte

Structure réduite selon la référence fournie : introduction, deux offres, conversion et contact. Site institutionnel : https://jc.aep.polymtl.ca. Profil LinkedIn : https://ca.linkedin.com/in/elimane-sall-523720349.
