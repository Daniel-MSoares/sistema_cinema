class Filme{
    constructor(){
        this.id=1
        this.editar=null;
        this.lsFilmes=JSON.parse(localStorage.getItem('filmes'))
        this.lsFilmesDestaque=JSON.parse(localStorage.getItem('filmesDestaque'))
        this.filmes= this.lsFilmes !== null ? this.lsFilmes : []
        this.filmesDestaque= this.lsFilmesDestaque !== null ? this.lsFilmesDestaque : []
    }
    atualizaLocalStorage(){
        localStorage.setItem('filmes',JSON.stringify(this.filmes))
        localStorage.setItem('filmesDestaque',JSON.stringify(this.filmesDestaque))
    }
    adicionar(){
      let filme=this.lerDados();
      if(filme.destaque){
         this.filmesDestaque.push(filme); 
      }

      this.filmes.push(filme);
      this.id++;
      this.atualizaLocalStorage();
      this.listarFilmesAdmin();
      this.limparCampos();
      
      
    }
    
    verificaDestaques(){
       
    }

    lerDados(){
      let objFilme={}
      objFilme.id=this.id;
    //verifica se o filme deve ir pra destaques ou não
      let checkDestaque=document.getElementById('destacar');
      if(checkDestaque.checked){
        objFilme.destaque=true;
      }else{
        objFilme.destaque=false;
      }

      objFilme.nomeFilme=document.getElementById('nomeFilme').value;
      objFilme.sinopse=document.getElementById('sinopseFilme').value;
      objFilme.classificacao=document.getElementById('classificacaoFilme').value;
      objFilme.generoFilme=document.getElementById('generoFilme').value;
       
      //recebe o caminho passado pelo input tipo file e extrai o nome da imagem que está na pasta img
      let textoCaminho=JSON.stringify(document.getElementById('imgFilme').value);
      textoCaminho='img/'+textoCaminho.slice(15)
      textoCaminho=textoCaminho.replace(/"/,'')

      objFilme.imgFilme= textoCaminho;
      return objFilme
    }

    limparCampos(){
        document.getElementById('destacar').checked=false;
        document.getElementById('nomeFilme').value=''
        document.getElementById('sinopseFilme').value=''
        document.getElementById('classificacaoFilme').value=''
        document.getElementById('generoFilme').value=''
        document.getElementById('imgFilme').value=''
        
      }
    listarFilmesAdmin(){
        let listaFilmes=this.filmes
        let listaDestaques=this.filmesDestaque
        let tbody=document.getElementById('tbody')//seleciona o corpo da tabela de todos filmes
        let tbDestaque=document.getElementById('tbDestaque')//seleciona o corpo da tabela de favoritos
        //limpa corpo das tabelas
        tbody.innerText='';
        tbDestaque.innerText='';


        listaFilmes.forEach(filme => {
            let dadoFilme=JSON.stringify(filme);
            let tr=tbody.insertRow();
            let td_id=tr.insertCell().innerText=filme.id;
            let td_nome=tr.insertCell().innerText=filme.nomeFilme;
            let td_acao=tr.insertCell();
            td_acao.innerHTML=`<button onClick='filme.preparaEditar(${dadoFilme})' ><i class='fas fa-edit'></i>Editar</button>||
            <button onClick='filme.excluirFilme(${filme.id})'> <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button> ||
            <button ><i class='fas fa-info-circle'></i><a href='ingresso.html?obj=${dadoFilme}'>detalhes</a></button>`
           });
        // cria tabela de Destaques
        
        listaDestaques.forEach(destaque => {
            let tr=tbDestaque.insertRow();
            let td_id=tr.insertCell().innerText=destaque.id;
            let td_nome=tr.insertCell().innerText=destaque.nomeFilme;
            let td_acao=tr.insertCell();
            td_acao.innerHTML=`<button onClick='filme.excluirDestaque(${destaque.id})'> <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button>`
           });
            
       }

    listarFilmesHome(){
        let listaFilmes=this.filmes
        let listaFilmesDestaque=this.filmesDestaque
        let catalogo=document.getElementById('catalogo')
        
         if(listaFilmes.length==0){
             document.getElementById("sessaoDestaque").innerText='nenhum filme foi adicionado';
             document.getElementById("sessaoCartaz").classList.add('invisible');
             
        }
        let destaques=document.getElementById('destaques')
//lista os  destaques
        listaFilmesDestaque.forEach(destaque=>{
               let dadoFilme=JSON.stringify(destaque)
               let link=document.createElement('a');
               link.href='pages/ingresso.html?obj='+dadoFilme;
               link.innerHTML=`<img class="cartaz" src="${destaque.imgFilme}" alt=${destaque.nomeFilme}">`
               destaques.appendChild(link)
               console.log(dadoFilme)
        });
 

//  lista todos
        
               listaFilmes.forEach(filme => {
               let dadoFilme=JSON.stringify(filme)
               let link=document.createElement('a');
               link.href='pages/ingresso.html?obj='+dadoFilme;
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
        let imgFilme=document.getElementById('cartazFilme')
        
        imgFilme.src='../'+dadoFilme.imgFilme;
        nomeFilme.innerText=dadoFilme.nomeFilme;
        sinopse.innerText=dadoFilme.sinopse;
        classificacao.innerText=dadoFilme.classificacao;
        genero.innerText=dadoFilme.generoFilme;
         
    
    
    }
    
    preparaEditar(dados){
        this.editar=dados.id;
        console.log(dados)
        document.getElementById('nomeFilme').value=dados.nomeFilme;
          
    }


    editarFilme(){

    }

    excluirFilme(id){
        
        for (let i = 0; i < this.filmes.length; i++) {
            if(this.filmes[i].id === id){
                 this.filmes.splice(i,1)
             }

        }
       this.excluirDestaque(id)
       this.atualizaLocalStorage();
       this.listarFilmesAdmin();
       
    }

    excluirDestaque(id){
        for(let i=0;i<this.filmesDestaque.length;i++){
            if(this.filmesDestaque[i].id === id){
                this.filmesDestaque.splice(i,1)
            }
        }
        this.atualizaLocalStorage();
        this.listarFilmesAdmin();
    }
}

class ingreesso{

}

class usuario{
    
}
var filme= new Filme



