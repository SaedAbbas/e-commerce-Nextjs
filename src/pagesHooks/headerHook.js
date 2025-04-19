import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '@/Redux/slices/userSlice';
import { persistor } from '@/Redux/store';
import {toast } from "sonner";
import UseInsertData from '@/utils/hooks/useInsertData';
import { fetchCartItems } from '@/Redux/slices/cartSlice';
import { useEffect } from 'react';

const HeaderHook = () => {

    const user = useSelector(state => state.user.user)
    const userCart = useSelector(state => state.cart.cartItems)

    const dispatch  = useDispatch()
    const router = useRouter()

    useEffect(() => {
        if (user) {
          dispatch(fetchCartItems(user.id));
        }
      }, [user]);

    const handleLogOut = async() => {

        const res = await UseInsertData('/api/auth/logout', {}, )
        
        if(res?.message === 'Logged out successfully'){
            dispatch(logOut())
            await persistor.purge() // تأكد من حذف البيانات المخزنة في الجلسة
            toast.success('تم تسجيل الخروج بنجاح! 🎉')
            router.push('/login')
            // router.refresh()  هاي بتعمل ريفتش للداتا اللي جاية من السيرفر
        }else{
            toast.error('حدث خطأ أثناء تسجيل الخروج!')
            return ;
        }
        
        }

    return {handleLogOut ,user ,userCart}
}   

export default HeaderHook
