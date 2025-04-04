 
// app/api/users/count/route.ts
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';

// Define a Zod schema for the user count response
const UserCountResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  count: z.number().optional(),
  message: z.string().optional(),
  timestamp: z.string(), // ISO timestamp
});

// Force dynamic rendering so that the query runs at request time
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    const prisma = await connectToDatabase();
    
    // Count users (using UserState as the user model)
    const userCount = await prisma.userState.count();
    console.log('User count:', userCount);
    
    // Build the success response payload
    const payload = {
      status: 'ok' as const,
      count: userCount,
      timestamp: new Date().toISOString(),
    };

    // Validate the payload with Zod
    const validatedPayload = UserCountResponseSchema.parse(payload);

    // Return a JSON response
    return Response.json(validatedPayload, { status: 200 });
    
  } catch (error) {
    console.error('Failed to count users:', error);
    
    // Build the error response payload
    const errorPayload = {
      status: 'error' as const,
      message: 'Failed to count users',
      timestamp: new Date().toISOString(),
    };
    
    // Validate the error payload with Zod
    const validatedErrorPayload = UserCountResponseSchema.parse(errorPayload);
    
    // Return an error response
    return Response.json(validatedErrorPayload, { status: 500 });
  }
}
