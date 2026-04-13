-- ══════════════════════════════════════════════════════
--  Solmae — Migration 002: Benches + Business Profiles
-- ══════════════════════════════════════════════════════

-- ── BENCHES ─────────────────────────────────────────
-- A named, curated list of creators owned by a member.
-- Members can have multiple benches (Morning Read, Design, etc.)
create table benches (
  id           uuid primary key default gen_random_uuid(),
  member_id    uuid not null references profiles(id) on delete cascade,
  name         text not null,
  visibility   text not null default 'private'
               check (visibility in ('private','members')),
  description  text,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (member_id, name)   -- one name per member
);

-- Creators on a bench
create table bench_creators (
  bench_id     uuid not null references benches(id) on delete cascade,
  creator_id   uuid not null references profiles(id) on delete cascade,
  added_at     timestamptz not null default now(),
  primary key (bench_id, creator_id)
);

alter table benches enable row level security;
alter table bench_creators enable row level security;

-- Members can only see and manage their own benches
create policy "Members manage own benches"
  on benches for all
  using (auth.uid() = member_id);

-- Anyone authenticated can read bench_creators for benches visible to members
create policy "Members can view public bench members"
  on bench_creators for select
  using (
    exists (
      select 1 from benches b
      where b.id = bench_creators.bench_id
        and (b.member_id = auth.uid() or b.visibility = 'members')
    )
  );

create policy "Members manage their own bench creators"
  on bench_creators for all
  using (
    exists (
      select 1 from benches b
      where b.id = bench_creators.bench_id
        and b.member_id = auth.uid()
    )
  );

create trigger trg_benches_updated_at
  before update on benches
  for each row execute function set_updated_at();

-- ── BUSINESS PROFILES ────────────────────────────────
-- Created by a Creator or Member to represent their business.
create table business_profiles (
  id           uuid primary key default gen_random_uuid(),
  owner_id     uuid not null references profiles(id) on delete cascade,
  status       text not null default 'active'
               check (status in ('active','suspended','pending')),

  -- Identity
  name         text not null,
  tagline      text,
  description  text,
  location     text,
  website_url  text,
  founded_year integer,

  -- Category (primary) + tags
  category     text,                    -- e.g. 'Interior Design'
  categories   text[] not null default '{}',

  -- Media
  hero_image_url  text,
  key_image_url   text,

  -- Social handles
  handle_ig    text,
  handle_x     text,
  handle_linkedin text,
  handle_tiktok text,

  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table business_profiles enable row level security;

create policy "Anyone authenticated can view active businesses"
  on business_profiles for select
  using (auth.role() = 'authenticated' and status = 'active');

create policy "Owners can manage their own business"
  on business_profiles for all
  using (auth.uid() = owner_id);

create trigger trg_business_profiles_updated_at
  before update on business_profiles
  for each row execute function set_updated_at();

-- ── BUSINESS CATEGORIES (reference) ─────────────────
create table business_categories (
  slug text primary key,
  name text not null
);

insert into business_categories (slug, name) values
  ('acupuncture',    'Acupuncture'),
  ('beauty',         'Beauty'),
  ('coaching',       'Coaching'),
  ('design',         'Design'),
  ('events',         'Events'),
  ('fashion',        'Fashion'),
  ('finance',        'Finance'),
  ('fitness',        'Fitness'),
  ('food-nutrition', 'Food & Nutrition'),
  ('interior-design','Interior Design'),
  ('media',          'Media'),
  ('real-estate',    'Real Estate'),
  ('retail',         'Retail'),
  ('travel',         'Travel'),
  ('wellness',       'Wellness');
