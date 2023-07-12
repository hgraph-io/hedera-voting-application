create table "public"."hedera_admin_account" (
    "id" bigint not null,
    "created_at" timestamp with time zone default now()
);


create table "public"."submission" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "created_at" timestamp with time zone default now(),
    "name" text not null,
    "organization" text,
    "links" text[],
    "topics" text[],
    "moderator" boolean
);


alter table "public"."submission" enable row level security;

CREATE UNIQUE INDEX admin_accounts_pkey ON public.hedera_admin_account USING btree (id);

CREATE UNIQUE INDEX hedera_admin_account_id_key ON public.hedera_admin_account USING btree (id);

CREATE UNIQUE INDEX submission_pkey ON public.submission USING btree (id);

alter table "public"."hedera_admin_account" add constraint "admin_accounts_pkey" PRIMARY KEY using index "admin_accounts_pkey";

alter table "public"."submission" add constraint "submission_pkey" PRIMARY KEY using index "submission_pkey";

alter table "public"."hedera_admin_account" add constraint "hedera_admin_account_id_key" UNIQUE using index "hedera_admin_account_id_key";

alter table "public"."submission" add constraint "submission_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."submission" validate constraint "submission_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."submission"
as permissive
for insert
to authenticated
with check ((auth.uid() = user_id));


create policy "Enable read access for submission based on user_id"
on "public"."submission"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));


create policy "Enable update for users based on email"
on "public"."submission"
as permissive
for update
to authenticated
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



