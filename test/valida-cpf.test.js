const assert = require('assert')
const valida_cpf = require('../api/lib/valida-cpf')

describe("Validação de CPF", () => {
    it("deve retornar false", (done) => {
        assert.equal(valida_cpf(00000000000), false)
        done()
    })
    it("deve retornar false", (done) => {
        assert.equal(valida_cpf('00000000000'), false)
        done()
    })
    it("deve retornar false", (done) => {
        assert.equal(valida_cpf(72612388833), false)
        done()
    })
    it("deve retornar false", (done) => {
        assert.equal(valida_cpf('12312312312'), false)
        done()
    })
    it("deve retornar true", (done) => {
        assert.equal(valida_cpf(61865428230), true)
        done()
    })
    it("deve retornar true", (done) => {
        assert.equal(valida_cpf('61865428230'), true)
        done()
    })
})