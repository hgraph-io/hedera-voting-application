alter table hedera_admin_account rename column accountId to account_id;
alter table hedera_admin_account alter column account_id set not null;
