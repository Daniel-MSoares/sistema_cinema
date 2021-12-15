# sistema_cinema
Projeto final Result-UP,dos alunos Daniel Muniz e Letícia Barros,sistema de venda de ingressos para um cinema<br>
 *sistema para o cinema fictício 'L&DCINE!',pagina inicial apresenta um catálogo com os filmes em cartaz do cinema,sistema de login e criação de usuario,pagina de administrador com CRUD para os filmes exibidos no catálogo,sistema de compra de ingresso
 recursos usados:JavaScript,HTML,CSS,Bootstrap,LocalStorage(simulando banco de dados no frontend), LIBs QRCode.js e instascan.js(criador e scanner de QrCode)
 

## Administrador
para acessar o painel de administrador informe o usuario '*admin@admin.com*' e a senha '*admin123*',e o painel de administrador será apresentado,
por ele será possível adicionar,atualizar e excluir os filmes da página inicial,adicionar e remover sessões para cada filme, e por onde será possível validar os ingressos dos clientes

obs:
*para adicionar imagens,faça download da pasta img deste diretório,e no imput de seleção de imagem selecione apenas imagens deste diretório,pois o sistema não faz upload de imagem,nem possui um backend,
o imput é usado apenas para descobrir o nome da imagem pelo atributo files[0].name do input type file,selecionar imagens que não estão nesse diretório não gerará um erro,apenas informará que o arquivo não
foi encontrado pelo atributo src da tag img
<br>*scanner de QRcode funciona apenas em servidores http e https(lib instascan.Js),se executar direto o arquivo index.html essa lib pode não funcionar corretamente


## cliente
crie uma conta no sitema(os dados não precisam ser reais,ok),pela pagina de login,clicando em 'ainda não tenho conta',acesse o sistema fazebdo login com os dados de sua conta,
e voce terá acesso à uma pagina onde será apresentado seus ingressos comprados,assim que você comprar um,clicando em algum filme da home(depois que o administrador adicionar o filme e as sessões)
escolha a sessão,monte seu pedido,finalize a compra,volte na pagina de usuário, everá o seu ingresso,clique em ver código,e será apresentado um QRcode,que devera ser apresentado na entrada do 
cinema,e será escaneado pelo funcionario,para lhe entragar seu pedido
