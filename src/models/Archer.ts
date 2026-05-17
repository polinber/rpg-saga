import { Hero } from './Hero';

export class Archer extends Hero {
    private fireArrowsUsed: boolean = false;
    private iceArrowsUsed: number = 0;
    private iceArrowDamageRemaining: number = 0;

    public getType(): string {
        return 'Лучник';
    }

    public attack(target: Hero): number {
        let damage = this.strength;
        if (this.iceArrowDamageRemaining > 0) {
            const iceBonus = 2 * this.iceArrowsUsed;
            damage += iceBonus;
            this.iceArrowDamageRemaining--;
        }
        target.takeDamage(damage);
        return damage;
    }

    // Публичный метод для огненных стрел
    public useFireArrows(target: Hero): { damage: number; log: string } {
        if (this.fireArrowsUsed) {
            return { damage: 0, log: `пытается использовать Огненные стрелы, но уже использовал` };
        }
        this.fireArrowsUsed = true;
        const fireDamage = 6;
        target.takeDamage(fireDamage);
        return {
            damage: fireDamage,
            log: `использует (Огненные стрелы) и наносит урон ${fireDamage} (горение)`
        };
    }

    // Публичный метод для ледяных стрел
    public useIceArrows(target: Hero): { damage: number; log: string } {
        if (this.iceArrowsUsed >= 2) {
            return { damage: 0, log: `пытается использовать Ледяные стрелы, но больше не может` };
        }
        this.iceArrowsUsed++;
        this.iceArrowDamageRemaining = 3;
        const iceDamage = this.strength;
        target.takeDamage(iceDamage);
        return {
            damage: iceDamage,
            log: `использует (Ледяные стрелы) и наносит урон ${iceDamage}. Следующие 3 хода с доп. уроном`
        };
    }

    // Случайный выбор способности для игрового процесса
    public useSpecialAbility(target: Hero): { damage: number; log: string } {
        const random = Math.random();
        if (random < 0.5) {
            return this.useFireArrows(target);
        } else {
            return this.useIceArrows(target);
        }
    }
}