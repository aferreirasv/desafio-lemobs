module.exports = (cpf) => {
    strCpf = cpf.toString()
    let cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/
    if (!cpfRegex.test(strCpf) && !/^\d{11}$/.test(strCpf)) return null
    strCpf = strCpf.replace(/(\.|\-)/g, '')
    return strCpf
}
