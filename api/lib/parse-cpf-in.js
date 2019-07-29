module.exports = (strCPF) =>{
    if (strCPF.indexOf('.') === -1) return strCPF
    strCPF = strCPF.replace(/(\.|\-)/g, '')
    console.log(strCPF)
    return strCPF    
}
