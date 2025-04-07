'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useNavigate } from 'next/navigation';
import { parse } from 'cookie'; // لتحليل الكوكي
import UseInsertData from '@/utils/hooks/useInsertData'; // هوك الإدخال

const LoginHook = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [res, setRes] = useState(null); // لحفظ نتيجة الرد من السيرفر

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const OnSubmit = async (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      console.log('الرجاء أكمل البيانات', 'warn');
      return;
    }

    setLoading(true);

    // هنا بنستخدم هوك الداتا
    const response = await UseInsertData('/api/auth/local', { identifier : email, password });

    setRes(response); // حفظ النتيجة في متغير الحالة
    console.log(res)
    setLoading(false);
  };


  useEffect(() => {
    if (loading === false && res) {
    // هنا بنحلل الكوكي قبل ما نعرض الصفحة
    const cookies = parse(document.cookie); // تحليل الكوكي من الوثيقة
    const token = cookies.token;

    if (token) {
      // إذا كان التوكن موجود، اعرض الصفحة المطلوبة مباشرة أو أنقله لمكان معين
      console.log(token)
    }
  }
  }, [loading,res]);

  return [email, password, loading, onChangeEmail, onChangePassword, OnSubmit];
};

export default LoginHook;
