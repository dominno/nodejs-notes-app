#!/bin/sh
# wait-for-db.sh

set -e

echo "Waiting for PostgreSQL to be ready..."
until npx prisma db push --skip-generate; do
  >&2 echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

>&2 echo "PostgreSQL is up - starting application"
exec npm start 