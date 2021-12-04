class Usuario{
    constructor(){
        this.lsUsuarios=JSON.parse(localStorage.getItem('usuarios'));
        this.lsUsuarioLogado=JSON.parse(localStorage.getItem('usuarioLogado'));
        if(this.lsUsuarios!==null){
         this.id=this.lsUsuarios.length > 0 ?(this.lsUsuarios[this.lsUsuarios.length-1].id)+1 : 1;
        }else{
            this.id=1
        }
        this.usuarios=this.lsUsuarios !==null ? this.lsUsuarios :[
             {id:0,
              nome:'administrador',
              permissao:'admin',
              email:'admin@admin.com',
              senha:'admin123'
             }
        ];
        this.usuarioLogado=this.lsUsuarioLogado !== null? this.lsUsuarioLogado : null
    }

    atualizaLocalStorage(){
        localStorage.setItem('usuarios',JSON.stringify(this.usuarios));
        localStorage.setItem('usuarioLogado',JSON.stringify(this.usuarioLogado));
    }
    criarUsuario(){
        let usuario=this.lerDados()
        if(this.validaCampo(usuario)){
            this.usuarios.push(usuario);
        }
       this.atualizaLocalStorage();
       mostraFormLogin()
       console.log(this.usuarios)
    }
    lerDados(){
        let objUsuario={}
        objUsuario.id=this.id,
        objUsuario.nome=document.getElementById('nomeUsuario').value;
        objUsuario.permissao='user';
        objUsuario.email=document.getElementById('emailUsuario').value;
        objUsuario.senha=document.getElementById('senhaUsuario').value;
        return objUsuario
    }
    validaCampo(usuario){
        let msg=''
        if(usuario.nome===''){
            msg+='-Informe o seu Nome- \n'
        }
        if(usuario.email===''){
            msg+='-Informe um email- \n'
        }
        if(usuario.senha===''){
            msg+='-Informe uma Senha- \n'
        } 
        if(document.getElementById('termos').checked===false){
            msg+='-Leia e aceite os termos de uso- \n'
        }

        if(msg!==''){
            alert(msg);
            return false;
        }

        return true;

    }
    login(){
        let email=document.getElementById('LGemailUsuario').value;
        let senha=document.getElementById('LGsenha').value;
        let msg=''
        let permissao=''
        this.usuarios.forEach(usuario => {
            if(usuario.email===email && usuario.senha===senha){
                this.usuarioLogado=usuario
                msg='acesso permitido'
                permissao=usuario.permissao
                this.atualizaLocalStorage();
            }else if(usuario.email===email && usuario.senha!==senha){
                msg='Senha incorreta'
            }
        });
        if(msg===''){
            alert('usuário não existe')
        }else if((msg==='Senha incorreta')){
            alert(msg)
        }else{
           if(permissao=='user'){
            window.location.href='usuario.html'
            }else if(permissao='admin'){
            window.location.href='admin.html'
           }
        }
    }
    logoff(){
        this.usuarioLogado=null
        this.atualizaLocalStorage();
        window.location.href='../index.html'
        
    }

    verificaPermissao(){
            this.validarAcesso()
            
            if(this.usuarioLogado === null){
                console.log('ninguem logado')
                let linkLogin=document.createElement('li')
                linkLogin.id='linkLogin'
                linkLogin.classList.add('nav-item')
                linkLogin.innerHTML='<a href="pages/login.html" class="mr-2 nav-link"><i class="far fa-user"> </i>LOGIN</a>'
                if(document.getElementById('nav')!==null){
                    document.getElementById('nav').appendChild(linkLogin);
                }
            }
            
           if(this.usuarioLogado  !== null){

            if(this.usuarioLogado.permissao==='admin'){
                console.log('olá administrador '+this.usuarioLogado.nome)
                let linkAdmin=document.createElement('li')
                linkAdmin.id='linkAdmin'
                linkAdmin.classList.add('nav-item')
                linkAdmin.innerHTML='<a href="pages/admin.html" class="mr-2 nav-link"><i class="far fa-user"> </i> ADMIN</a>'
                
                if(document.getElementById('nav')!==null){
                document.getElementById('nav').appendChild(linkAdmin);
                }           
            }

            if(this.usuarioLogado.permissao==='user'){
                 let linkUsuario=document.createElement('li')
                 linkUsuario.id='linkUsuario'
                 linkUsuario.classList.add('nav-item')
                 linkUsuario.innerHTML='<a href="pages/usuario.html" class="mr-2 nav-link"><i class="far fa-user"> </i>'+this.usuarioLogado.nome+'</a></li>'
                 if(document.getElementById('nav')!==null){
                 document.getElementById('nav').appendChild( linkUsuario);
                 }
                
                 console.log('olá usuário'+this.usuarioLogado.nome)
            }
        }
       
    }
    
    validarAcesso(){
    if(document.getElementById('acesso') !== null){
       if(this.usuarioLogado === null){
        window.location.href='login.html?acesso=negado'
       }else{
             let acesso=document.getElementById('acesso').innerText
             if(acesso !== this.usuarioLogado.permissao){
                window.location.href='login.html?acesso=negado'
             }
       }
     }
    }

    exibeDadosUsuario(){
       document.getElementById('nomeUsuario').innerText=this.usuarioLogado.nome;
       document.getElementById('email').innerText=this.usuarioLogado.email;
    };
    
}

var usuario=new Usuario;

