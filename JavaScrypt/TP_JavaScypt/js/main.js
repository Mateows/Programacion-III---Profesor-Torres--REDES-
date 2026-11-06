function cargarCategorias(){
    const contenedorCategorias = document.getElementById("lista-categorias");
    contenedorCategorias.innerHTML = "";

    categorias.forEach(categoria => {
        const li = document.createElement("li");
        const a = document.createElement("a");

        a.href= "#";
        a.textContent = categoria;

        li.appendChild(a)

        contenedorCategorias.appendChild(li);
    });
}

function cargarProductos(){
    const contenedorProductos = document.getElementById("contenedor-producto")
    contenedorProductos.innerHTML = "<h2>Productos Destacados</h2>";

    productos.forEach(producto =>{
        const article = document.createElement("article");


        article.innerHTML= `
            <h3>${producto.nombre}</h3>
            <img src="${producto.imagen}" alt="${producto.nombre}" width=400 height=300>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio}</strong></p>
            <div class="botones-container">
                <button>Ver Detalles</button>
                <button class="btn-agregar" data-nombre="${producto.nombre}">Agregar al carrito</button>
            </div>
        `;

        contenedorProductos.appendChild(article)
    });



    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", (e) =>{
            const nombreProducto = e.target.getAttribute("data-nombre");
            alert(`Agregaste "${nombreProducto}" al carrito`);
        });
    });
}

    document.addEventListener("DOMContentLoaded", () =>{
        cargarCategorias();
        cargarProductos();
    });


