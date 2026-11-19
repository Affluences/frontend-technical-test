# Affluences – test technique front

Bienvenue ! Ce petit projet Angular sert de base à l'entretien technique.
Il affiche des bibliothèques et salles d'étude avec leur taux d'occupation en temps réel, à la manière de [affluences.com](https://affluences.com).

**La consigne te sera donnée au début de l'entretien.** D'ici là, le seul objectif est que le projet tourne sur ta machine.

## Avant l'entretien

1. Installe [Node.js](https://nodejs.org/) **22 (22.12 minimum) ou 24 et plus** (la version LTS 24 est idéale ; les versions impaires comme la 23 ne sont pas supportées).
2. Clone le dépôt, puis installe les dépendances :

    ```bash
    npm ci
    ```

3. Lance l'application :

    ```bash
    npm start
    ```

4. Ouvre http://localhost:4200 : tu dois voir une liste de 24 sites.
5. Vérifie que les tests et le lint passent :

    ```bash
    npm test
    npm run lint
    ```

Le jour J, prépare ton éditeur habituel et, si tu en utilises un, ton assistant IA : **il est autorisé**, comme au quotidien chez nous.
L'entretien se fait en visio avec partage d'écran.

Tu peux bien sûr parcourir le code à l'avance.

## Commandes

| Commande             | Rôle                                                            |
| -------------------- | --------------------------------------------------------------- |
| `npm start`          | Lance l'application en développement (rechargement automatique) |
| `npm run build`      | Compile l'application pour la production                        |
| `npm test`           | Lance les tests unitaires (Vitest) une fois                     |
| `npm run test:watch` | Relance les tests à chaque modification                         |
| `npm run lint`       | Vérifie le code (ESLint)                                        |
| `npm run format`     | Formate le code (Prettier)                                      |

## Comment le projet est organisé

```
src/app
├── core
│   ├── clock/          ClockService : l'heure « actuelle » de l'application
│   ├── layout/         En-tête, avec le champ « Heure simulée »
│   └── mock-api/       Fausse API : intercepteur HTTP + données des sites
└── sites
    ├── domain/         Types métier (Site, horaires d'ouverture)
    ├── repositories/   Appel HTTP, types de l'API (DTO) et adaptateurs DTO → domaine
    └── presentation/
        ├── components/ Page de la liste et carte d'un site
        ├── constants/  Options de tri, libellés et icônes des catégories
        └── utils/      Fonctions pures (tri, taux d'occupation, horaires) et leurs tests
```

### Il n'y a pas de backend

L'application appelle `GET /api/sites` avec le `HttpClient` d'Angular, comme elle le ferait avec une vraie API.
L'appel est intercepté par `core/mock-api/mock-api.interceptor.ts`, qui répond avec les données de `sites.mock.ts` après une courte latence.

### L'heure est simulée

Les horaires d'ouverture dépendent de l'heure. Pour pouvoir tester l'application à n'importe quel moment de la semaine, l'heure « actuelle » vient de `ClockService` et peut être changée depuis l'en-tête (« Heure simulée »). Par défaut : aujourd'hui à 14h30.
Toutes les heures sont celles du fuseau du navigateur.

## Conventions

Une version allégée des conventions de notre application d'administration :

- Angular récent : composants standalone, `ChangeDetectionStrategy.OnPush`, `input()` / `output()`, `inject()`.
- L'état des composants est géré avec des **signals** ; l'état dérivé avec `computed()`.
- Dans les templates : syntaxe `@if` / `@for`, et `@let fooValue = foo();` en haut du template pour lire les signals.
- Les gestionnaires d'événements commencent par `handle` : `handleChangeSort()`.
- Les booléens commencent par `is` / `has` / `can` / `should`.
- La logique sans dépendance à Angular va dans des fonctions pures `*.utils.ts`, testées dans des `*.spec.ts`.
- L'API (DTO, en snake_case) et le métier (domaine) ont des types séparés, reliés par des adaptateurs.
- Des noms explicites plutôt que des commentaires.
