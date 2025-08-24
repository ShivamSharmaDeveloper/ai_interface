import { NextResponse } from 'next/server';
import { models } from '../../../data/models';

export async function GET() {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return NextResponse.json(models);
}