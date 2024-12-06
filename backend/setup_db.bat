@echo off
echo Setting up database...

echo Closing existing database connections...
psql -U postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = 'laptop_db' AND pid <> pg_backend_pid();"

echo Dropping and creating database...
dropdb -U postgres laptop_db
createdb -U postgres laptop_db

echo Creating tables...
psql -U postgres -d laptop_db -f sql/create.sql
psql -U postgres -d laptop_db -f sql/constraints.sql

echo Loading data...
REM psql -U postgres -d laptop_db -f sql/sample_data.sql
psql -U postgres -d laptop_db -f sql/load_data.sql

echo Creating functions...
psql -U postgres -d laptop_db -f sql/functions.sql

echo Creating indexes...
psql -U postgres -d laptop_db -f sql/indexes.sql

echo Database setup complete! 