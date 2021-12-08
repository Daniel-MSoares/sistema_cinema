class Ingresso{
    constructor(){
        this.lsIngressos=JSON.parse(localStorage.getItem('ingressos'))
        if(this.lsIngressos!==null){
            this.id= this.lsIngressos.length > 0 ? (this.lsIngressos[this.lsIngressos.length-1].id)+1 : 1
        }else{
            this.id= 1;
        }
        this.ingressos=this.lsIngressos!== null?this.lsIngressos :[]
        this.dadoSessao=null
        this.totalExtras=0
        this.totalIngressos=0
        this.total=0
        this.cadeiras=[]
        this.produtos=[
            { 
              id:1,
              nome:'Pipoca Grande',
              img:'https://via.placeholder.com/200',
              preco:4.00,
              quantidade:0
            },
            {
              id:2,
              nome:'Pipoca média',
              img:'https://via.placeholder.com/200',
              preco:3.00,
              quantidade:0
            },
            {
              id:3,
              nome:'Pipoca pequena',
              img:'https://via.placeholder.com/200',
              preco:2.00,
              quantidade:0
            },
            {
              id:4,
              nome:'Pipoca Doce(250g)',
              img:'https://via.placeholder.com/200',
              preco:4.00,
              quantidade:0
            },
            {   
                id:5,
                nome:'refrigerante(450ml)',
                img:'https://via.placeholder.com/200',
                preco:7.00,
                quantidade:0
            },
            {   
                id:6,
                nome:'água(500ml com gás)',
                img:'https://via.placeholder.com/200',
                preco:3.50,
                quantidade:0
              },
              {   
                id:7,
                nome:'água(500ml sem gás)',
                img:'https://via.placeholder.com/200',
                preco:3.00,
                quantidade:0
              },
              {   
                id:8,
                nome:'mentos(37.5g)',
                img:'https://via.placeholder.com/200',
                preco:2.50,
                quantidade:0
              }
          ]
    }
   comprarIngresso(){
       let ingresso=this.lerDadosIngresso();
       if(this.validacampos(ingresso)){
           this.comprar(ingresso)
       }
      
   }

   comprar(ingresso){
       this.ingressos.push(ingresso)
       this.atualizaLocalStorage();
       this.ocupaCadeira()
       console.log(ingresso)
       this.mostrarCadeiras()
       this.id++
       whindow.location.href='usuario.html'
   }

   validacampos(ingresso){
        let msg=''
        if(ingresso.qtdIngressos==0){
            msg='informe a quantidade de ingressos\n'
        }
        if(ingresso.cadeiras.length==0){
            msg+='Selecione o seu assento\n'
        }else if(ingresso.cadeiras.length<ingresso.qtdIngressos  ){
            msg+='Por Favor,escolha uma cadeira para cada Ingresso\n'
        }
        if(msg !== ''){
            alert(msg)
            return false
        }else{
            return true
        }
        
   }


   ocupaCadeira(){
     for (let i = 0; i < this.cadeiras.length; i++) {
           for (let index = 0; index < sessao.sessoes.length; index++) {
               if(this.dadoSessao.idSessao === sessao.sessoes[index].idSessao){
                sessao.sessoes[index].cadeirasOcupadas.push(this.cadeiras[i])
             }   
           }    
       }; 
     sessao.atualizaLocalStorage()
   }

    atualizaLocalStorage(){
        localStorage.setItem('ingressos',JSON.stringify(this.ingressos))
    }
    
    exibirDadosSessao(){
        let urlParams = new URLSearchParams(window.location.search);
        let idSessao =parseInt(urlParams.get('idsessao'))
        let dadoSessao=null

        sessao.sessoes.forEach(sessao => {
            if(idSessao===sessao.idSessao){
                dadoSessao=sessao
            }
        });
        this.dadoSessao=dadoSessao
        document.getElementById('tituloFilmeIngresso').innerText=this.dadoSessao.filmeSessao;
        document.getElementById('salaFilmeIngresso').innerText=this.dadoSessao.salaSessao;
        document.getElementById('dataFilmeIngresso').innerText=this.dadoSessao.dataSessao;
        document.getElementById('horaFilmeIngresso').innerText=this.dadoSessao.horarioSessao;
        
        let idiomaSessao=document.getElementById('idiomaFilmeIngresso')
        if(this.dadoSessao.idiomaSessao==='dub'){
            idiomaSessao.innerText='Dublado'
        }else(
            idiomaSessao.innerText='Legendado'
        )
        document.getElementById('precoFilmeIngresso').innerText=this.dadoSessao.precoIngresso;
        
    }
    
    mostraProdutos(){
        let divProduto=document.getElementById('produtos')
        divProduto.innerHTML=''
        this.produtos.forEach( produto=>{
           let caixaProduto=document.createElement('div')
           caixaProduto.classList.add('caixa-produto')
           caixaProduto.innerHTML=`<img src="${produto.img}" alt="pipoca" width="130"><br>
                                   <span>${produto.nome}</span><br><span>-R$ ${produto.preco.toFixed(2)}-</span><br>
                                   <button class="botao-redondo remover mt-2" onclick="ingresso.removeItem('${produto.nome}','${produto.id}')">-</button>
                                   <input class='qtdProduto mt-2' id='qtditem${produto.id}' value=0 type="text" disabled>
                                   <button class="botao-redondo adicionar mt-2" onclick="ingresso.adicionaItem('${produto.nome}','${produto.id}')">+</button>
                                   `
           divProduto.appendChild(caixaProduto)
        });
    }
    adicionaItem(nomeProduto,idProduto){
        document.getElementById('qtditem'+idProduto).value=parseFloat(document.getElementById('qtditem'+idProduto).value)+1
        this.produtos.forEach(produto=>{
            if(produto.nome==nomeProduto){
                produto.quantidade++
                
                this.totalExtras+=produto.preco
            }
        })
        
        this.mostrarTotal()
    }
    removeItem(nomeProduto,idProduto){
        let valor=parseFloat(document.getElementById('qtditem'+idProduto).value)
        if(valor>0){
            document.getElementById('qtditem'+idProduto).value=valor-1
            
            this.produtos.forEach(produto=>{
            if(produto.nome==nomeProduto && produto.quantidade>0 ){
                produto.quantidade--
                if(this.totalExtras > 0){
                this.totalExtras-=produto.preco
                }
            }
        })
       }
        this.mostrarTotal()  
    }
    
    lerDadosIngresso(){
        let objIngresso={}
        objIngresso.id=this.id
        objIngresso.nomecliente=usuario.usuarioLogado.nome
        objIngresso.idcliente=usuario.usuarioLogado.id
        objIngresso.nomefilme=this.dadoSessao.filmeSessao
        objIngresso.idiomafilme=this.dadoSessao.idiomaSessao
        objIngresso.horario=this.dadoSessao.horarioSessao
        objIngresso.data=this.dadoSessao.dataSessao
        objIngresso.sala=this.dadoSessao.salaSessao
        objIngresso.precoIngresso=this.dadoSessao.precoIngresso
        objIngresso.qtdIngressos=parseInt(document.getElementById('qtdIngresso').value)
        objIngresso.descricao=this.geraTextoDescricao()
        objIngresso.cadeiras=this.cadeiras
        objIngresso.codigoIngresso=this.gerarCodigoIngresso()
        objIngresso.valorFinal=this.total
        return objIngresso
    }
    geraTextoDescricao(){
         let descricao=`<small>${document.getElementById('qtdIngresso').value} ingresso(s) </small><br>`
         this.produtos.forEach(produto=>{
             if(produto.quantidade!==0){
                descricao+=`<small>${produto.quantidade} ${produto.nome}(${produto.preco.toFixed(2)})</small><br>`
             }
         })
         return descricao;
    }
    
    mudaValorIngressos(){
        let qtdIngresso=document.getElementById('qtdIngresso').value
        if(qtdIngresso=='' || qtdIngresso< 0){
            qtdIngresso=0 
            document.getElementById('qtdIngresso').value=0   
        }
        this.totalIngressos=(parseFloat(this.dadoSessao.precoIngresso)*parseInt(qtdIngresso)).toFixed(2)
        this.mostrarTotal();
    }

    gerarCodigoIngresso(){
        // para garantir que o código é unico
         let codigosGerados=[]
         this.ingressos.forEach(ingresso =>{
            codigosGerados.push(ingresso.codigoIngresso)
         })
         let codigo=''
         do{
             codigo=Math.random().toString(36).substr(2)
         } while (codigosGerados.includes(codigo));
         return codigo
    }

    mostrarTotal(){
        let valortotal=(parseFloat(this.totalExtras) + parseFloat(this.totalIngressos)).toFixed(2)
        this.total=valortotal
        let spantotal=document.getElementById('total')
        spantotal.innerText='R$ '+valortotal
    }
    mostrarCadeiras(){
        if(document.getElementById('divCadeiras').classList!==''){
            document.getElementById('divCadeiras').classList.remove('invisible')
        }
        document.getElementById('assentos').innerHTML=''
        for (let i = 72; i > 0; i--) {
            
           let cadeira=document.createElement('button')
            cadeira.id='cadeira'+i
            cadeira.classList.add('cadeira')
            if(this.dadoSessao.cadeirasOcupadas.includes(i)){
                 cadeira.classList.add('ocupado')
                 cadeira.addEventListener('click',()=>{console.log('Assento ocupado')})
            }else if(this.cadeiras.includes(i)){
                cadeira.classList.add('selecionado')
            }
            else{
                cadeira.addEventListener('click',()=>{ingresso.selecionarCadeira(i)})
            }
            
            cadeira.innerText=i
            document.getElementById('assentos').appendChild(cadeira)
        }
        
       
    }
    selecionarCadeira(cadeira){
        let qtIngressos=parseInt(document.getElementById('qtdIngresso').value)
        if(this.cadeiras.length+1 > qtIngressos  ){
            this.cadeiras.shift()
            this.cadeiras.push(cadeira)
        }else{
          this.cadeiras.push(cadeira)
        }
        document.getElementById('cadeiras').innerText=this.cadeiras
        this.mostrarCadeiras()
    }

    exibirMeusIngressos(){
        let qtdIngresso=0
        let areaIngressos=document.getElementById('areaIngressos')
        areaIngressos.innerHTML=''
        this.ingressos.forEach(ingresso=>{
            
            if(ingresso.idcliente===usuario.usuarioLogado.id){ 
                let elmIngresso=document.createElement('div')
                elmIngresso.classList.add('row')
                elmIngresso.classList.add('ingresso')
                elmIngresso.classList.add('mt-2')
                elmIngresso.innerHTML=`<div class='col-md-10'>
                <p>Cliente: ${ingresso.nomecliente} | Data:${ingresso.data} | Horário:${ingresso.horario}h | ${ingresso.sala} | 
                 Cadeiras:[${ingresso.cadeiras}]<br>
                 filme: ${ingresso.nomefilme}(R$ ${ingresso.precoIngresso} - ${ingresso.idiomafilme})<br>
                 pedido:<br>${ingresso.descricao}<br>
                 código: ${ingresso.codigoIngresso}<br>
                 total:${ingresso.valorFinal} 
                </p>
               </div>
               <div class="col-md-2 btnIngresso">
                    <button onclick='console.log("${ingresso.codigoIngresso}")'class="btn btn-success">Ver Codigo</button>
                  </div> 
               `
               areaIngressos.appendChild(elmIngresso)
               qtdIngresso++
            }
           
        })
         if(qtdIngresso==0){
                let msgIngresso=document.createElement('h1')
                msgIngresso.innerText='Você Não Tem Ingressos Disponíveis'
                areaIngressos.appendChild(msgIngresso)
            }
    }

    pesquisarIngresso(codigo){
        let dadosIngresso=document.getElementById('dadosIngresso')
        dadosIngresso.innerHTML=''
          this.ingressos.forEach(ingresso=>{
              if(ingresso.codigoIngresso === codigo){
                  let elmIngresso=document.createElement('div')
                  elmIngresso.classList.add('row')
                  elmIngresso.classList.add('ingresso')
                  elmIngresso.classList.add('mt-2')
                  elmIngresso.classList.add('text-white')
                  elmIngresso.innerHTML=`
                  <div class='col-md-10'>
                    <p>Cliente: ${ingresso.nomecliente} | Data:${ingresso.data} | Horário:${ingresso.horario}h | ${ingresso.sala} | 
                    Cadeiras:[${ingresso.cadeiras}]<br>
                    filme: ${ingresso.nomefilme}(R$ ${ingresso.precoIngresso} - ${ingresso.idiomafilme})<br>
                    pedido:<br>${ingresso.descricao}<br>
                    código: ${ingresso.codigoIngresso}<br>
                    total:${ingresso.valorFinal}       
                   </p>
                   </div>
                   <div class="col-md-2 btnIngresso">
                    <button onclick='ingresso.excluirIngresso("${ingresso.id}")'class="btn btn-danger">Rasgar Ingresso</button>
                  </div> 
               `
               dadosIngresso.appendChild(elmIngresso)
              }
          })
    }

    excluirIngresso(id){
         for (let i = 0; i < this.ingressos.length; i++) {
           if(this.ingressos[i].id==id){
            if(window.confirm('deseja rasgar este ingresso?')){
                this.ingressos.splice(i,1);
                document.getElementById('campoCodigoIngresso').value=''
                document.getElementById('dadosIngresso').innerHTML=''
            }
            
           }
           
       }
       this.atualizaLocalStorage();
    }
     
}
var ingresso=new Ingresso