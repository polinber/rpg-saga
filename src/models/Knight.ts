
import { Hero } from './Hero';

export class Knight extends Hero {
    public getType(): string {
        return 'Рыцарь';
    }

    public useSpecialAbility(target: Hero): { damage: number; log: string } {
        const bonusDamage = Math.floor(this.strength * 0.3);
        const totalDamage = this.strength + bonusDamage;
        target.takeDamage(totalDamage);
        return {
            damage: totalDamage,
            log: `использует (Удар возмездия) и наносит урон ${totalDamage}`
        };
    }
}