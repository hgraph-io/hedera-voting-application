alter table "public"."submission" enable row level security;

create policy "Enable insert for authenticated users only"
on "public"."submission"
as permissive
for insert
to authenticated
with check (true);



