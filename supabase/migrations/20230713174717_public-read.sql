create policy "TEMP - Enable read access for all users"
on "public"."submission"
as permissive
for select
to public
using (true);



