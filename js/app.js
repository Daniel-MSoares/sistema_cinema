class Filme{
    constructor(){
        this.id=1
        this.bdLocalStorage=JSON.parse(localStorage.getItem('filmes'))
        this.filmes= this.bdLocalStorage !== null ? this.bdLocalStorage : []
    }
    atualizaLocalStorage(){
        localStorage.setItem('filmes',JSON.stringify(this.filmes))
    }
    adicionar(){
      let filme=this.lerDados();
      this.filmes.push(filme);
      this.id++;
      this.atualizaLocalStorage();
      this.listarFilmesAdmin();
      this.limparCampos();
      
      
    }

    lerDados(){
      let objFilme={}
      objFilme.id=this.id;
      objFilme.nomeFilme=document.getElementById('nomeFilme').value;
      objFilme.sinopse=document.getElementById('sinopseFilme').value;
      objFilme.classificacao=document.getElementById('classificacaoFilme').value;
      objFilme.generoFilme=document.getElementById('generoFilme').value;
      objFilme.precoIngresso=document.getElementById('precoIngresso').value;
      objFilme.horarioSessao=document.getElementById('horarioSessao').value;
      objFilme.dataSessao=document.getElementById('dataSessao').value;
      
      //recebe o caminho passado pelo input tipo file e extrai o nome da imagem que está na pasta img
      let textoCaminho=JSON.stringify(document.getElementById('imgFilme').value);
      textoCaminho='img/'+textoCaminho.slice(15)
      textoCaminho=textoCaminho.replace(/"/,'')

      objFilme.imgFilme= textoCaminho;
      return objFilme
    }

    limparCampos(){
        document.getElementById('nomeFilme').value=''
        document.getElementById('sinopseFilme').value=''
        document.getElementById('classificacaoFilme').value=''
        document.getElementById('generoFilme').value=''
        document.getElementById('precoIngresso').value=''
        document.getElementById('horarioSessao').value=''
        document.getElementById('dataSessao').value=''
        document.getElementById('imgFilme').value=''
        
      }
    listarFilmesAdmin(){
        let listaFilmes=this.filmes
        let tbody=document.getElementById('tbody')//seleciona o corpo da tabela
        tbody.innerText=''
        listaFilmes.forEach(filme => {
            let dadoFilme=JSON.stringify(filme);
            let tr=tbody.insertRow();
            let td_id=tr.insertCell().innerText=filme.id;
            let td_nome=tr.insertCell().innerText=filme.nomeFilme;
            let td_acao=tr.insertCell();
            td_acao.innerHTML=`<button ><i class='fas fa-edit'></i>Editar</button>||
            <button onClick='filme.excluirFilme(${filme.id})'> <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button> ||
            <button ><i class='fas fa-info-circle'></i><a href='ingresso.html?obj=${dadoFilme}'>detalhes</a></button>`
           });
           
       }

    listarFilmesHome(){
        let listaFilmes=this.filmes
        let catalogo=document.getElementById('catalogo')
               listaFilmes.forEach(filme => {
               let dadoFilme=JSON.stringify(filme)
               let link=document.createElement('a');
               link.href='pages/ingresso.html?obj='+dadoFilme;
               console.log(filme.imgFilme)
               link.innerHTML=`<img class="cartaz" src="${filme.imgFilme}" alt=${filme.nomeFilme}">`
               catalogo.appendChild(link)
           });
         
       }

    lerDadosFilme(){
        const urlParams = new URLSearchParams(window.location.search);
        const dadoFilme = JSON.parse(urlParams.get('obj'));
        console.log(dadoFilme)
        
        let nomeFilme=document.getElementById('nomeFilme')
        let sinopse=document.getElementById('sinopse')
        let classificacao=document.getElementById('classificacao')
        let genero=document.getElementById('genero')
        let preco=document.getElementById('preco')
        let horario=document.getElementById('horario')
        let data=document.getElementById('data')
        let imgFilme=document.getElementById('cartazFilme')
        
        imgFilme.src='../'+dadoFilme.imgFilme;
        nomeFilme.innerText=dadoFilme.nomeFilme;
        sinopse.innerText=dadoFilme.sinopse;
        classificacao.innerText=dadoFilme.classificacao;
        genero.innerText=dadoFilme.generoFilme;
        preco.innerText=dadoFilme.precoIngresso;
        horario.innerText=dadoFilme.horarioSessao;
        data.innerText=dadoFilme.dataSessao;
    
    
    }

    excluirFilme(id){
        for (let i = 0; i < this.filmes.length; i++) {

            if(this.filmes[i].id === id){
                 this.filmes.splice(i,1)
             }
        }
       this.atualizaLocalStorage();
       this.listarFilmesAdmin();
       
       console.log(this.filmes)
    }
}
var filme= new Filme



