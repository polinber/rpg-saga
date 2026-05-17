import { Hero } from '../models/Hero';
import { Knight } from '../models/Knight';
import { Archer } from '../models/Archer';
import { Mage } from '../models/Mage';

const namesPool: string[] = [
    'Артур', 'Эльдар', 'Гэндальф', 'Вильямс',
    'Лансель', 'Мерлин', 'Рейгар', 'Тристан'
];

export class HeroFactory {
    public static createHero(type: string, name: string, health: number, strength: number): Hero {
        switch (type) {
            case 'Knight':
                return new Knight(name, health, strength);
            case 'Archer':
                return new Archer(name, health, strength);
            case 'Mage':
                return new Mage(name, health, strength);
            default:
                throw new Error(`Unknown hero type: ${type}`);
        }
    }

    public static createRandomHero(): Hero {
        const types = ['Knight', 'Archer', 'Mage'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const randomName = namesPool[Math.floor(Math.random() * namesPool.length)];
        const randomHealth = Math.floor(Math.random() * 100) + 50;
        const randomStrength = Math.floor(Math.random() * 30) + 10;
        return this.createHero(randomType, randomName, randomHealth, randomStrength);
    }

    public static createRandomHeroes(count: number): Hero[] {
        const heroes: Hero[] = [];
        for (let i = 0; i < count; i++) {
            heroes.push(this.createRandomHero());
        }
        return heroes;
    }
}