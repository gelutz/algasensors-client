import * as z from 'zod';

export const SensorSchema = z.object({
    id: z.string(),
    name: z.string(),
    ip: z.string(),
    location: z.string(),
    protocol: z.string().optional(),
    model: z.string().optional(),
    enabled: z.boolean(),
    lastTemperature: z.number().optional(),
    updatedAt: z.date().optional(),
});

export type Sensor = z.infer<typeof SensorSchema>;
