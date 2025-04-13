import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { logOut } from '@/Redux/slices/userSlice';
import { persistor } from '@/Redux/store';
import {toast } from "sonner";

const HeaderHook = () => {

    const user = useSelector(state => state.user.user)

    const dispatch  = useDispatch()
    const router = useRouter()

    const handleLogOut = async() => {
        dispatch(logOut())
        await persistor.purge() // تأكد من حذف البيانات المخزنة في الجلسة
        router.push('/login')
        toast.error('تم تسجيل الخروج بنجاح! 🎉');
    }
    
    return {handleLogOut ,user}
}   

export default HeaderHook
