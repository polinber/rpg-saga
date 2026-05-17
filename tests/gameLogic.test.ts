import { describe, it, expect, vi } from 'vitest';
import { Game } from '../src/services/Game';
import { HeroFactory } from '../src/services/HeroFactory';

describe('Game logic', () => {
    it('should create game with even number of heroes', () => {
        const heroes = HeroFactory.createRandomHeroes(4);
        const game = new Game(heroes);
        expect(game).toBeInstanceOf(Game);
    });

    it('should have a champion after game ends with 2 heroes', () => {
        const heroes = HeroFactory.createRandomHeroes(2);
        const game = new Game(heroes);
        
        // Перехватываем вывод в консоль, чтобы не засорял вывод тестов
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        
        game.start();
        
        expect(game.getRemainingHeroesCount()).toBe(1);
        
        logSpy.mockRestore();
    });

    it('should have a champion after game ends with 4 heroes', () => {
        const heroes = HeroFactory.createRandomHeroes(4);
        const game = new Game(heroes);
        
        const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
        
        game.start();
        
        expect(game.getRemainingHeroesCount()).toBe(1);
        
        logSpy.mockRestore();
    });
});