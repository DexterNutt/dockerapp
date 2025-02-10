CREATE TABLE IF NOT EXISTS public.users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO public.users (id, name)

VALUES (1, 'Demjan') 

ON CONFLICT (id) DO NOTHING;