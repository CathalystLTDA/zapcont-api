 
// app/api/health/route.ts
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';

// Define a Zod schema for the health-check response.
const HealthCheckResponseSchema = z.object({
  status: z.literal('ok'),
  dbConnection: z.boolean(),
  serverTime: z.string(), // ISO timestamp
});

// Force dynamic rendering so that the check always runs at request time.
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  let dbConnectionHealthy = false;
  
  try {
    // Attempt to connect to the database using Prisma.
    await connectToDatabase();
    dbConnectionHealthy = true;
  } catch (error) {
    dbConnectionHealthy = false;
  }

  // Build the response payload.
  const payload = {
    status: 'ok' as const,
    dbConnection: dbConnectionHealthy,
    serverTime: new Date().toISOString(),
  };

  // Validate the payload with Zod.
  const validatedPayload = HealthCheckResponseSchema.parse(payload);

  // Return a JSON response.
  return Response.json(validatedPayload, { status: 200 });
}
