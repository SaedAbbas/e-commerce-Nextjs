import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UseInsertData from '@/utils/hooks/useInsertData';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/Redux/slices/userSlice';
import { toast } from "sonner";

const LoginHook = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  

  const dispatch = useDispatch()

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setError(null); // إزالة الخطأ لما المستخدم يعدل الحقول
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setError(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError(null);

    const response = await UseInsertData('/api/auth/local', {
      identifier: email,
      password,
    });

    if(response?.user){
      dispatch(setUser(response.user))
      router.push('/');
      toast.success('تم تسجيل الدخول بنجاح! 🎉');
    }

    setLoading(false);

    if (!response || response.error) {
      setError(response?.error?.message || 'Login failed, please try again');
      return;
    }
    

  };

  const user = useSelector(state => state.user.user)

  useEffect(() => {
    if (user && !loading) {
      router.replace('/');
    }
  }, [user, loading, router]);
  

  return {email, password, loading, error, onChangeEmail, onChangePassword, onSubmit};
};

export default LoginHook;