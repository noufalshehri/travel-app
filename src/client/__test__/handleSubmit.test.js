import 'babel-polyfill'

import { handleSubmit } from '../js/formHandler'

describe('Testing form handler ', () => {
    test('Test the handleSubmit() function', () => {
        expect(handleSubmit).toBeDefined()
    })
})