import { notFound } from 'next/navigation';
import CheckoutForm from '../../../components/CheckoutForm';

// دالة لجلب بيانات الكورس من API
async function getCourse(id) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/courses/${id}`, {
      next: { revalidate: 60 } // إعادة التحقق كل 60 ثانية
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch course');
    }
    
    return res.json();
  } catch (error) {
    console.error('Error loading course:', error);
    return null;
  }
}

export default async function CoursePage({ params }) {
  const course = await getCourse(params.id);
  
  if (!course) {
    notFound();
  }

  return (
    <div className="container">
      <h1>{course.attributes.title}</h1>
      <p>{course.attributes.description}</p>
      
      <CheckoutForm 
        courseId={course.id}
        courseName={course.attributes.title}
        price={course.attributes.price}
      />
      
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 40px auto;
          padding: 0 20px;
        }
        h1 {
          margin-bottom: 20px;
        }
        p {
          margin-bottom: 30px;
        }
      `}</style>
    </div>
  );
}