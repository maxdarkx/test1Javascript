'use strict';

class electrodomestico
{
    constructor(consumo, procedencia)
    {
        this._consumo = consumo;
        this._procedencia = procedencia;
        this._precio = this.calcularPrecio();
    }

    calcularPrecio()
    {
        let precioTemp = 0;

        if(this._consumo === "A")
        {
            precioTemp += 450000;
        }
        else if (this._consumo === "B")
        {
            precioTemp += 350000;
        }
        else if (this._consumo === "C")
        {
            precioTemp += 250000;
        }

        //es un producto importado?
        if (this._procedencia === 1)
        {
            precioTemp += 350000;
        }
        else
        {
            precioTemp += 250000;
        }
        return precioTemp;
    }

    get consumo() {
        return this._consumo;
    }

    get procedencia() {
        return this._procedencia;
    }

    get precio() {
        return this._precio;
    }


    set consumo(value) {
        this._consumo = value;
    }

    set procedencia(value) {
        this._procedencia = value;
    }

    ttoString()
    {
        let procedenciaTemp;
        let text;
        text = "Electrodomestico con un consumo tipo " + this._consumo;
        text = text + " de procedencia ";
        if(this._procedencia === 1)
        {
            procedenciaTemp = "Importado";
        }
        else
        {
            procedenciaTemp = "Nacional";
        }

        text = text + procedenciaTemp + " y con un precio de " + this._precio;
        return text;
    }
}

class televisor extends electrodomestico
{
    constructor (consumo, procedencia, tamano, TDT)
    {
        super(consumo, procedencia);
        this._tamano = tamano;
        this._TDT = TDT;
        this._precio = this.calcularPrecio();
    }

    calcularPrecio()
    {
        let precioTemp = super.calcularPrecio();
        if(this._tamano > 40)
        {
            precioTemp = precioTemp*1.3;
        }

        if (this._TDT)
        {
            precioTemp += 250000;
        }
        return precioTemp;
    }


    get tamano() {
        return this._tamano;
    }

    get TDT() {
        return this._TDT;
    }

    get precio() {
        return this._precio;
    }

    ttoString()
    {
        let text;
        text = "Televisor con pantalla de " + this._tamano;
        text = text + " pulgadas, con un consumo " + this._consumo;
        text = text + " de procedencia ";
        if(this._procedencia === 1)
        {
            text += "Importado";
        }
        else
        {
            text += "Nacional";
        }

        if(this._TDT)
        {
            text += " con modulo TDT incluido";
        }
        text += " y con un precio de " + this._precio;

        return text;
    }
}


class nevera extends electrodomestico
{
    constructor(consumo, procedencia, capacidad)
    {
        super(consumo, procedencia);
        this._capacidad = capacidad;
        this._precio = this.calcularPrecio();
    }
    get capacidad() {
        return this._capacidad;
    }

    get precio() {
        return this._precio;
    }

    calcularPrecio()
    {
        let precioTemp = super.calcularPrecio();
        let capacidadTemp = this._capacidad;
        while(capacidadTemp > 120)
        {
            precioTemp = precioTemp*1.05;
            capacidadTemp -= 10;
        }
        return precioTemp;
    }


    ttoString()
    {
        let procedenciaTemp;
        let text;
        text = "Nevera con Capacidad " + this._capacidad + " libras";
        text = text + " con un consumo energetico tipo " + this._consumo;
        text = text + " de procedencia ";
        if(this._procedencia===1)
        {
            procedenciaTemp = "Importado";
        }
        else
        {
            procedenciaTemp = "Nacional";
        }

        text = text + procedenciaTemp + " y con un precio de " + this._precio;
        return text;
    }
}

class inventario
{
    constructor()
    {
        this._electrodomesticos = [];
        this._neveras = [];
        this._televisores = [];
        this.totalElectrodomesticos = 0;
        this.totalTelevisores = 0;
        this.totalNeveras = 0;
        this.granTotal = 0;
    }

    addElectrodomestico(item)
    {
        this._electrodomesticos.push(item);
    }
    addNevera(item)
    {
        this._neveras.push(item);
    }
    addTelevisor(item)
    {
        this._televisores.push(item);
    }

    addLoteElectrodomestico(item, n)
    {
        for(let i=0; i<n; i++)
        {
            this.addElectrodomestico(item);
        }
    }

    addLoteTelevisores(item, n)
    {
        for(let i=0; i<n; i++)
        {
            this.addTelevisor(item);
        }
    }
    addLoteNeveras(item, n)
    {
        for(let i=0; i<n; i++)
        {
            this.addNevera(item);
        }
    }

    get electrodomesticos() {
        return this._electrodomesticos;
    }

    get neveras() {
        return this._neveras;
    }

    get televisores() {
        return this._televisores;
    }

    calculaGranTotal()
    {
        let sumaElectrodomesticos = 0;
        let sumaTelevisores = 0;
        let sumaNeveras = 0;
        this.ordenaInventario();

        this.electrodomesticos.forEach(function (item)
        {
           sumaElectrodomesticos += item._precio;
        });
        this.televisores.forEach(function (item)
        {
            sumaTelevisores += item._precio;
        });
        this.neveras.forEach(function (item)
        {
            sumaNeveras += item._precio;
        });

        this.totalElectrodomesticos = sumaElectrodomesticos;
        this.totalTelevisores = sumaTelevisores;
        this.totalNeveras = sumaNeveras;
        this.granTotal = sumaElectrodomesticos + sumaNeveras + sumaTelevisores;
        console.log("\n\n");
        console.log("El valor del inventario de electrodomesticos es: " + sumaElectrodomesticos);
        console.log("El valor del inventario de televisores es: " + sumaTelevisores);
        console.log("El valor del inventario de neveras es: " + sumaNeveras);
        console.log("El Gran Total del inventarioes: " + this.granTotal);
    }

    ordenaInventario()
    {
       this.electrodomesticos.sort(function(a, b)
       {
           if(a.consumo > b.consumo)
           {
               return 1;
           }
           if(a.consumo < b.consumo)
           {
               return -1;
           }
           return 0;
       });
        this.televisores.sort(function(a, b)
        {
            if(a.consumo > b.consumo)
            {
                return 1;
            }
            if(a.consumo < b.consumo)
            {
                return -1;
            }
            return 0;
        });

        this.neveras.sort(function(a, b)
        {
            if(a.consumo > b.consumo)
            {
                return 1;
            }
            if(a.consumo < b.consumo)
            {
                return -1;
            }
            return 0;
        });
    }
}

class facturacion
{
    constructor()
    {
        this._zona1= new inventario();
    }

    get zona1() {
        return this._zona1;
    }

    set zona1(value) {
        this._zona1 = value;
    }

    venta(item, cantidad)
    {
        if(item instanceof electrodomestico)
        {

        }
        else if(item instanceof electrodomestico)
        {

        }
        else if(item instanceof electrodomestico)
        {

        }
    }
}


//importado = 1, nacional = 0

//punto 2: Ingreso del inventario
let edificio1 = new facturacion();

edificio1.zona1.addLoteElectrodomestico(new electrodomestico('B',0),5);
edificio1.zona1.addLoteNeveras(new nevera('A',0,150),10);
edificio1.zona1.addLoteTelevisores(new televisor('C',1, 40,0),7);
edificio1.zona1.addLoteTelevisores(new televisor('B',1, 50, 0),13);
edificio1.zona1.addLoteTelevisores(new televisor('A',0, 45, 1),3);
edificio1.zona1.addLoteElectrodomestico(new electrodomestico('A',1),8);
edificio1.zona1.addLoteNeveras(new nevera('C',1,180),10);

//mostrando en pantalla el inventario
console.log("Inventario hasta ahora:");
edificio1.zona1.electrodomesticos.forEach(item=>console.log(item.ttoString()));
edificio1.zona1.televisores.forEach(item=>console.log(item.ttoString()));
edificio1.zona1.neveras.forEach(item=>console.log(item.ttoString()));

edificio1.zona1.calculaGranTotal()

//calculo de factura




