import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const useLogout = () => {
  const router = useRouter();

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("isVerified");
    router.push("/");
  };

  return { logout };
};

export default useLogout;
