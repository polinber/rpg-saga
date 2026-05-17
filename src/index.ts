import * as readline from 'readline';
import { HeroFactory } from './services/HeroFactory';
import { Game } from './services/Game';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Введите количество игроков (чётное число): ', (count: string) => {
    const num = parseInt(count);
    if (isNaN(num) || num % 2 !== 0 || num < 2) {
        console.log('Ошибка: нужно чётное число больше 0');
        rl.close();
        return;
    }

    const heroes = HeroFactory.createRandomHeroes(num);
    const game = new Game(heroes);
    game.start();
    rl.close();
});