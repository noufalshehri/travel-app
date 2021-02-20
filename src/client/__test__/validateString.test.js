import { validateString } from '../js/validateString'

describe('Testing the string validation', () => {
    test('Test validateString() function', () => {
        expect(validateString).toBeDefined()
    })

    test('check that the string return false for invalid input', () => {
        expect(validateString('9aris')).toBeFalsy()
    })

    test('check that the url return true for valid input', () => {
        expect(validateString('paris')).toBeTruthy()
    })

})