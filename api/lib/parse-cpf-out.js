module.exports = (aluno) => {
    let strCPF = aluno.cpf
    if (typeof strCPF == 'number') strCPF = strCPF.toString()
    let cpfArr = strCPF.split('')
    let resultArr = cpfArr.map((el, ind) => {
        switch (ind) {
            case 2:
                return el + '.'
            case 5:
                return el + '.'
            case 8:
                return el + '-'
            default:
                return el
        }

    })
    aluno.cpf = resultArr.join('')
    return aluno

}