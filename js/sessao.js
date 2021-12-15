class Sessao{
    constructor(){
        this.lsSessao=JSON.parse(localStorage.getItem('sessao'))
        if(this.lsSessao!==null){
            this.id=this.lsSessao.length > 0? (this.lsSessao[this.lsSessao.length-1].idSessao)+1 : 1
        }else{
            this.id=1
        }
        this.sessoes=this.lsSessao !==null ? this.lsSessao : []
    }
    atualizaLocalStorage(){
        localStorage.setItem('sessao',JSON.stringify(this.sessoes))
    }
    
    salvar(){
        let sessao=this.lerDadosSessao()
        if(this.validarCampos(sessao)){
            this.adicionar(sessao)
         }
        
    }
    
  adicionar(sessao){
    this.sessoes.push(sessao)
    this.limparCampos()
    this.atualizaLocalStorage()
    this.listarSessoesAdmin()
    this.id++
    alert('Sessão criada com sucesso')
  }


    lerDadosSessao(){
      let objSessao={} 
      objSessao.idSessao=this.id;
      objSessao.filmeSessao=document.getElementById("filmeSessao").value
      objSessao.horarioSessao=document.getElementById("horarioSessao").value
      objSessao.dataSessao=document.getElementById("dataSessao").value.split('-').reverse().join('/')
      objSessao.salaSessao=document.getElementById("salaSessao").value
      objSessao.idiomaSessao=document.getElementById("idiomaSessao").value
      objSessao.precoIngresso=parseFloat(document.getElementById("precoIngresso").value).toFixed(2)
      objSessao.cadeirasOcupadas=[]
      return objSessao      
    }
    limparCampos(){
        document.getElementById("filmeSessao").value=''
        document.getElementById("horarioSessao").value=''
        document.getElementById("dataSessao").value=''
        document.getElementById("salaSessao").value=''
        document.getElementById("idiomaSessao").value=''
        document.getElementById("precoIngresso").value=''
    }

    listarSessoesAdmin(){
          let listaSessoes=this.sessoes
          let tbSessoes=document.getElementById('tbSessoes')
          tbSessoes.innerText=''
            listaSessoes.forEach(sessao => {
            let tr=tbSessoes.insertRow();
            let td_id=tr.insertCell().innerText=sessao.idSessao;
            let td_nomeFilme=tr.insertCell().innerText=sessao.filmeSessao;
            let td_horario=tr.insertCell().innerText=sessao.horarioSessao;
            let td_data=tr.insertCell().innerText=sessao.dataSessao;
            let td_sala=tr.insertCell().innerText=sessao.salaSessao;
            let td_idioma=tr.insertCell().innerText=sessao.idiomaSessao;
            let td_preco=tr.insertCell().innerText=sessao.precoIngresso;
            let td_acao=tr.insertCell().innerHTML=`<button onClick='sessao.excluirSessao(${sessao.idSessao})'> <i style='color:red;'class='fas fa-trash-alt'></i>Excluir</button>`
           });
        
    }
    excluirSessao(id){
       for(let i =0 ;i<this.sessoes.length;i++){
            if(this.sessoes[i].idSessao===id){
                this.sessoes.splice(i,1)
            }
        }
        this.atualizaLocalStorage();
        if(this.lsSessao.length===0){
            this.id=1
        } 
        this.listarSessoesAdmin()
        
    }

    validarCampos(sessao){
        let msg=''
        if(sessao.filmeSessao===''){
            msg+='-Informe o filme que será exibido- \n'
        }
        if(sessao.horarioSessao===''){
            msg+='-Informe o horário da sessão- \n'
        }
        if(sessao.dataSessao===''){
            msg+='-Informe a data da sessão- \n'
        }
        if(sessao.precoIngresso===''){
            msg+='-Informe o Preço do ingresso- \n'
        }

        if(sessao.salaSessao===''){
           msg+='-Informe a sala da sessão- \n'
        }
        if(sessao.idiomaSessao===''){
            msg+='-Informe o tipo da sessão- \n'
         }
        this.sessoes.forEach(sessaoSalva => {
            if(sessao.dataSessao === sessaoSalva.dataSessao &&
             sessao.horarioSessao === sessaoSalva.horarioSessao &&
             sessao.salaSessao === sessaoSalva.salaSessao
             ){ 
                msg+='-Esta sala está ocupada nessa Data e horário'
            }
            
        });
        

        if(msg!==''){
            alert(msg);
            return false;
        }

        return true;

    }

    listaSessoesInfoFilme(nomeFilme){
       document.getElementById('tituloSessoes').classList.remove('invisible')
       document.getElementById('btnMostraSessoes').classList.add('invisible')
       let sessoesFilme=[]
        this.sessoes.forEach(sessao=>{
             if(sessao.filmeSessao===nomeFilme){
                sessoesFilme.push(sessao);
             }
        });
        // console.log(sessoesFilme)
        if(sessoesFilme.length===0){
            document.getElementById('tituloSessoes').innerText='Desculpe,não há sessões disponíveis,no momento,tente mais tarde!'
        }
        for(let i=0;i<sessoesFilme.length;i++){
            
            if(sessoesFilme[i].cadeirasOcupadas.length<72){
                var ariaSessao=null
               if(sessoesFilme[i].salaSessao=='Sala 1'){
                   document.getElementById('tituloSala1').classList.remove('invisible')
                   ariaSessao=document.getElementById('sessoesSala1')
               }else if(sessoesFilme[i].salaSessao=='Sala 2'){
                document.getElementById('tituloSala2').classList.remove('invisible')
                ariaSessao=document.getElementById('sessoesSala2')
               }else if(sessoesFilme[i].salaSessao=='Sala 3'){
                document.getElementById('tituloSala3').classList.remove('invisible')
                ariaSessao=document.getElementById('sessoesSala3')
               }
                
                let btnSessao=document.createElement('a')
                btnSessao.href=`comprarIngresso.html?idsessao=${sessoesFilme[i].idSessao}`
                btnSessao.classList.add('btn')
                
                if(sessoesFilme[i].idiomaSessao ==='dub'){
                    btnSessao.classList.add('btn-primary')
                }else{
                    btnSessao.classList.add('btn-warning')
                }


                btnSessao.classList.add('mr-1')
                btnSessao.classList.add('btnSessao')
                btnSessao.innerHTML=`<small>${sessoesFilme[i].idiomaSessao}</small>-${sessoesFilme[i].horarioSessao}<br>${sessoesFilme[i].dataSessao}`
                
                btnSessao.addEventListener("mouseover", function () {
                    btnSessao.innerHTML = 'Comprar'
                })
                btnSessao.addEventListener("mouseout", function () {
                    btnSessao.innerHTML =`<small>${sessoesFilme[i].idiomaSessao}</small>-${sessoesFilme[i].horarioSessao}<br>${sessoesFilme[i].dataSessao}`
                })
               
                    ariaSessao.appendChild(btnSessao)
                
                
            }
           
        }
    }

}
var sessao=new Sessao