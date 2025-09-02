## CS 2200 Office Hours Queue

Welcome to the repository for the CS 2200 Office Hours queue. This is a system designed to run a queue on a Raspberry Pi
that can be projected onto a screen for students and TAs to see. Since the system is a bit more complex than previous
queue systems, most of the setup and descriptions of how the queue works will be explained below.

### Contents

1. [Installation](#installation)
2. [Repository structure](#repository-structure)
3. [Tasks](#tasks)

## Installation

Below are the basic steps to install this queue on a system of your choosing:

1. Install [Docker](https://www.docker.com/) and [Bun](https://bun.com/) ([npm](https://www.npmjs.com/) also works, but
   Bun is considerably faster for installation).
2. Clone this repository onto your device.
3. In the backend folder, copy the contents of `env.template` into a new file named `.env`.
4. Add the data files. For this project, there are 3 csv files that need to be placed into the `backend/data` folder:
   `student.csv` (containing student data), `ta.csv` (containing TA data), and `names.csv` (for anonymous name data).
   All files can be named anything as long as the appropriate paths are assigned properly in the `.env` file. For example,
   by default the file for the anonymous names is `foods.csv`, which contains a list of 100 random food ingredients.
5. To start the server, run the following instruction from the root of the folder:
   ```sh
   docker compose up
   ```

> Running `docker compose up` starts both the frontend and backend in developer mode. A good production mode has not
> been set up just yet.

## Repository structure

The repository is a monorepo containing 2 Docker containers orchestrated using `docker compose`. The frontend folder
contains a React frontend, run and built using [Vite](https://vite.dev/), using frontend components from
[shadcn/ui](https://ui.shadcn.com/). All of the frontend components are stored in the components folder.

The backend folder is an [Express](https://expressjs.com/) backend server that uses
[better-sqlite3](https://github.com/WiseLibs/better-sqlite3) to run a local sqlite instance where all of the data is
persisted. This allows the data to be persisted across frontend reloads and provides isolation between sensitive student
and TA data from the frontend (although this isn't necessary for this iteration of the project).

Both the frontend and backend locally use Bun as the package manager, although in order to support `nodemon` for backend
hot reloads, and to avoid having to install too many packages in the backend Docker container, the backend Docker uses
npm to install instead.

## Tasks

Below are the tasks that still need to be done to improve this project:

- [ ] Remote dequeuing for TAs
- [ ] Add TA pictures for On-Duty TAs
- [ ] Easier queue manipulation for TAs
- [ ] Create production build
- [ ] Backend route API documentation
- [ ] Backend API tests for correctness and edge cases
