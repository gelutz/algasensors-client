import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { Sensor } from '../models/sensor';

@Injectable({
    providedIn: 'root',
})
export class SensorService {
    http = inject(HttpClient);

    private mockSensors: Sensor[] = [
        {
            id: '1',
            name: 'Sensor Tanque A',
            ip: '192.168.1.100',
            location: 'Tanque Principal',
            protocol: 'MQTT',
            model: 'DHT22',
            enabled: true,
            lastTemperature: 25.5,
            updatedAt: new Date(),
        },
        {
            id: '2',
            name: 'Sensor Tanque B',
            ip: '192.168.1.101',
            location: 'Tanque Secundário',
            protocol: 'MQTT',
            model: 'DHT22',
            enabled: true,
            lastTemperature: 24.8,
            updatedAt: new Date(),
        },
        {
            id: '3',
            name: 'Sensor Lagoa Norte',
            ip: '192.168.1.102',
            location: 'Lagoa de Cultivo Norte',
            protocol: 'HTTP',
            model: 'DS18B20',
            enabled: true,
            lastTemperature: 23.2,
            updatedAt: new Date(),
        },
        {
            id: '4',
            name: 'Sensor Lagoa Sul',
            ip: '192.168.1.103',
            location: 'Lagoa de Cultivo Sul',
            protocol: 'HTTP',
            model: 'DS18B20',
            enabled: true,
            lastTemperature: 23.5,
            updatedAt: new Date(),
        },
        {
            id: '5',
            name: 'Sensor pH Tanque A',
            ip: '192.168.1.104',
            location: 'Tanque Principal',
            protocol: 'MQTT',
            model: 'ATLAS-pH',
            enabled: true,
            lastTemperature: 7.2,
            updatedAt: new Date(),
        },
        {
            id: '6',
            name: 'Sensor OD Tanque B',
            ip: '192.168.1.105',
            location: 'Tanque Secundário',
            protocol: 'MQTT',
            model: 'ATLAS-OD',
            enabled: false,
            updatedAt: new Date('2025-12-20'),
        },
        {
            id: '7',
            name: 'Sensor Turvidez Lagoa Norte',
            ip: '192.168.1.106',
            location: 'Lagoa de Cultivo Norte',
            protocol: 'HTTP',
            model: 'NTU-Sensor',
            enabled: true,
            lastTemperature: 45.8,
            updatedAt: new Date(),
        },
        {
            id: '8',
            name: 'Sensor Luminosidade',
            ip: '192.168.1.107',
            location: 'Área de Cultivo',
            protocol: 'HTTP',
            model: 'BH1750',
            enabled: true,
            lastTemperature: 8500,
            updatedAt: new Date(),
        },
    ];

    getAllSensors = () => {
        return of(this.mockSensors);
    };
}
