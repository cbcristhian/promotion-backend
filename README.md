# Promotion Backend

This is a simple Express-based backend built as part of a technical assessment.
Database is in-memory there is no real database dependency 

Project can be ran locally in **two different ways**, depending on preference.

---

## Prerequisites

Regardless of the approach, you will need:

* **Node.js v22.x** (required)
* **npm v10+**

> ⚠️ Using a different Node version may cause dependency or runtime issues.

---

## Option 1: Run Locally (No Docker)

This approach runs the application directly on your machine.

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Environment variables

Create a `.env` file at the project root (this file is intentionally not committed):

```env
PORT=3000
SECRETPRIVATEKEY=dev-secret
```

### 3️⃣ Start the server using Nodemon

```bash
npx nodemon index.js
```

The API will be available at:

```
http://localhost:3000
```

This approach is ideal if you:

* Already use Node 22 locally
* Want the simplest setup
* Prefer running services directly on your machine

---

## Option 2: Run with Docker (Recommended)

This approach uses **Docker Compose** and provides a reproducible, containerized development environment.

* Ensures consistent Node version (Node 22)
* Requires no local dependency installation

### 1️⃣ Prerequisites

* Docker
* Docker Compose (v2+)

### 2️⃣ Environment variables

Create a `.env` file at the project root:

```env
PORT=3000
SECRETPRIVATEKEY=dev-secret
```

> The `.env` file is **not baked into the Docker image**. Environment variables are injected at runtime, mirroring production best practices.

### 3️⃣ Start the application

```bash
docker compose -f docker-compose.dev.yml up --build
```

The API will be available at:

```
http://localhost:3000
```

### How this works internally

* Uses a dedicated `Dockerfile.dev`
* Runs the app with **Nodemon** inside the container
* Bind-mounts source code for hot reload
* Keeps `node_modules` inside the container to avoid host conflicts


---

## Notes on Environment Configuration

* Environment variables are read using `process.env`
* No `.env` files are committed to the repository
---

## Deployment Railway GHA

This project uses GitHub Actions to build and publish a Docker image
to Docker Hub on every push to `master`.

Railway is configured to deploy the service from the Docker image.
This follows an immutable artifact workflow where CI produces the image
and the platform consumes it.

Note: Railway Docker-image services do not support inbound deploy hooks.
