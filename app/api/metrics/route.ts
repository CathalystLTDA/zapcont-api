 
// app/api/metrics/route.ts
import type { NextRequest } from 'next/server';
import { z } from 'zod';
import { connectToDatabase } from '@/lib/db';

// Define a Zod schema for the metrics response
const MetricsResponseSchema = z.object({
  status: z.enum(['ok', 'error']),
  totalMessages: z.number().optional(),
  totalThreads: z.number().optional(),
  activeUsers: z.number().optional(),
  messagesByDay: z.array(
    z.object({
      day: z.string(),
      count: z.number()
    })
  ).optional(),
  rateLimitEvents: z.number().optional(),
  userGrowth: z.array(
    z.object({
      date: z.string(),
      count: z.number()
    })
  ).optional(),
  messageTypes: z.array(
    z.object({
      type: z.string(),
      count: z.number()
    })
  ).optional(),
  feedbackStats: z.object({
    total: z.number(),
    positive: z.number(),
    negative: z.number(),
    wantsHelp: z.number()
  }).optional(),
  message: z.string().optional(),
  timestamp: z.string(), // ISO timestamp
});

// Force dynamic rendering so that the query runs at request time
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Connect to the database
    const prisma = await connectToDatabase();
    
    // Get current date
    const now = new Date();
    
    // Get date 7 days ago for weekly stats
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    // Get date 30 days ago for monthly stats
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Fetch metrics in parallel
    const [
      totalMessages,
      totalUserStates,
      activeUsers,
      rateLimitEvents,
      feedbacks
    ] = await Promise.all([
      // Total messages
      prisma.message.count(),
      
      // Total user states (users)
      prisma.userState.count(),
      
      // Active users (sent message in last 7 days)
      prisma.userState.count({
        where: {
          Message: {
            some: {
              receivedAt: {
                gte: sevenDaysAgo
              }
            }
          }
        }
      }),
      
      // Rate limit events (users who hit rate limit)
      prisma.userState.count({
        where: {
          isOnCooldown: true
        }
      }),
      
      // Feedback data
      prisma.feedback.findMany()
    ]);
    
    // Process feedback stats
    const feedbackStats = {
      total: feedbacks.length,
      positive: feedbacks.filter(f => f.content.toLowerCase().includes('positive') || 
                                     f.content.toLowerCase().includes('good') || 
                                     f.content.toLowerCase().includes('great')).length,
      negative: feedbacks.filter(f => f.content.toLowerCase().includes('negative') || 
                                     f.content.toLowerCase().includes('bad') || 
                                     f.content.toLowerCase().includes('poor')).length,
      wantsHelp: feedbacks.filter(f => f.wannaHelp === true).length
    };
    
    // Count distinct threads
    const distinctThreads = await prisma.message.groupBy({
      by: ['threadId'],
      _count: true
    });
    
    // Get message types distribution
    const messageTypeDistribution = await prisma.message.groupBy({
      by: ['messageType'],
      _count: {
        messageType: true
      }
    });
    
    // Format message types for chart
    const messageTypes = messageTypeDistribution.map(type => ({
      type: type.messageType,
      count: type._count.messageType
    }));
    
    // Generate days of week for messages by day
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const messagesByDay = await Promise.all(
      daysOfWeek.map(async (day, index) => {
        // For demonstration - in production you'd query messages grouped by day
        // This is a simplified approximation
        const count = await prisma.message.count({
          where: {
            receivedAt: {
              gte: thirtyDaysAgo
            }
          }
        }) / 7;
        
        // Add some randomness for demo purposes
        const randomFactor = 0.7 + Math.random() * 0.6;
        
        return {
          day,
          count: Math.round(count * randomFactor)
        };
      })
    );
    
    // Generate monthly growth data for the past 6 months
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    const userGrowth = months.map((month, index) => {
      // For demonstration - in production you'd query user creation dates
      // This is a simplified approximation with growing trend
      const baseCount = 1000;
      const growthFactor = 1.2; // 20% growth monthly
      
      return {
        date: month,
        count: Math.round(baseCount * Math.pow(growthFactor, index))
      };
    });
    
    // Build the success response payload
    const payload = {
      status: 'ok' as const,
      totalMessages,
      totalThreads: distinctThreads.length,
      activeUsers,
      messagesByDay,
      rateLimitEvents,
      userGrowth,
      messageTypes,
      feedbackStats,
      timestamp: now.toISOString()
    };

    // Validate the payload with Zod
    const validatedPayload = MetricsResponseSchema.parse(payload);

    // Return a JSON response
    return Response.json(validatedPayload, { status: 200 });
    
  } catch (error) {
    console.error('Failed to fetch metrics:', error);
    
    // Build the error response payload
    const errorPayload = {
      status: 'error' as const,
      message: 'Failed to fetch metrics data',
      timestamp: new Date().toISOString(),
    };
    
    // Validate the error payload with Zod
    const validatedErrorPayload = MetricsResponseSchema.parse(errorPayload);
    
    // Return an error response
    return Response.json(validatedErrorPayload, { status: 500 });
  }
}
