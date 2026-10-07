create table if not exists events (
  id text primary key,
  title text not null,
  estado text not null,
  municipio text not null,
  venue text not null,
  event_date date not null,
  cover_url text not null,
  status text not null default 'pending',
  guardian_ok boolean not null default false,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists event_photos (
  id text primary key,
  event_id text not null references events(id) on delete cascade,
  url text not null,
  rejected_reason text
);
