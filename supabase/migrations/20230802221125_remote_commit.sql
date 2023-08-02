alter table "public"."hedera_admin_account" drop constraint "hedera_admin_account_id_key";

alter table "public"."hedera_admin_account" drop constraint "admin_accounts_pkey";

drop index if exists "public"."admin_accounts_pkey";

drop index if exists "public"."hedera_admin_account_id_key";

drop table "public"."hedera_admin_account";


