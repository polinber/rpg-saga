export abstract class Hero {
    protected name: string;
    protected health: number;
    protected strength: number;
    protected isAlive: boolean = true;

    constructor(name: string, health: number, strength: number) {
        this.name = name;
        this.health = health;
        this.strength = strength;
    }

    public getName(): string {
        return this.name;
    }

    public getHealth(): number {
        return this.health;
    }

    public getStrength(): number {
        return this.strength;
    }

    public isAliveFlag(): boolean {
        return this.isAlive;
    }

    public takeDamage(damage: number): void {
        this.health -= damage;
        if (this.health <= 0) {
            this.health = 0;
            this.isAlive = false;
        }
    }

    public attack(target: Hero): number {
        const damage = this.strength;
        target.takeDamage(damage);
        return damage;
    }

    public abstract useSpecialAbility(target: Hero): { damage: number; log: string };
    public abstract getType(): string;
}