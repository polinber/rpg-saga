import { describe, it, expect } from 'vitest';
import { Knight } from '../src/models/Knight';
import { Mage } from '../src/models/Mage';
import { Archer } from '../src/models/Archer';

describe('Hero classes', () => {
    it('Knight should deal bonus damage with special ability', () => {
        const knight = new Knight('Артур', 100, 20);
        const target = new Mage('Гэндальф', 100, 10);
        const result = knight.useSpecialAbility(target);
        expect(result.damage).toBe(26); // 20 + 30% = 26
        expect(target.getHealth()).toBe(74);
    });

    it('Mage charm should not deal damage', () => {
        const mage = new Mage('Мерлин', 100, 10);
        const target = new Knight('Рейгар', 100, 20);
        const result = mage.useSpecialAbility(target);
        expect(result.damage).toBe(0);
    });

    it('Archer should use fire arrows only once', () => {
        const archer = new Archer('Леголас', 100, 15);
        const target = new Knight('Вильямс', 100, 20);
        
        const first = archer.useFireArrows(target);
        const second = archer.useFireArrows(target);
        
        expect(first.damage).toBe(6);
        expect(second.damage).toBe(0);
        expect(target.getHealth()).toBe(94); // 100 - 6 = 94
    });

    it('Archer should use ice arrows twice', () => {
        const archer = new Archer('Леголас', 100, 15);
        const target = new Knight('Вильямс', 100, 20);
        
        const first = archer.useIceArrows(target);
        const second = archer.useIceArrows(target);
        const third = archer.useIceArrows(target);
        
        expect(first.damage).toBe(15);
        expect(second.damage).toBe(15);
        expect(third.damage).toBe(0);
        expect(target.getHealth()).toBe(70); // 100 - 15 - 15 = 70
    });

    it('Archer ice arrows should add bonus damage over next 3 attacks', () => {
        const archer = new Archer('Леголас', 100, 15);
        const target = new Knight('Вильямс', 100, 20);
        
        archer.useIceArrows(target);
        // Первая обычная атака после ледяных стрел
        archer.attack(target);
        const bonusDamage = 2; // каждый использованный заряд даёт +2
        expect(target.getHealth()).toBe(100 - 15 - (15 + bonusDamage));
    });
});