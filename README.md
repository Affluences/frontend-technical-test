# Affluences – frontend technical test

Welcome! This small Angular project is the starting point of the technical interview.
It lists libraries and study rooms with their real-time occupancy rate, in the spirit of [affluences.com](https://affluences.com).

**You will get the instructions at the start of the interview.** Until then, the only goal is to get the project running on your machine.

## Before the interview

1. Install [Node.js](https://nodejs.org/) **22 (22.12 or later) or 24+** (the LTS version 24 is ideal; odd versions such as 23 are not supported).
2. Clone the repository, then install the dependencies:

    ```bash
    npm ci
    ```

3. Start the application:

    ```bash
    npm start
    ```

4. Open http://localhost:4200: you should see a list of 24 sites.
5. Check that the linter passes:

    ```bash
    npm run lint
    ```

On the day, have your usual editor ready and, if you use one, your AI assistant: **it is allowed**, just like in our day-to-day work.
The interview is a video call with screen sharing.

Feel free to browse the code beforehand.

The user interface is in French, like our product.

## Commands

| Command              | What it does                                             |
| -------------------- | -------------------------------------------------------- |
| `npm start`          | Starts the application in development mode (live reload) |
| `npm run build`      | Builds the application for production                    |
| `npm run lint`       | Checks the code (ESLint)                                 |
| `npm run format`     | Formats the code (Prettier)                              |

## How the project is organised

```
src/app
├── core
│   ├── clock/          ClockService: the application's "current" time
│   ├── layout/         Header, with the "Heure simulée" (simulated time) field
└── sites               The "Sites" module
    ├── domain/         Business types (Site, opening hours)
    ├── repositories/   HTTP calls (actually mocks in our case), API types (DTOs), DTO → domain adapters
    └── presentation/   Angular/frontend code
        ├── components/ List page and site card
        ├── constants/  Sort options, category labels and icons
        └── utils/      Pure functions (sorting, occupancy rate, opening hours)
```

### There is no backend

The application implements `SitesRepository` with `MockSitesRepository` using static data. In a real application,
we would use an `ApiSitesRepository` using HTTP calls.

### Time is simulated

Opening hours depend on the time of day. So that you can check the application at any time of the week, the "current" time comes from `ClockService` and can be changed from the header ("Heure simulée"). Default: today at 2:30 pm.
All times use the browser's time zone.

## Conventions

A lighter version of the conventions of our admin application:

- Modern Angular: standalone components, `ChangeDetectionStrategy.OnPush`, `input()` / `output()`, `inject()`.
- Component state is handled with **signals**; derived state with `computed()`.
- In templates: `@if` / `@for` syntax.
- Event handlers start with `handle`: `handleChangeSort()`.
- Booleans start with `is` / `has` / `can` / `should`.
- Logic that does not depend on Angular goes into pure functions in `*.utils.ts` files.
- The repositories (HTTP API, mocks, their DTOs) and the business layer (domain) have separate types, linked by adapters.
- Explicit names rather than comments.
