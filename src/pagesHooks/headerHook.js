import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '@/Redux/slices/userSlice';
import { persistor } from '@/Redux/store';
import {toast } from "sonner";
import UseInsertData from '@/utils/hooks/useInsertData';

const HeaderHook = () => {

    const user = useSelector(state => state.user.user)

    const dispatch  = useDispatch()
    const router = useRouter()

    const handleLogOut = async() => {

        const res = await UseInsertData('/api/auth/logout', {}, )
        
        if(res?.message === 'Logged out successfully'){
            dispatch(logOut())
            await persistor.purge() // تأكد من حذف البيانات المخزنة في الجلسة
            toast.success('تم تسجيل الخروج بنجاح! 🎉')
            window.location.href = '/login' // أو يمكنك استخدام router.push('/login') إذا كنت تستخدم Next.js
            // router.refresh()  هاي بتعمل ريفتش للداتا اللي جاية من السيرفر
        }else{
            toast.error('حدث خطأ أثناء تسجيل الخروج!')
            return ;
        }
        
        }

    return {handleLogOut ,user}
}   

export default HeaderHook
