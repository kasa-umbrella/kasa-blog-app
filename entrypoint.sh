#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."
# MySQLの起動を待つ
until mysql -h mysql -u root -ppassword -e "SELECT 1" > /dev/null 2>&1; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is up - running migrations"
cd /app/migrations
alembic upgrade head

echo "Starting application..."
cd /app
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
