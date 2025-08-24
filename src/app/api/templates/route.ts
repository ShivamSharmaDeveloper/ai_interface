import { NextResponse } from 'next/server';
import { templates } from '../../../data/templates';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(templates);
}