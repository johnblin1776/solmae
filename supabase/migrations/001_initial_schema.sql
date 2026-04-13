-- ══════════════════════════════════════════════════════
--  Solmae — Initial Schema
-- ══════════════════════════════════════════════════════

-- Enable UUID generation
create extension if not exists "pgcrypto";

-- ── TOPICS ──────────────────────────────────────────
-- Canonical topic list used across creators, members, editions
create table topics (
  id   serial primary key,
  slug text not null unique,
  name text not null
);

insert into topics (slug, name) values
  ('nutrition',       'Nutrition'),
  ('recipes',         'Recipes'),
  ('perimenopause',   'Perimenopause'),
  ('wellness',        'Wellness'),
  ('fitness',         'Fitness'),
  ('parenthood',      'Parenthood'),
  ('design',          'Design'),
  ('interior',        'Interior'),
  ('home',            'Home'),
  ('lifestyle',       'Lifestyle'),
  ('fashion',         'Fashion'),
  ('entrepreneurship','Entrepreneurship'),
  ('finance',         'Finance'),
  ('real-estate',     'Real Estate'),
  ('travel',          'Travel'),
  ('food',            'Food'),
  ('beauty',          'Beauty');

-- ── PROFILES ────────────────────────────────────────
-- One row per user (members + creators). Linked to auth.users via id.
create table profiles (
  id              uuid primary key references auth.users(id) on delete cascade,
  role            text not null check (role in ('member','creator','admin')),
  status          text not null default 'active' check (status in ('active','suspended','pending')),

  -- Identity
  first_name      text,
  last_name       text,
  display_name    text,
  avatar_url      text,
  bio             text,
  location        text,

  -- Social handles (nullable)
  handle_ig       text,
  handle_x        text,
  handle_linkedin text,
  handle_tiktok   text,
  handle_facebook text,
  website_url     text,

  -- Topics (array of slugs)
  topics          text[] not null default '{}',

  -- Creator-specific
  follower_count  integer,           -- from primary platform, manually set
  post_count      integer default 0, -- derived from content_items

  -- Member-specific
  invite_slots    integer default 5, -- invites available this month
  invite_unlimited boolean default false,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- RLS
alter table profiles enable row level security;

create policy "Public profiles are viewable by authenticated users"
  on profiles for select
  using (auth.role() = 'authenticated');

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- ── INVITE CODES ────────────────────────────────────
create table invite_codes (
  id              uuid primary key default gen_random_uuid(),
  code            text not null unique,
  created_by      uuid references profiles(id) on delete set null,  -- null = created by admin
  slots_total     integer not null default 1,
  slots_used      integer not null default 0,
  expires_at      timestamptz,    -- null = never expires
  notes           text,           -- e.g. "for March batch"
  created_at      timestamptz not null default now()
);

-- Track individual redemptions
create table invite_redemptions (
  id              uuid primary key default gen_random_uuid(),
  invite_code_id  uuid not null references invite_codes(id),
  redeemed_by     uuid references profiles(id) on delete set null,
  redeemed_at     timestamptz not null default now(),
  email_captured  text  -- captured when slots are full (apology modal)
);

alter table invite_codes enable row level security;
alter table invite_redemptions enable row level security;

-- Anyone can validate a code (needed for the public invite gate)
create policy "Anyone can read invite codes"
  on invite_codes for select
  using (true);

-- ── CREATOR APPLICATIONS ────────────────────────────
-- For creators who apply via /apply (no invite code needed)
create table creator_applications (
  id              uuid primary key default gen_random_uuid(),
  status          text not null default 'pending'
                  check (status in ('pending','approved','rejected')),

  -- Submitted info
  first_name      text not null,
  last_name       text not null,
  email           text not null,
  bio             text,
  website_url     text,
  topics          text[] not null default '{}',

  -- Social handles
  handle_ig       text,
  handle_x        text,
  handle_linkedin text,
  handle_tiktok   text,
  handle_facebook text,

  -- Review
  reviewed_by     uuid references profiles(id) on delete set null,
  reviewed_at     timestamptz,
  review_notes    text,

  -- Links to created profile once approved
  profile_id      uuid references profiles(id) on delete set null,

  created_at      timestamptz not null default now()
);

alter table creator_applications enable row level security;

-- Anyone can insert an application (public form)
create policy "Anyone can submit a creator application"
  on creator_applications for insert
  with check (true);

-- Only admins can read/update applications (enforced via service role in API routes)

-- ── CONTENT ITEMS ───────────────────────────────────
-- Each piece of content ingested from a creator
create table content_items (
  id              uuid primary key default gen_random_uuid(),
  creator_id      uuid not null references profiles(id) on delete cascade,
  status          text not null default 'draft'
                  check (status in ('draft','approved','rejected')),

  -- Content
  title           text not null,
  url             text not null,
  description     text,
  image_url       text,
  topics          text[] not null default '{}',

  -- Front-page flag (admin can feature in Edition)
  featured        boolean not null default false,

  -- Ingestion metadata
  source          text check (source in ('email','rss','manual')),
  raw_email_id    text,

  -- Engagement
  like_count      integer not null default 0,
  comment_count   integer not null default 0,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table content_items enable row level security;

create policy "Authenticated users can view approved content"
  on content_items for select
  using (auth.role() = 'authenticated' and status = 'approved');

-- ── FOLLOWS (Member → Creator) ───────────────────────
-- A member's "Bench" = the creators they follow
create table follows (
  follower_id  uuid not null references profiles(id) on delete cascade,
  following_id uuid not null references profiles(id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (follower_id, following_id)
);

alter table follows enable row level security;

create policy "Users can manage their own follows"
  on follows for all
  using (auth.uid() = follower_id);

-- ── HELPERS ─────────────────────────────────────────
-- Auto-update updated_at timestamps
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on profiles
  for each row execute function set_updated_at();

create trigger trg_content_items_updated_at
  before update on content_items
  for each row execute function set_updated_at();

-- ── SEED: Admin invite codes for Jen & Lauren ────────
-- Replace UUIDs after creating their accounts
insert into invite_codes (code, slots_total, notes) values
  ('JEN2026',   50, 'Jen — Founding 50 Creator batch'),
  ('LAUREN2026',50, 'Lauren — Founding 50 Creator batch'),
  ('SOLMAE',    10, 'General early access');
