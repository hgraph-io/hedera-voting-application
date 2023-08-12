alter table "public"."submission" add column "panelist" boolean not null default false;

alter table "public"."submission" alter column "moderator" set default false;

alter table "public"."submission" alter column "moderator" set not null;

alter table "public"."submission" alter column "status" set default '''Pending''::text'::text;


