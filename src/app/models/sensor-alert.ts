import * as z from 'zod';

export const SensorAlertSchema = z.object({
    id: z.string(),
    minTemperature: z.number().nullable(),
    maxTemperature: z.number().nullable(),
});

export type SensorAlert = z.infer<typeof SensorAlertSchema>;

export type SensorAlertInput = {
    minTemperature: number | null;
    maxTemperature: number | null;
};

