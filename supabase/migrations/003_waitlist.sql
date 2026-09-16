-- ══════════════════════════════════════════════════════
--  Solmae — Migration 003: Waitlist + Founding Fifty
-- ══════════════════════════════════════════════════════

create table if not exists waitlist_signups (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text not null default 'landing',
  created_at  timestamptz not null default now()
);

create unique index if not exists waitlist_signups_email_lower
  on waitlist_signups (lower(email));

alter table waitlist_signups enable row level security;

drop policy if exists "Anyone can join the waitlist" on waitlist_signups;
create policy "Anyone can join the waitlist"
  on waitlist_signups for insert
  with check (true);

create table if not exists founding_fifty_applications (
  id                      uuid primary key default gen_random_uuid(),
  name                    text not null,
  email                   text not null,
  what_you_know           text not null,
  what_you_want_to_know   text not null,
  created_at              timestamptz not null default now()
);

create unique index if not exists founding_fifty_applications_email_lower
  on founding_fifty_applications (lower(email));

alter table founding_fifty_applications enable row level security;

drop policy if exists "Anyone can apply to the Founding Fifty" on founding_fifty_applications;
create policy "Anyone can apply to the Founding Fifty"
  on founding_fifty_applications for insert
  with check (true);
