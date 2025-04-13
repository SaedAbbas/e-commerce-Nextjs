import { setUser } from '@/Redux/slices/userSlice';
import UseInsertData from "@/utils/hooks/useInsertData";
import { useRouter } from "next/navigation";
import {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const RegisterLogic = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const onChangeName = (e) => {
    setName(e.target.value);
    setError(null); // إزالة الخطأ لما المستخدم يعدل الحقول
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setError(null);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setError(null);
  };

  const onSubmit = async (e) => {

    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError(null);

    const response = await UseInsertData("/api/auth/local/register", {
      username: name,
      email,
      password,
    });

    if (response) console.log(response)

    if (response && response.user) {
      dispatch(setUser(response.user));
      router.push("/");
      toast.success("تم انشاء الحساب بنجاح 🎉");
    }
    setLoading(false);

    if (!response || response.error) {
      setError(response?.error?.message || "Register failed, please try again");

    }
  };
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    if (user && !loading) {
      router.replace("/");
    }
  }, [user, loading, router]);

    return {
        onChangeName,
        onChangeEmail,
        onChangePassword,
        onChangeConfirmPassword,
        onSubmit,
        name,
        email,
        password,
        confirmPassword,
        error,
        loading,
    };
};

export default RegisterLogic;
