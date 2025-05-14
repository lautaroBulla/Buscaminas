#!/bin/sh

echo "⏳ Esperando que MySQL esté listo..."

until nc -z mysql 3306; do
  sleep 1
done

echo "✅ MySQL está listo. Ejecutando migraciones y backend..."

npm run start:migrate:prod
