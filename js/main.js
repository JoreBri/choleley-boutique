const productos = [
    //Maternal
    {
        id: "maternal",
        titulo: "Mochila maternal",
        imagen: "img/bolsoMaternal.png",
        categoria:{
            nombre:"Maternidad",
            id:"maternal"
        },
        precio: 55000
    },
    {
        id: "maternal",
        titulo: "Cambiador",
        imagen: "img/cambiador.png",
        categoria:{
            nombre:"Maternidad",
            id:"maternal"
        },
        precio: 35000
    },
    {
        id: "maternal",
        titulo: "Porta libreta",
        imagen: "/img/portaLibreta.png",
        categoria:{
            nombre:"Maternidad",
            id:"maternal"
        },
        precio: 45000
    },
    //Materos
    {
        id: "materos",
        titulo: "Bolso matero cuero",
        imagen: "img/bolsoMatero.png",
        categoria:{
            nombre:"Materos",
            id:"matero"
        },
        precio: 35000

    },
    {
        id: "materos",
        titulo: "Bolso matero cordura",
        imagen: "img/bolsoMatero2.png",
        categoria:{
            nombre:"Materos",
            id:"matero"
        },
        precio: 30000
    },
    //Combos promesa
    {
        id: "promesa",
        titulo: "Combo promesa",
        imagen: "img/comboPromesa.png",
        categoria:{
            nombre:"Promesas",
            id:"promesa"
        },
        precio: 14000
    },
    {
        id: "promesa",
        titulo: "Bandas promesa",
        imagen: "img/promesa2.png",
        categoria:{
            nombre:"Promesas",
            id:"promesa"
        },
        precio: 9000
    },
    //Tazas
    {
        id: "taza",
        titulo: "Tazas Ceramicas",
        imagen: "img/tazas.png",
        categoria:{
            nombre:"Tazas",
            id:"taza"
        },
        precio: 15000
    },
    {
        id: "tazas",
        titulo: "Tazas Plasticas",
        imagen: "img/setJardin.png",
        categoria:{
            nombre:"Tazas",
            id:"taza"
        },
        precio: 10000
    },
    //Gorras
    {
        id: "gorras",
        titulo: "Gorras",
        imagen: "img/gorra.png",
        categoria:{
            nombre:"Gorras",
            id:"gorra"
        },
        precio: 25000
    },
    //Remeras
    {
        id: "remera",
        titulo: "Remeras",
        imagen: "img/remera.png",
        categoria:{
            nombre:"Remeras",
            id:"remera"
        },
        precio: 40000
    }
];

const contenedorProductos= document.querySelector("#contenedorProductos");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const tituloPrincipal= document.querySelector("#tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".productoBtn");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos){

    contenedorProductos.innerHTML= "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div")
        div.classList.add("producto");
        div.innerHTML= `
            <img class="productoImg" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="productoDetalles">
                    <h3 class="productoTitulo">${producto.titulo}</h3>
                    <p class="productoPrecio">$${producto.precio}</p>
                    <button class="productoBtn" id=${producto.id}>Agregar al carrito</button>
                </div>
        `;
        contenedorProductos.append(div);
    }) 
    actualizarbotonesAgregar();
    console.log(botonesAgregar);

}
cargarProductos(productos);

botonesCategoria.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategoria.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if(e.currentTarget.id != "todos"){
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText= productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else{
            tituloPrincipal.innerText="Todos los productos";
            cargarProductos(productos);
        }
    })
});

function actualizarbotonesAgregar(){
    botonesAgregar =document.querySelectorAll(".productoBtn");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })

}
const productosEnCarrito =[];

function agregarAlCarrito(e){

    const idBoton= e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
    productosEnCarrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);

    }
    actualizarNumerito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc,producto)=> acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;

}