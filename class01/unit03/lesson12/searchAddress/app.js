function getAddress(cep) {
    let url = 'http://viacep.com.br/ws/'+cep+'/json/'
    const xmlHttp = new XMLHttpRequest()

    xmlHttp.open('GET', url)
    
    xmlHttp.onreadystatechange = () => {
        if(xmlHttp.readyState === 4 && xmlHttp.status === 200){ // validação sempre necessária
          let data = JSON.parse(xmlHttp.responseText);
         
          document.getElementById('endereco').value = data.logradouro
          document.getElementById('bairro').value = data.bairro
          document.getElementById('cidade').value = data.localidade
        }
    } 
    xmlHttp.send()
}