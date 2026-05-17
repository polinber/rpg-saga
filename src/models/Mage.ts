import { Hero } from './Hero';

export class Mage extends Hero {
    private charmUsed: boolean = false;

    public getType(): string {
        return 'Маг';
    }

    public useSpecialAbility(target: Hero): { damage: number; log: string } {
        this.charmUsed = true;
        return {
            damage: 0,
            log: `использует (Заворожение) и заставляет противника пропустить ход`
        };
    }

    public isCharmed(): boolean {
        return this.charmUsed;
    }

    public resetCharm(): void {
        this.charmUsed = false;
    }
}