# Task Management Dashboard

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Requirements
You are an expert Angular developer.  
Generate a complete **Angular 20 Task Management Dashboard** project that meets the following assignment requirements.  

### 🎯 Objective
Build a **Task Management Dashboard** with the ability to:
- View a list of tasks (title, description, priority, status).
- Add new tasks.
- Edit existing tasks.
- Delete tasks (with confirmation).
- Mark tasks as completed.
- Search and filter tasks by title, status, and priority.
- Persist data using a mock API (JSON Server).
- Manage global state using **NgRx** (Store, Actions, Reducers, Effects, Selectors).

---

### ✅ Requirements

#### 1. Project Setup
- Use Angular CLI with the **latest Angular 20**.
- **Install dependencies** [npm i]
- Enable **TypeScript strict mode**.
- Follow Angular best practices (folder structure, services, modules, state management).
- Include routing with lazy loading.

#### 2. Core Features
- **Task List Page (`tasks`)**:
  - Display tasks in a table/list using Angular Material.
  - Show title, description, priority (Low/Medium/High), and status (Pending/Completed).
- **Add Task Page ('tasks/add`)**:
  - Use **Reactive Forms** with validations.
  - Form fields: title (required), description, priority, status.
- **Edit Task Page (`tasks/edit/:id`)**:
  - Preload task details into the form.
  - Allow updating task details.
- **Delete Task**:
  - Show a confirmation dialog before deleting.
- **Search & Filter**:
  - Search tasks by title.
  - Filter by status (Pending/Completed).
  - Filter by priority.

#### 3. Technical Expectations
- Use **Angular Router** for navigation.
- Use **Reactive Forms** for Add/Edit task.
- Use **Angular Services** + **NgRx Effects** for data CRUD (connected to mock API).
- Use **RxJS operators** (map, filter, switchMap, debounceTime, catchError).
- Handle API errors gracefully with interceptors + Material snackbars.
- Use **NgRx Store** for centralized state management.
- Write **unit tests** for one NgRx reducer and one component.

#### 4. Mock API
- Use **JSON Server** as backend (`db.json`).
- **RUN JSON Server** [npm run mock:server].
- Implement CRUD endpoints (`/tasks`).
- Ensure UI reflects API changes in real time.

#### 5. UI/UX
- Use **Angular Material** for components.
- Responsive layout with toolbar, sidebar, and main content.
- Show **loader/spinner** for API calls.
- User-friendly forms and dialogs.

---

### 🌟 Bonus Points
- Implement **lazy-loaded modules** for `TasksModule`.
- Add a **custom pipe** to highlight overdue tasks.
- Add **debounced search** with RxJS `debounceTime`.
- Deploy project to **GitHub Pages/Netlify/Vercel**.

---

### 📦 Deliverables
- Source code in a GitHub repo.
- `README.md` with setup instructions:
  - How to install dependencies.
  - How to run JSON Server.
  - How to run Angular app.
- Hosted demo link if deployed.

---

## Quick start

1) Install dependencies

```bash
npm install
```

2) Start mock API (JSON Server)

```bash
npm run api
```

The API will be served at http://localhost:3000 with endpoints like `/tasks`.

3) Run the Angular app

```bash
npm start
```

Navigate to http://localhost:4200 and open the **Dashboard → Tasks** page.

---

## Notes

- On GitHub Pages, only read-only (GET) requests work.
- To test Create / Update / Delete (CRUD) features, run locally with JSON Server.
- `db.json` is the local mock database for testing.

---

## Tech Stack

- Angular 20  
- TypeScript  
- NgRx (Store, Effects, Reducers, Selectors)  
- JSON Server (for mock REST API)  
- Angular Material  


 