import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertController, IonicModule, NavController } from '@ionic/angular';
import { CarrinhoService, Compras } from 'src/app/servicos/carrinho.service';
import { ActivatedRoute } from '@angular/router';
import { Produto, ProdutosService } from 'src/app/servicos/produtos.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CarrinhoPage implements OnInit {

  listacompras: Compras[] = [];
  produtos: Produto[] = [];

  
  ids: any;
  constructor(private Pservice: ProdutosService ,private service:CarrinhoService, private nav: NavController,  private rota: ActivatedRoute, private alerta: AlertController) { }

  ngOnInit() {
    
    this.ids = this.rota.snapshot.params['idcompra'];

    this.service.listar().subscribe(res => {
      this.listacompras = res;
      console.log(this.listacompras);
    });

    let vetor = this.ids.split("-");
    console.log(vetor.length);

    let nome = "";
    if(this.ids !=undefined){
     for(let i=0; i < vetor.length; i++){
      console.log(vetor[i]);
      if (vetor[i] != ""){
        this.Pservice.buscar(vetor[i]).subscribe(res => {
          this.produtos.push(res);
          //console.log("Produto: " + res.nome);
          
        });
        
        
      }
     }
     //console.log(this.produtos[0].nome);
      //this.Pservice.buscar(this.ids);//.subscribe (res =>{
        //this.listacompras = res;
        //console.log(res);
      //})
    }
  


//    this.service.listar().subscribe(res => {
//      this.listacompras = res;
//      console.log(this.listacompras);
//    });
    
    

  }

  final(){
    this.f();
  }

  async f(){
    console.log("Finalizada");
    const mensagem = await this.alerta.create({
      header: "Compra finanalizada!!",
      message: "Agora é só aguardar sua encomenda.",
      buttons:[
        {text: "Ok",
         handler: res => {

          this.nav.navigateForward("home");
          
         } 
        }
      ]
    });
    console.log("FINALIZADA");
    await mensagem.present();
  }

  excluir(){
    
  }

  voltar(){
    this.nav.navigateForward("home");
  }
  
}
