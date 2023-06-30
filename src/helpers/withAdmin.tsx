// @ts-nocheck
import { useRouter } from "next/router";
import { useUser } from "../contexts/UserContext";
import { useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function withAdmin(Component: React.Component) {
  return function WrappedComponent(props) {
    const Router = useRouter();
    const user = useUser();

    useEffect(() => {
      const checkAdminStatus = async (accountId: string) => {
        const { data: adminAccounts, error } = await supabase
          .from("admin_accounts")
          .select("accountId")
          .eq("accountId", accountId);
        console.log("user", user);
        console.log("adminAccounts", adminAccounts);

        if (error) {
          console.error("Error: ", error);
        } else if (adminAccounts && adminAccounts.length > 0) {
          if (user?.type !== "admin") user?.setType("admin");
          console.log("is admin", user);
        } else {
          Router.replace("/admin-login");
        }
      };

      if (user && user.accountId) {
        checkAdminStatus(user.accountId);
      } else {
        Router.replace("/admin-login");
      }
    }, []);

    return <div>{user && <Component {...props} />}</div>;
  };
}
