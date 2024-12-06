#!/bin/bash
echo "Setting up database..."

echo "Dropping and creating database..."
dropdb -U postgres laptop_db
createdb -U postgres laptop_db

echo "Creating tables..."
psql -U postgres -d laptop_db -f sql/create.sql
psql -U postgres -d laptop_db -f sql/constraints.sql

echo "Loading data..."
# Choose one of these:
psql -U postgres -d laptop_db -f sql/sample_data.sql
# psql -U postgres -d laptop_db -f sql/load_data.sql

echo "Creating functions..."
psql -U postgres -d laptop_db -f sql/functions.sql

echo "Creating indexes..."
psql -U postgres -d laptop_db -f sql/indexes.sql

echo "Database setup complete!" 