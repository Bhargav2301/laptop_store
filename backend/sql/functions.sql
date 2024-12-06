-- Drop existing function first
DROP FUNCTION IF EXISTS get_popular_laptops(INTEGER);

-- Function: Search Laptops
CREATE OR REPLACE FUNCTION search_laptops(
    p_search_term text,
    p_min_price numeric,
    p_max_price numeric,
    p_brand_name text,
    p_ram_size integer
) RETURNS TABLE (
    laptop_id integer,
    model_name varchar,
    brand_name varchar,
    price numeric,
    processor_specs varchar,
    ram_gb integer,
    gpu_name varchar
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.laptop_id,
        l.model_name,
        b.brand_name,
        l.price,
        p.processor_specifications as processor_specs,
        r.ram_gb,
        g.gpu_name
    FROM laptop l
    JOIN brand b ON l.brand_id = b.brand_id
    JOIN processor p ON l.processor_id = p.processor_id
    JOIN ram r ON l.ram_id = r.ram_id
    JOIN gpu g ON l.gpu_id = g.gpu_id
    WHERE (p_search_term IS NULL OR 
           l.model_name ILIKE '%' || p_search_term || '%' OR
           b.brand_name ILIKE '%' || p_search_term || '%')
    AND (p_min_price IS NULL OR l.price >= p_min_price)
    AND (p_max_price IS NULL OR l.price <= p_max_price)
    AND (p_brand_name IS NULL OR b.brand_name = p_brand_name)
    AND (p_ram_size IS NULL OR r.ram_gb = p_ram_size);
END;
$$ LANGUAGE plpgsql;

-- Function: Get Laptop Details
CREATE OR REPLACE FUNCTION get_laptop_details(p_laptop_id INTEGER)
RETURNS TABLE (
    laptop_id INTEGER,
    model_name VARCHAR,
    brand_name VARCHAR,
    price NUMERIC,
    ram_gb INTEGER,
    ram_type VARCHAR,
    processor_specs VARCHAR,
    processor_brand VARCHAR,
    gpu_name VARCHAR,
    gpu_brand VARCHAR,
    storage_ssd INTEGER,
    storage_hdd INTEGER,
    display_type VARCHAR,
    screen_size NUMERIC,
    os_name VARCHAR,
    battery_life NUMERIC,
    adapter_watt INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        l.laptop_id,
        l.model_name,
        b.brand_name,
        l.price,
        r.ram_gb,
        r.ram_type,
        p.processor_specifications,
        pb.processor_brand_name,
        g.gpu_name,
        gb.gpu_brand_name,
        s.ssd_storage_gb,
        s.hdd_storage_gb,
        d.display_type,
        d.screen_size_inch,
        os.os_name,
        l.battery_life_hours,
        l.adapter_watt
    FROM Laptop l
    JOIN Brand b ON l.brand_id = b.brand_id
    JOIN RAM r ON l.ram_id = r.ram_id
    JOIN Processor p ON l.processor_id = p.processor_id
    JOIN Processor_Brand pb ON p.processor_brand_id = pb.processor_brand_id
    JOIN GPU g ON l.gpu_id = g.gpu_id
    JOIN GPU_Brand gb ON g.gpu_brand_id = gb.gpu_brand_id
    JOIN Storage s ON l.storage_id = s.storage_id
    JOIN Display d ON l.display_id = d.display_id
    JOIN Operating_System os ON l.os_id = os.os_id
    WHERE l.laptop_id = p_laptop_id;
END;
$$ LANGUAGE plpgsql;

-- Function: Get Related Laptops
CREATE OR REPLACE FUNCTION get_related_laptops(p_laptop_id INTEGER)
RETURNS TABLE (
    laptop_id INTEGER,
    model_name VARCHAR,
    brand_name VARCHAR,
    price NUMERIC,
    processor_specs VARCHAR,
    ram_gb INTEGER,
    gpu_name VARCHAR,
    specs_summary TEXT
) AS $$
BEGIN
    RETURN QUERY
    WITH laptop_info AS (
        SELECT 
            l.brand_id,
            l.price,
            r.ram_gb
        FROM laptop l
        JOIN ram r ON l.ram_id = r.ram_id
        WHERE l.laptop_id = p_laptop_id
    )
    SELECT 
        l.laptop_id,
        l.model_name,
        b.brand_name,
        l.price,
        p.processor_specifications as processor_specs,
        r.ram_gb,
        g.gpu_name,
        CONCAT(
            r.ram_gb::TEXT, 'GB RAM, ',
            CASE
                WHEN s.ssd_storage_gb > 0 THEN s.ssd_storage_gb::TEXT || 'GB SSD'
                ELSE s.hdd_storage_gb::TEXT || 'GB HDD'
            END,
            ', ',
            p.processor_specifications
        ) as specs_summary
    FROM laptop l
    JOIN brand b ON l.brand_id = b.brand_id
    JOIN processor p ON l.processor_id = p.processor_id
    JOIN ram r ON l.ram_id = r.ram_id
    JOIN gpu g ON l.gpu_id = g.gpu_id
    JOIN storage s ON l.storage_id = s.storage_id
    CROSS JOIN laptop_info li
    WHERE l.laptop_id != p_laptop_id
    AND (
        l.brand_id = li.brand_id
        OR ABS(l.price - li.price) <= 200
        OR r.ram_gb = li.ram_gb
    )
    ORDER BY 
        CASE WHEN l.brand_id = li.brand_id THEN 0 ELSE 1 END,
        ABS(l.price - li.price)
    LIMIT 4;
END;
$$ LANGUAGE plpgsql;

-- Function to check and handle laptop reactions
CREATE OR REPLACE FUNCTION handle_laptop_reactions()
RETURNS TRIGGER AS $$
BEGIN
    -- Check for dislikes
    IF (SELECT COUNT(*) FROM laptop_reactions 
        WHERE laptop_id = NEW.laptop_id AND is_like = false) >= 2 THEN
        DELETE FROM laptop WHERE laptop_id = NEW.laptop_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for reaction handling
CREATE TRIGGER after_reaction_insert
AFTER INSERT ON laptop_reactions
FOR EACH ROW
EXECUTE FUNCTION handle_laptop_reactions();
  