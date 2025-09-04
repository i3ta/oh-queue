#!/usr/bin/env bash
set -euo pipefail

# Backend
cd backend
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi
# Run backend on port 4000
npm run build
npm run start &
BACKEND_PID=$!
cd ..

# Frontend
cd frontend
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi
# Run frontend on port 4173
npm run build
npm run preview &
FRONTEND_PID=$!
cd ..

# Cleanup when script exits
cleanup() {
  echo "Stopping services..."
  kill $BACKEND_PID $FRONTEND_PID
}
trap cleanup EXIT

echo "Backend running on http://localhost:4000"
echo "Frontend running on http://localhost:4173"

wait
