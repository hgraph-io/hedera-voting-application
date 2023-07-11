create table
  public.admin_accounts (
    id bigint generated by default as identity not null,
    created_at timestamp with time zone null default now(),
    accountId text null,
    constraint admin_accounts_pkey primary key (id)
  ) tablespace pg_default;
