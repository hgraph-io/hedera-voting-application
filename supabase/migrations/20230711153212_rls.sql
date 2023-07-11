create policy "Enable read access for submission based on user_id"
on "public"."submission"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



