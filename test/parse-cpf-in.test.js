const parse_cpf_in = require('../api/lib/parse-cpf-in')
const assert = require('assert')

describe('Teste da formataçao do input cpf', () => {
    it('deve retornar 00000000000', (done) => {
        assert.equal(parse_cpf_in('000.000.000-00'), '00000000000')
        done()
    })
    it('deve retornar 12312312312', (done) => {
        assert.equal(parse_cpf_in(12312312312), '12312312312')
        done()
    })
    it('deve retornar null', (done) => {
        assert.equal(parse_cpf_in(123123123123), null)
        done()
    })
    it('deve retornar null', (done) => {
        assert.equal(parse_cpf_in('abcabc123'), null)
        done()
    })
})