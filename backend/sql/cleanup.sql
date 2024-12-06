-- Drop all data from tables in correct order
TRUNCATE TABLE laptop CASCADE;
TRUNCATE TABLE customer_review CASCADE;
TRUNCATE TABLE brand CASCADE;
TRUNCATE TABLE processor CASCADE;
TRUNCATE TABLE processor_brand CASCADE;
TRUNCATE TABLE ram CASCADE;
TRUNCATE TABLE gpu CASCADE;
TRUNCATE TABLE gpu_brand CASCADE;
TRUNCATE TABLE storage CASCADE;
TRUNCATE TABLE display CASCADE;
TRUNCATE TABLE operating_system CASCADE;

-- Reset all sequences
ALTER SEQUENCE laptop_laptop_id_seq RESTART WITH 1;
ALTER SEQUENCE brand_brand_id_seq RESTART WITH 1;
ALTER SEQUENCE processor_processor_id_seq RESTART WITH 1;
ALTER SEQUENCE processor_brand_processor_brand_id_seq RESTART WITH 1;
ALTER SEQUENCE ram_ram_id_seq RESTART WITH 1;
ALTER SEQUENCE gpu_gpu_id_seq RESTART WITH 1;
ALTER SEQUENCE gpu_brand_gpu_brand_id_seq RESTART WITH 1;
ALTER SEQUENCE storage_storage_id_seq RESTART WITH 1;
ALTER SEQUENCE display_display_id_seq RESTART WITH 1;
ALTER SEQUENCE operating_system_os_id_seq RESTART WITH 1;
ALTER SEQUENCE customer_review_review_id_seq RESTART WITH 1; 