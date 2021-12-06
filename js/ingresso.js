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
        this.total=0
        // this.cadeiras=[]
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
                nome:'água(500ml)',
                img:'https://via.placeholder.com/200',
                preco:3.00,
                quantidade:0
              }
          ]
    }
   comprarIngresso(){
       let ingresso=this.lerDadosIngresso();
       this.ingressos.push(ingresso)
       this.atualizaLocalStorage();
       console.log(ingresso.codigoIngresso)

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
       //muda o formato da data de americano para Brasileiro
        let data=this.dadoSessao.dataSessao
        data= data.split('-').reverse().join('/');
        document.getElementById('dataFilmeIngresso').innerText=data;
        document.getElementById('horaFilmeIngresso').innerText=this.dadoSessao.horarioSessao;
        
        let idiomaSessao=document.getElementById('idiomaFilmeIngresso')
        if(this.dadoSessao.idiomaSessao==='dub'){
            idiomaSessao.innerText='Dublado'
        }else(
            idiomaSessao.innerText='Legendado'
        )
        document.getElementById('precoFilmeIngresso').innerText=this.dadoSessao.precoIngresso;
        console.log(this.dadoSessao)
    }
    
    mostraProdutos(){
        let divProduto=document.getElementById('produtos')
        divProduto.innerHTML=''
        this.produtos.forEach( produto=>{
           let caixaProduto=document.createElement('div')
           caixaProduto.classList.add('caixa-produto')
           caixaProduto.innerHTML=`<img src="${produto.img}" alt="pipoca" width="130"><br>
                                   <span>${produto.nome}</span><br>
                                   <button class="botao-redondo remover" onclick="ingresso.removeItem('${produto.nome}','${produto.id}')">-</button>
                                   <input class='qtdProduto' id='qtditem${produto.id}' value=0 type="text" disabled>
                                   <button class="botao-redondo adicionar" onclick="ingresso.adicionaItem('${produto.nome}','${produto.id}')">+</button>
                                   `
           divProduto.appendChild(caixaProduto)
        });
    }
    adicionaItem(nomeProduto,idProduto){
        document.getElementById('qtditem'+idProduto).value=parseFloat(document.getElementById('qtditem'+idProduto).value)+1
        this.produtos.forEach(produto=>{
            if(produto.nome==nomeProduto){
                produto.quantidade++
            }
        })
        console.log(this.produtos)
    }
    removeItem(nomeProduto,idProduto){
        let valor=parseFloat(document.getElementById('qtditem'+idProduto).value)
        if(valor>0){
            document.getElementById('qtditem'+idProduto).value=valor-1
        }
        this.produtos.forEach(produto=>{
            if(produto.nome==nomeProduto && produto.quantidade>0){
                produto.quantidade--
            }
        })
        console.log(this.produtos)
    }

    lerDadosIngresso(){
        let objIngresso={}
        objIngresso.id=this.id
        if(usuario.usuarioLogado==null){
            objIngresso.nomecliente=''
        }else{
            objIngresso.nomecliente=usuario.usuarioLogado.nome
        }

        objIngresso.nomefilme=this.dadoSessao.filmeSessao
        objIngresso.idiomafilme=this.dadoSessao.idiomaSessao
        objIngresso.horario=this.dadoSessao.horarioSessao
        objIngresso.data=this.dadoSessao.dataSessao
        objIngresso.sala=this.dadoSessao.salaSessao
        objIngresso.precoIngresso=this.dadoSessao.precoIngresso
        objIngresso.qtdIngressos=parseInt(document.getElementById('qtdIngresso').value)
        objIngresso.extras='qtd de produtos comprada'
        objIngresso.cadeiras='cadeira selecionada'
        objIngresso.codigoIngresso=this.gerarCodigoIngresso()
        // objIngresso.valorFinal=(this.dadoSessao.precoIngresso*parseInt(document.getElementById('qtdIngresso').value)).toFixed(2)
        objIngresso.valorFinal='soma do preço dos ingressos mais os extras'

        return objIngresso
    }

    gerarCodigoIngresso(){
         let codigo=Math.random().toString(36).substr(2)
         return codigo
    }

    adicionarProdutos(){

    }
     
}
var ingresso=new Ingresso