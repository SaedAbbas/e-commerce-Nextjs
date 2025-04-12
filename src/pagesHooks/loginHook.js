// pagesHooks/loginHook.js

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import UseInsertData from '@/utils/hooks/useInsertData';
import { useDispatch } from 'react-redux';
import { setUser } from '@/Redux/slices/userSlice';

const LoginHook = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
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
    }

    setLoading(false);

    if (response.error) {
      setError(response.error);
      return;
    }

    // الاستجابة من Strapi المفروض ترجع { user: {...} } بس
    // الكوكي (jwt) هيترسل تلقائيًا في الـ Headers
    setSuccess(true);
  };

  // التوجيه بعد تسجيل الدخول الناجح
  useEffect(() => {
    if (success) {
      router.push('/'); // أو أي صفحة بعد تسجيل الدخول
    }
  }, [success, router]);

  return [email, password, loading, error, onChangeEmail, onChangePassword, onSubmit];
};

export default LoginHook;