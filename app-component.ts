export class MinutaListComponent implements OnInit { 
  
  itens: any[];
  paginaAtual:number = 1;
  totalItens:number;
  tamanhoPagina:number= 10;
  paginas = [];
  totalPaginas:number = 1;
  
  max_links: number = 15;
  limitesLaterais: number; 
  
  constructor(){}

  ngOnInit(){
    this.limitesLaterais = 15; // FAZ O LIMITE INICIAL SER 15 PARA MOSTRAR ESSA QUANTIDADE NO CARREGAMENTO DA PAGINA, DEPOIS ESSE LIMITE VAI MUDAR
  }
  
  contarItens(){
    let filtros = this.retornaFiltros(); //REGRAS DE FILTROS PARA CONSULTAR ITENS
    
    this.getItens.contar(filtros).subscribe( o => { //SERVIÇO DE BUSCA NO BANCO DE DADOS 
      this.totalItens = parseInt(o.count);
      this.totalPaginas = Math.ceil(this.totalItens/this.tamanhoPagina);
      this.paginas = Array.from({length:this.totalPaginas},(v,k)=>k+1); // DESSE ARRAY IRAM SER EXIBIDAS AS PAGINAS.
    }
    
    if(this.totalPaginas < this.max_links){
      this.limitesLaterais = this.max_links;
    }
  }
  
  
  selecionaPagina(pagina: number){
    this.paginaAtual = pagina;
    if(this.paginaAtual < this.limitesLaterais){
      this.limitesLaterais = this.max_links - this.paginaAtual;
    }else{
      this.limitesLaterais = 7;
    }
    this.getItens();
  }
  
  getItens(){
    this.service.getItens().subscribe(item => {
      this.itens.push(item);
    }
    

}
