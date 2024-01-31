import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    private cache: Record<string, any> = {};

    get(key: string): any {
        return this.cache[key];
    }

    set(key: string, value: any): void {
        this.cache[key] = value;
    }

    has(key: string): boolean {
        return key in this.cache;
    }
}
