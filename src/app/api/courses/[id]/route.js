// app/api/courses/[id]/route.js
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = params;
  
  try {
    // استعلام عن الكورس من Strapi
    const response = await fetch(`${process.env.STRAPI_API_URL}/api/courses/${id}?populate=*`, {
      headers: {
        'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
      }
    });
    
    const data = await response.json();
    
    if (data.data) {
      return NextResponse.json(data.data);
    } else {
      return NextResponse.json({ message: 'Course not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching course' }, { status: 500 });
  }
}