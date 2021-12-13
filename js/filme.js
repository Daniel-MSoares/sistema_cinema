class Filme{
    constructor(){
        this.lsFilmes=JSON.parse(localStorage.getItem('filmes'))
        this.lsFilmesDestaque=JSON.parse(localStorage.getItem('filmesDestaque'))
        if(this.lsFilmes!==null){
            this.id= this.lsFilmes.length > 0 ? (this.lsFilmes[this.lsFilmes.length-1].id)+1 : 1
        }else{
            this.id= 1;
        }
        this.editar=null;
        this.filmes= this.lsFilmes !== null ? this.lsFilmes : []
        this.filmesDestaque= this.lsFilmesDestaque !== null ? this.lsFilmesDestaque : []
    }
    atualizaLocalStorage(){
        localStorage.setItem('filmes',JSON.stringify(this.filmes))
        localStorage.setItem('filmesDestaque',JSON.stringify(this.filmesDestaque))
    }
    salvar(){
        let filme=this.lerDados();
        if(this.validarCampos(filme)){
             if(this.editar==null){
                  this.adicionar(filme)
                  alert('Filme cadastrado com sucesso')   
             }else{
                  this.atualizarFilme(this.editar,filme)
                  alert('Filme Atualizado')   
            }
        }    
    }



    adicionar(filme){
      if(filme.destaque && this.filmesDestaque.length<=5){
         this.filmesDestaque.push(filme); 
      }
      this.filmes.push(filme);
      this.id++;
      this.atualizaLocalStorage();
      this.listarFilmesAdmin();
      this.limparCampos();
    }
    verificaDestaques(){
        if(this.filmesDestaque.length>=5){
            alert("Limite de filmes em detaque atingido(5)")
            document.getElementById('destacar').checked=!document.getElementById('destacar').checked
        }
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
      if(this.editar==null){
        if(document.getElementById('imgFilme').files.length!==0){
            objFilme.imgFilme='img/'+document.getElementById('imgFilme').files[0].name;
        }else{
            objFilme.imgFilme='img/'
        }
       }
      return objFilme
    }


    validarCampos(filme){
        let msg=''
        if(filme.nomeFilme===''){
            msg+='-Informe o nome do filme- \n'
        }
        if(filme.sinopse===''){
            msg+='-Informe uma sinopse do filme- \n'
        }
        if(filme.classificacao===''){
            msg+='-selecione a classificação do filme- \n'
        }
        if(filme.generoFilme===''){
            msg+='-selecione o genero do filme- \n'
        }

        if(filme.imgFilme==='img/' && this.editar == null){
           msg+='-selecione uma imagem para o filme- \n'
        }

        if(msg!==''){
            alert(msg);
            return false;
        }

        return true;

    }



    limparCampos(){
        document.getElementById('destacar').checked=false;
        document.getElementById('nomeFilme').value=''
        document.getElementById('sinopseFilme').value=''
        document.getElementById('classificacaoFilme').value=''
        document.getElementById('generoFilme').value=''
        document.getElementById('imgFilme').value=''
        document.getElementById('btnSave').innerText='salvar';
        document.getElementById('destacar').classList.remove('invisible');
        document.getElementById('labelDestacar').classList.remove('invisible');
        document.getElementById('labelImgFilme').innerText="Selecione a imagem do filme"
        document.getElementById('tituloForm').innerText='ADICIONAR NOVO TÍTULO';
        this.editar=null
    
    }
    listarFilmesAdmin(){
        usuario.validarAcesso('admin')
        usuario.verificaPermissao()
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
            td_acao.innerHTML=`<button onClick='filme.preparaAtualizar(${dadoFilme})' ><i class='fas fa-edit'></i>Editar</button>||
            <button onClick='filme.excluirFilme(${filme.id})'> <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button> ||
            <button ><i class='fas fa-info-circle'></i><a href='infoFilme.html?id=${filme.id}'>detalhes</a></button>`
           });
        // cria tabela de Destaques
        
            listaDestaques.forEach(destaque => {
            let tr=tbDestaque.insertRow();
            let td_id=tr.insertCell().innerText=destaque.id;
            let td_nome=tr.insertCell().innerText=destaque.nomeFilme;
            let td_acao=tr.insertCell();
            td_acao.innerHTML=`<button onClick='filme.excluirDestaque(${destaque.id})'>
                    <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button>`
           });

         //insere os valores do select para o form sessao nome filme
            listaFilmes.forEach(filme => {
            document.getElementById('filmeSessao').innerHTML=''
            let optionSelecionada=document.createElement('option')
            optionSelecionada.selected=true
            optionSelecionada.disabled=true
            optionSelecionada.innerHTML="-selecione o filme-"
            optionSelecionada.value=''
            this.filmes.forEach(filme => { 
                 let option=document.createElement('option')
                 option.value=filme.nomeFilme
                 option.innerText=filme.nomeFilme
                 document.getElementById('filmeSessao').appendChild(optionSelecionada)
                 document.getElementById('filmeSessao').appendChild(option)
            });
           
            
           });

            
       }

    listarFilmesHome(){
        let listaFilmes=this.filmes.reverse()
        let listaFilmesDestaque=this.filmesDestaque
        let catalogo=document.getElementById('catalogo')
//executa função que forma os links de navegação 
        usuario.verificaPermissao()

//muda exibição da home caso não tenha nehum filme adicionado
         if(listaFilmes.length==0){
             document.getElementById("sessaoDestaque").innerText='nenhum filme foi adicionado';
             document.getElementById("sessaoCartaz").classList.add('invisible'); 
         }else if(listaFilmesDestaque.length==0 && listaFilmes.length>0){
            document.getElementById("sessaoDestaque").classList.add('invisible');
         }
 
        let destaques=document.getElementById('destaques')
//lista os  destaques na home
        listaFilmesDestaque.forEach(destaque=>{
               
               let link=document.createElement('a');
               link.href='pages/infoFilme.html?id='+destaque.id;
               link.innerHTML=`<img class="cartaz cartaz-destaque" src="${destaque.imgFilme}" alt=${destaque.nomeFilme}">`
               destaques.appendChild(link)
               
        });
 

//  lista todos os filmes na home
        
            listaFilmes.forEach(filme => {
               let dadoFilme=JSON.stringify(filme)
               let link=document.createElement('a');
               link.href='pages/infoFilme.html?id='+filme.id;
               link.innerHTML=`<img class="cartaz" src="${filme.imgFilme}" alt=${filme.nomeFilme}">`
               catalogo.appendChild(link)
           });
         
       }

    lerDadosFilme(){
        usuario.verificaPermissao()
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        let dadoFilme=''
        this.filmes.forEach(filme=>{
            if(filme.id==id){
                dadoFilme=filme  
            }
        })
        
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
    
    preparaAtualizar(dados){
        this.editar=dados.id;
        document.getElementById('nomeFilme').value=dados.nomeFilme;
        document.getElementById('btnSave').innerText='Atualizar';
        document.getElementById('sinopseFilme').value=dados.sinopse;
        document.getElementById('classificacaoFilme').value=dados.classificacao;
        document.getElementById('generoFilme').value=dados.generoFilme;
        document.getElementById('labelImgFilme').classList.add('invisible')
        document.getElementById('imgFilme').classList.add('invisible')
        document.getElementById('destacar').classList.add('invisible');
        document.getElementById('labelDestacar').classList.add('invisible');
        document.getElementById('tituloForm').innerText='ATUALIZAR FILME';
    }


    atualizarFilme(id,filmeAt){
        for(let i =0;i<this.filmes.length;i++){
            if(this.filmes[i].id===id){
                this.atualizarSessao(this.filmes[i].nomeFilme,filmeAt.nomeFilme)
                this.filmes[i].nomeFilme=filmeAt.nomeFilme
                this.filmes[i].sinopse=filmeAt.sinopse
                this.filmes[i].generoFilme=filmeAt.generoFilme
                this.filmes[i].classificacao=filmeAt.classificacao
            }
        }

        this.atualizarDestaque(id,filmeAt)
        this.listarFilmesAdmin();
        this.atualizaLocalStorage();
        this.limparCampos()
        
    }
    atualizarDestaque(id,filmeAt){
            for(let i =0;i<this.filmesDestaque.length;i++){
                if(this.filmesDestaque[i].id===id){
                    this.filmesDestaque[i].nomeFilme=filmeAt.nomeFilme
                    this.filmesDestaque[i].sinopse=filmeAt.sinopse
                    this.filmesDestaque[i].generoFilme=filmeAt.generoFilme
                    this.filmesDestaque[i].classificacao=filmeAt.classificacao
                }
                this.atualizaLocalStorage();
                this.limparCampos();  
            }   
    }

    excluirFilme(id){
        
        for (let i = 0; i < this.filmes.length; i++) {
            if(this.filmes[i].id === id){
              if(window.confirm('deseja excluir o filme '+this.filmes[i].nomeFilme+'?')){ 
                 this.excluirSessao(this.filmes[i].nomeFilme)
                 this.filmes.splice(i,1)
                 }
             }
          
        }
       this.excluirDestaque(id)
       this.atualizaLocalStorage();
       if(this.lsFilmes.length===0){
            this.id=1
        }
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
    excluirSessao(nomeFilme){
        for(let i=0;i<sessao.sessoes.length;i++){
            if(sessao.sessoes[i].filmeSessao === nomeFilme){
                sessao.sessoes.splice(i,1)
            }
        }
        sessao.atualizaLocalStorage();
        sessao.listarSessoesAdmin();
        this.atualizaLocalStorage();
        this.listarFilmesAdmin()
    }
    atualizarSessao(nomeFilme,nomeatual){
           for(let i=0;i<sessao.sessoes.length;i++){
             if(sessao.sessoes[i].filmeSessao === nomeFilme){
               
               sessao.sessoes[i].filmeSessao = nomeatual
             }
           }
        sessao.atualizaLocalStorage();
        sessao.listarSessoesAdmin();
        this.atualizaLocalStorage();
        this.listarFilmesAdmin()
    }

}

var filme= new Filme