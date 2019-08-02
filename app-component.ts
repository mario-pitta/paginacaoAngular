export class MinutaListComponent implements OnInit { 
  
  itens: any[];
  paginaAtual:number = 1;
  totalItens:number;
  tamanhoPagina:number= 10;
  paginas = [];
  totalPaginas:number = 1;
  
  max_links: number = 15;
  limitesLaterais: number; 
  
  constructor(
    private service : Service // EXEMPLO GENERICO, DEDUZ-SE QUE EXISTA UM SERVIÇO OU METODO DE BUSCA DE ITENS EM UM BANCO DE DADOS
  ){}

  ngOnInit(){
    this.limitesLaterais = 15; // FAZ O LIMITE INICIAL SER 15 PARA MOSTRAR ESSA QUANTIDADE NO CARREGAMENTO DA PAGINA, DEPOIS ESSE LIMITE VAI MUDAR
  }
  
  contarItens(){
    this.filtros = this.retornaFiltros(); //REGRAS DE FILTROS PARA CONSULTAR ITENS
    
    this.service.contarItens(filtros).subscribe( o => { //SERVIÇO DE BUSCA NO BANCO DE DADOS 
      this.totalItens = parseInt(o.count);
      this.totalPaginas = Math.ceil(this.totalItens/this.tamanhoPagina);
      this.paginas = Array.from({length:this.totalPaginas},(v,k)=>k+1); // DESSE ARRAY IRAM SER EXIBIDAS AS PAGINAS.
    }
    
    if(this.totalPaginas < this.max_links){
      this.limitesLaterais = this.max_links;
    }
  }
  
  retornaFiltros(){
    this.filtros = { 
      filtro1 = 'a';
      filtro2 = 'b';  
      filtro3 = 'c'; 
      filtro4 = 'd';
    }
    return this.filtros;
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
    this.service.getItens(this.filtros).subscribe(item => {
      this.itens.push(item);
    }
    

}
