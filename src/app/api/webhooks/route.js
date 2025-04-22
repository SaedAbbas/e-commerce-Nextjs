import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { buffer } from 'micro';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

// مطلوب للحصول على البيانات الخام من الطلب
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request) {
  try {
    const body = await request.text();
    const sig = request.headers.get('stripe-signature');

    let event;

    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      console.log(`❌ Error message: ${errorMessage}`);
      return NextResponse.json({ message: `Webhook Error: ${errorMessage}` }, { status: 400 });
    }

    // تم إنشاء الـ event بنجاح
    console.log('✅ Success:', event.id);

    // معالجة الـ event حسب نوعه
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        console.log(`💰 Payment succeeded: ${session.id}`);
        
        // هنا يمكنك تحديث قاعدة البيانات الخاصة بك (مثل Strapi)
        // مثلاً إضافة الكورس للمستخدم، تحديث حالة الطلب، إلخ
        
        break;
      }
      default:
        console.log(`🤷‍♀️ Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ message: 'Webhook error' }, { status: 500 });
  }
}