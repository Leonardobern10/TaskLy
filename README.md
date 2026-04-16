# TaskLy — Collaborative Task Management Platform

> A production-grade microservices architecture built with NestJS, RabbitMQ, and WebSockets — designed from the ground up for scalability, real-time collaboration, and clean domain boundaries.

---

## Why This Project Exists

Most task management tutorials build a monolith with a single database and call it done. TaskLy was designed with a different question in mind:

> *"What does a collaborative system look like when each domain needs to scale and evolve independently?"*

The result is a fully event-driven platform where authentication, task management, comments, and notifications are isolated services — each with its own responsibility, its own data, and its own deployment boundary.

---

## Architecture Overview

```
                          ┌─────────────────┐
                          │   API Gateway   │  ← Single entry point (REST + WS)
                          └────────┬────────┘
                                   │ TCP / Message Broker
              ┌────────────────────┼────────────────────┐
              │                    │                    │
     ┌────────▼───────┐  ┌────────▼───────┐  ┌────────▼───────┐
     │  Auth Service  │  │  Tasks Service │  │Comments Service│
     │  JWT + Refresh │  │  CRUD + Filter │  │  + Messaging   │
     └────────────────┘  └───────┬────────┘  └───────┬────────┘
                                 │ RabbitMQ           │
                          ┌──────▼──────────────────▼──┐
                          │     Notifications Service   │
                          │  Event listener + WebSocket │
                          └─────────────────────────────┘
```

Each service owns its own PostgreSQL schema. Services communicate asynchronously via RabbitMQ for state changes and synchronously via TCP for direct queries.

---

## Key Technical Decisions

### Why Microservices instead of a Monolith?

A monolith would have been simpler to build — and that was a deliberate trade-off. The goal here was to work through the actual complexity of distributed systems: service boundaries, async communication, data ownership, and inter-service contracts. Each service can be developed, tested, and scaled independently.

### Why RabbitMQ for Notifications?

Notifications are the perfect use case for async messaging: they don't need to block the main request, they can tolerate slight delays, and they benefit from decoupling. When a task is created, the Tasks service publishes a `tasks.created` event and moves on. The Notifications service listens, persists, and pushes via WebSocket — no tight coupling, no shared state.

### Why pnpm + Turborepo for the Monorepo?

With multiple NestJS services sharing DTOs, enums, and utilities, npm would duplicate dependencies across each `node_modules` — increasing install time, disk usage, and the risk of version mismatches. pnpm's symlink-based strategy eliminates duplication. Turborepo adds intelligent task orchestration: only rebuilding what changed, running services in parallel, and caching results across runs.

### Why Pino for Logging?

In a multi-service system, logging overhead matters. Pino uses async streams and internal buffering to minimize I/O blocking — critical in high-concurrency scenarios. Its structured JSON output also makes logs easy to parse, ship to external tools, or query programmatically. `nestjs-pino` integrates it cleanly into NestJS's native logger interface.

### Why QueryBuilder over `repository.find()`?

The Tasks service supports dynamic filtering by title, priority, status, pagination, sorting, and optional joins with comments — all simultaneously and conditionally. `repository.find()` becomes unmaintainable with this combination. QueryBuilder keeps each filter isolated, opt-in, and readable:

```typescript
if (title) {
  qb.andWhere('LOWER(task.title) LIKE LOWER(:title)', { title: `%${title}%` });
}
if (priority) {
  qb.andWhere('task.priority = :priority', { priority });
}
if (status) {
  qb.andWhere('task.status = :status', { status });
}
```

Each condition is independently composable — easy to read, easy to extend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Language | TypeScript |
| Backend Framework | NestJS |
| Message Broker | RabbitMQ |
| ORM | TypeORM |
| Database | PostgreSQL |
| Real-time | WebSocket Gateway |
| Auth | JWT + Refresh Tokens |
| Monorepo | pnpm Workspaces + Turborepo |
| Logging | Pino (`nestjs-pino`) |
| Validation | class-validator |
| API Docs | Swagger (auto-generated) |

---

## Services

### 🛡️ Auth Service
Handles registration, login, logout, token refresh, and profile retrieval. Issues short-lived JWTs and long-lived refresh tokens. Communicates with other services via NestJS TCP transport.

**Endpoints:** `POST /auth/register` · `POST /auth/login` · `POST /auth/refresh` · `POST /auth/logout` · `GET /auth/profile`

### ✅ Tasks Service
Full CRUD with dynamic filtering (title, priority, status), pagination, sorting, and change history. Publishes domain events on creation and updates.

**Endpoints:** `GET /tasks` · `POST /tasks` · `PATCH /tasks/:id` · `DELETE /tasks/:id`

### 💬 Comments Service
Task owners can add comments. Changes are published as events consumed by the Notifications service.

### 🔔 Notifications Service
Listens to `tasks.created`, `tasks.updated`, and `comment.new` events. Persists notifications and delivers them in real-time via authenticated WebSocket connections.

**WebSocket:** `ws://localhost:PORT/ws?email=user@example.com`

---

## Getting Started

### Prerequisites

- Node.js >= 18
- pnpm
- PostgreSQL (local or remote)
- RabbitMQ

### Install

```bash
pnpm install
```

### Environment Variables

Create a `.env` file at the root (each service may also have its own):

```env
# API Gateway
API_GATEWAY_PORT=3000
FRONTEND_ORIGIN=http://localhost:5173

# Auth Service
JWT_SECRET=your_jwt_secret
REFRESH_SECRET_KEY=your_refresh_secret
AUTH_PORT=3001
AUTH_HOST=localhost

# Tasks Service
TASKS_PORT=3002
TASKS_HOST=localhost

# Notifications Service
NOTIFICATION_PORT=3004

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=your_db_name
```

### Run

```bash
pnpm dev
# or
pnpm turbo run dev
```

Turborepo starts all services in parallel with watch mode, based on `turbo.json` configuration.

### API Docs

Swagger is available at the API Gateway:

```
GET http://localhost:3000/api/docs
```

---

## Repository Structure

```
/
├── apps/
│   ├── api-gateway/       # Entry point — routes and auth guards
│   ├── auth/              # Authentication microservice
│   ├── tasks/             # Task management microservice
│   ├── comments/          # Comments microservice
│   └── notifications/     # Event listener + WebSocket delivery
├── turbo.json
├── pnpm-workspace.yaml
└── tsconfig.base.json
```

---

## Development Notes

This project was built in 14 days, from architectural planning to final documentation. Day 1 was spent on architecture decisions and domain mapping — before writing a single line of code.

Ongoing improvements are tracked in the `updates` branch.

---

## Author

**Leonardo Bernardo**
[github.com/Leonardobern10](https://github.com/Leonardobern10)
