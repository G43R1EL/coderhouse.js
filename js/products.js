// lista de productos >> Sera reemplazada por lista obtenida desde base de datos firebase por medio de API REST.
const productos = [
    {
        id: '100001',
        imagen: '../assets/no-image.png',
        titulo: 'Microprocesador Intel i7 9700f',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 32000
    },
    {
        id: '100002',
        imagen: '../assets/no-image.png',
        titulo: 'Video ASUS RTX2060 6G',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 95000
    },
    {
        id: '100003',
        imagen: '../assets/no-image.png',
        titulo: 'Memoria Kingston HyperX 2666MHz 16GB KIT',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 14000
    },
    {
        id: '100004',
        imagen: '../assets/no-image.png',
        titulo: 'Motherboard Gigabyte H61M DS3H',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 12000
    }

];

// Toma la variable productos y genera con ella el html necesario para armar tarjetas de producto.
function listarProductos() {
    let listaProductosHtml = '<div class="popup__message"></div>\n'+
                             '<div class="popup__checkout"></div>\n';
    for  ( const producto of productos ) {
        let productoHtml = `<div class="product_card" id="${producto.id}">\n`+
                           `<img src="${producto.imagen}" alt="no_image">\n`+
                           `<h2>${producto.titulo}</h2>\n`+
                           `<p>${producto.descripcion}</p>\n`+
                           `<span><b>Precio:</b>$ ${producto.precio}-</span>\n`+
                           `<button onClick="agregarItem(this.parentNode.id)">Agregar</button><button onClick="eliminarItem(this.parentNode.id)">Eliminar</button>\n`+
                           `</div>\n`;
        listaProductosHtml = listaProductosHtml + productoHtml;
    }
    return listaProductosHtml;
}

// Agrega items en carrito...
function agregarItem(idProducto) {
    let producto = productos.find(prod => prod.id == idProducto);
    let cantidad = parseInt(prompt('Cuantos queres agregar?', 1));
    let item = document.querySelector('.popup__message');
    let message = '<p>lorem ipsum dolor sit amet</p>';
    if (cantidad >= 1) {
        if (!existe(idProducto)) {
            producto.cantidad = cantidad;
            producto.subtotal = producto.cantidad * producto.precio;
            carrito.push(producto);
            message = 'Producto/s agregado...';
        } else {
            let idx = carrito.findIndex(prod => prod.id == idProducto);
            carrito[idx].cantidad += cantidad;
            carrito[idx].subtotal = carrito[idx].cantidad * carrito[idx].precio;
            message = 'Ya existe el producto... Se suman mas. ' + carrito[idx].cantidad;
        }
    } else {
        message = 'Debe ingresar un valor numerico';
    }
    item.innerHTML = message;
    item.style.display = 'flex';
    setTimeout ( function () { item.style.display='none' }, 1000 );
}

// Quita items del carrito
function eliminarItem(idProducto) {
    let cantidad = parseInt(prompt('Cuantos queres quitar?', 1));
    let item = document.querySelector('.popup__message');
    let message = '<p>lorem ipsum dolor sit amet</p>';
    if (existe(idProducto) && cantidad > 0) {
        let indiceProducto = carrito.findIndex( prod => prod.id == idProducto );
        if (carrito[indiceProducto].cantidad > cantidad) {
            carrito[indiceProducto].cantidad -= cantidad;
            carrito[indiceProducto].subtotal = carrito[indiceProducto].cantidad * carrito[indiceProducto].precio;
            message = 'Se quitaron ' + cantidad + '... Quedan ' + carrito[indiceProducto].cantidad
        } else {
            carrito.splice(indiceProducto,1);
            message = 'Producto eliminado...';
        }
    } else {
        message = 'El producto no se encuentra en el carrito o no ingreso una cantidad numerica para quitar... Nothing to do here xD'
    }
    item.innerHTML = message;
    item.style.display = 'flex';
    setTimeout ( function () { item.style.display='none' }, 1000 );
}

// Verifica si un elemento ya existe en el carrito.
function existe(idProducto) {
    if (carrito.find(prod => prod.id == idProducto) === undefined) {
        return false;
    } else {
        return true;
    }
}

// Muestra lista de productos y total de la cuenta
function checkOut () {
    let item = document.querySelector('.popup__checkout');
    let message = '';
    let tabla = '<table>\n'+
                '<tr><th>Producto</th><th>Precio</th><th>Cantidad</th><th>Subtotal</th></tr>\n';
    let total = 0;
    console.log('Producto - Precio - Cantidad - Subtotal');
    for (producto of carrito) {
        elementoLista = '<li>' + producto.titulo + ' - $' + producto.precio + ' - ' + producto.cantidad + ' - ' + producto.subtotal + '</li>\n';
        tabla = tabla + `<tr><td>${producto.titulo}</td><td>${producto.precio}</td><td>${producto.cantidad}</td><td>${producto.subtotal}</td></tr>`;
        total = total + Number(producto.subtotal);
    }
    tabla = tabla + '</table>\n';
    tabla = tabla + '<p>' + 'Total : $' + total + '</p>\n';
    message = tabla + '\n<button id="close__button" onClick="cerrarPopup()">Cerrar</button>';
    item.innerHTML = message;
    item.style.display = 'flex';
}

// Oculta popup de CheckOut
const cerrarPopup = () => {
    let popup = document.querySelector('.popup__checkout');
    popup.style.display = 'none';
}

// Carrito de compras
let carrito = [];

// Obtiene el contenedor de los productos y luego asigna el html generado por la función listarProductos().
const contenedor = document.getElementById('products_container');
contenedor.innerHTML = listarProductos();