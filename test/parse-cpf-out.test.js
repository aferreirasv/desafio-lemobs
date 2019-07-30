const parse_cpf_out = require('../api/lib/parse-cpf-out')
const assert = require('assert')
describe('Teste da formatação do output cpf', () => {
    it('deve retornar 000.000.000-00', (done) => {
        assert.deepEqual(parse_cpf_out({ cpf: '00000000000' }), { cpf: '000.000.000-00' })
        done()
    })
    it('deve retornar 123.123.123-12', (done) => {
        assert.deepEqual(parse_cpf_out({ cpf: 12312312312 }), { cpf: '123.123.123-12' })
        done()
    })

})