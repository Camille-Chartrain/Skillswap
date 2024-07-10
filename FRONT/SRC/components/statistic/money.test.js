

describe('updateReceivedMoney', () => {

    test('devrait donner 5 pour 2 et 3', () => {
        const result = sum(2, 3);
        expect(result).toBe(5);
    });

    test('devrait donner 1 pour 2 et -1', () => {
        const result = sum(2, -1);
        expect(result).toBe(1);
    });

    test('devrait donner NaN pour des strings', () => {
        const result = sum('bla', 'bla');
        expect(result).toBeNaN();
    });

});

describe('updateDonatedMoney', () => {

    test('devrait donner 2 pour 5 et 3', () => {
        const result = (5 - 3);
        expect(result).toBe(2);
    });

    test('devrait donner 1 pour -2 et -1', () => {
        const result = (-2 - -1);
        expect(result).toBe(1);
    });

    test('devrait donner NaN pour des strings', () => {
        const result = sum('bla', 'bla');
        expect(result).toBeNaN();
    });

});



