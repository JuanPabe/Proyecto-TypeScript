// sistema simple de tienda de ropa

enum Categoria {
  REMERA = "Remera",
  PANTALON = "Pantalon",
  CALZADO = "Calzado"
}

// clase abstracta
abstract class Producto {
  protected id:number
  protected nombre:string
  protected precio:number
  protected stock:number
  protected categoria:Categoria

  constructor(id:number,nombre:string,precio:number,stock:number,categoria:Categoria){
    this.id=id
    this.nombre=nombre
    this.precio=precio
    this.stock=stock
    this.categoria=categoria
  }

  abstract precioFinal():number

  mostrar(){
    console.log(this.nombre+" | $"+this.precio+" | stock:"+this.stock)
  }
}

// clase hija
class Ropa extends Producto{
  talle:string

  constructor(id:number,nombre:string,precio:number,stock:number,categoria:Categoria,talle:string){
    super(id,nombre,precio,stock,categoria)
    this.talle=talle
  }

  precioFinal():number{
    return this.precio
  }
}

// otra clase hija
class Calzado extends Producto{
  numero:number

  constructor(id:number,nombre:string,precio:number,stock:number,numero:number){
    super(id,nombre,precio,stock,Categoria.CALZADO)
    this.numero=numero
  }

  precioFinal():number{
    return this.precio
  }
}

// clase tienda
class Tienda{

  productos:Producto[]=[]

  agregar(p:Producto){
    this.productos.push(p)
  }

  // sobrecarga de metodo buscar
  buscar(id:number):Producto | undefined
  buscar(nombre:string):Producto | undefined

  buscar(valor:any):Producto | undefined{
    if(typeof valor==="number"){
      return this.productos.find(p=>p["id"]===valor)
    }
    else{
      return this.productos.find(p=>p["nombre"]===valor)
    }
  }

  mostrar(){
    this.productos.forEach(p=>p.mostrar())
  }

  ordenarPorPrecio(){
    this.productos.sort((a,b)=>a.precioFinal()-b.precioFinal())
  }

}

// programa principal

const tienda=new Tienda()

const p1=new Ropa(1,"Remera blanca",5000,10,Categoria.REMERA,"M")
const p2=new Ropa(2,"Pantalon jean",12000,5,Categoria.PANTALON,"L")
const p3=new Calzado(3,"Zapatillas",15000,8,40)

tienda.agregar(p1)
tienda.agregar(p2)
tienda.agregar(p3)

console.log("Productos:")
tienda.mostrar()

console.log("Ordenados por precio:")
tienda.ordenarPorPrecio()
tienda.mostrar()

console.log("Buscar producto:")
console.log(tienda.buscar(1))
