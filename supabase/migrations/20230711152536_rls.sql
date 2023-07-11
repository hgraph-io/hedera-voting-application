alter table "public"."submission" alter column "type" drop default;

alter table "public"."submission" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."submission" add constraint "submission_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) not valid;

alter table "public"."submission" validate constraint "submission_user_id_fkey";


