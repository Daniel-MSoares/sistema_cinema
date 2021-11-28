class Filme{
    constructor(){
        this.id=1
        this.filmes=[
            {
                classificacao: "16",
                dataSessao: "11/12/2021",
                generoFilme: "ação",
                horarioSessao: "15:00",
                id: 1,
                imgFilme: "img/eternos.jpg",
                nomeFilme: "Eternos",
                precoIngresso: "30.99",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            },
            {
                classificacao: "L",
                dataSessao: "28/11/2021",
                generoFilme: "infantil,aventura",
                horarioSessao: "8:00",
                id: 2,
                imgFilme: "img/encanto.jpg",
                nomeFilme: "Encanto",
                precoIngresso: "10.00",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            },
            {
                classificacao: "16",
                dataSessao: "11/12/2021",
                generoFilme: "ação,fantasia",
                horarioSessao: "15:00",
                id: 1,
                imgFilme: "img/duna.jpg",
                nomeFilme: "Duna",
                precoIngresso: "20.00",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            },
            {
                classificacao: "16",
                dataSessao: "11/12/2021",
                generoFilme: "ação",
                horarioSessao: "15:00",
                id: 1,
                imgFilme: "img/venon.jpg",
                nomeFilme: "Venon:tempo de carneficina",
                precoIngresso: "45.00",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            },
            {
                classificacao: "14",
                dataSessao: "11/12/2021",
                generoFilme: "ação,fantasia",
                horarioSessao: "15:00",
                id: 1,
                imgFilme: "img/senhordosaneis.jpg",
                nomeFilme: "O Senhor dos aneis:a sociedade do anel versão estendida",
                precoIngresso: "20.00",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            },
            {
                classificacao: "16",
                dataSessao: "12/10/2021",
                generoFilme: "Drama",
                horarioSessao: "15:00",
                id: 1,
                imgFilme: "img/marighella.jpg",
                nomeFilme: "Marighella",
                precoIngresso: "20.00",
                sinopse: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos exercitationem consequatur placeat dolor consequuntur! Quos, et quae facere aperiam facilis mollitia, exercitationem nostrum blanditiis officiis architecto natus illo suscipit hic?",
            }

        ]
    }
    adicionar(){
      let filme=this.lerDados();
      this.filmes.push(filme);
      this.id++;
      this.limparCampos()
      
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
      objFilme.imgFilme=document.getElementById('imgFilme').value;
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
}
var filme= new Filme
var listaFilmes=filme.filmes
function listarfilmes(){
 let catalogo=document.getElementById('catalogo')
    listaFilmes.forEach(filme => {
        let dadoFilme=JSON.stringify(filme)
        let link=document.createElement('a');
        link.href='pages/ingresso.html?obj='+dadoFilme;
        link.innerHTML='<img class="cartaz" src="'+filme.imgFilme+'">'
        catalogo.appendChild(link)
    });
    
}

function dadosDoFilme(){
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
    
    imgFilme.src="../"+dadoFilme.imgFilme
    nomeFilme.innerText=dadoFilme.nomeFilme;
    sinopse.innerText=dadoFilme.sinopse;
    classificacao.innerText=dadoFilme.classificacao;
    genero.innerText=dadoFilme.generoFilme;
    preco.innerText=dadoFilme.precoIngresso;
    horario.innerText=dadoFilme.horarioSessao;
    data.innerText=dadoFilme.dataSessao;


}