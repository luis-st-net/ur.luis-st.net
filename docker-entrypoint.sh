#!/bin/sh
set -e

echo "Applying schema (prisma db push)..."
npx prisma db push

echo "Seeding reference data (prisma db seed)..."
npx prisma db seed

exec "$@"
