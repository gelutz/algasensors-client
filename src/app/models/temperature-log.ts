import * as z from 'zod';

export const TemperatureLogSchema = z.object({
    id: z.string(),
    sensorId: z.string(),
    registeredAt: z.string(),
    value: z.number(),
});

export type TemperatureLog = z.infer<typeof TemperatureLogSchema>;

