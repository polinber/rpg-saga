import { Hero } from '../models/Hero';
import { Logger } from './Logger';

export class Game {
    private heroes: Hero[];
    private logger: Logger;
    private round: number = 0;

    constructor(heroes: Hero[]) {
        this.heroes = heroes;
        this.logger = new Logger();
    }

    public start(): void {
        this.logger.log(`=== Игра началась! Участников: ${this.heroes.length} ===\n`);

        while (this.heroes.length > 1) {
            this.round++;
            this.logger.log(`\n=== Раунд ${this.round} ===`);

            const shuffled = [...this.heroes];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }

            const winners: Hero[] = [];

            for (let i = 0; i < shuffled.length; i += 2) {
                if (i + 1 >= shuffled.length) break;
                const hero1 = shuffled[i];
                const hero2 = shuffled[i + 1];
                const winner = this.fight(hero1, hero2);
                winners.push(winner);
                this.logger.log(`--- Победитель: ${winner.getType()} ${winner.getName()} ---\n`);
            }

            this.heroes = winners;
        }

        const champion = this.heroes[0];
        this.logger.log(`\n🏆 ЧЕМПИОН: ${champion.getType()} ${champion.getName()}! 🏆`);
    }

    private fight(heroA: Hero, heroB: Hero): Hero {
        let h1 = heroA;
        let h2 = heroB;
        let turn = 0;

        this.logger.log(`${h1.getType()} ${h1.getName()} vs ${h2.getType()} ${h2.getName()}`);

        while (h1.isAliveFlag() && h2.isAliveFlag()) {
            turn++;
            if (h1.isAliveFlag()) {
                this.makeTurn(h1, h2, turn);
            }
            if (h2.isAliveFlag()) {
                this.makeTurn(h2, h1, turn);
            }
        }

        const winner = h1.isAliveFlag() ? h1 : h2;
        const loser = winner === h1 ? h2 : h1;
        this.logger.log(`${loser.getType()} ${loser.getName()} погибает`);
        return winner;
    }

    private makeTurn(attacker: Hero, defender: Hero, turn: number): void {
        const isSpecial = Math.random() < 0.5;
        let damage = 0;
        let logMessage = '';

        if (isSpecial) {
            const ability = attacker.useSpecialAbility(defender);
            damage = ability.damage;
            logMessage = `${attacker.getType()} ${attacker.getName()} ${ability.log} противнику ${defender.getType()} ${defender.getName()}`;
        } else {
            damage = attacker.attack(defender);
            logMessage = `${attacker.getType()} ${attacker.getName()} наносит урон ${damage} противнику ${defender.getType()} ${defender.getName()}`;
        }

        this.logger.log(logMessage);

        if (!defender.isAliveFlag()) {
            this.logger.log(`${defender.getType()} ${defender.getName()} погибает`);
        }
    }

    public getRemainingHeroesCount(): number {
        return this.heroes.length;
    }
}