export type Sensor = {
    id: string;
    name: string;
    ip: string;
    location: string;
    protocol: string;
    model: string;
    enabled: boolean;
    lastTemperature?: number;
    updatedAt?: Date;
};
