import { NextApiHandler } from "next";
import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

const handler: NextApiHandler = async (req, res) => {
  const { code } = req.query;

  if (code) {
    const supabase = createPagesServerClient({ req, res });
    const { error } = await supabase.auth.exchangeCodeForSession(String(code));

    if (error) {
      console.log("Error in exchangeCodeForSession:", error.message);
      res.redirect("/error");
    } else {
      res.redirect("/dashboard");
    }
  } else {
    res.redirect("/");
  }
};

export default handler;
