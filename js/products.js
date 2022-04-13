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
    let listaProductosHtml = '';
    for  ( producto of productos ) {
        let productoHtml = '<div class="product_card" id="PRODUCT_ID">\n'+
                           '<img src="PRODUCT_IMAGE" alt="no_image">\n'+
                           '<h2>PRODUCT_TITLE</h2>\n'+
                           '<p>PRODUCT_DESCRIPTION</p>\n'+
                           '<span><b>Precio:</b> $PRODUCT_PRICE-</span>\n'+
                           '<button onClick="agregarItem(this.parentNode.id)">Agregar</button><button onClick="eliminarItem(this.parentNode.id)">Eliminar</button>\n'+
                           '</div>';
        productoHtml = productoHtml
            .replace('PRODUCT_ID', producto.id)
            .replace('PRODUCT_ID', producto.id)
            .replace('PRODUCT_IMAGE', producto.imagen)
            .replace('PRODUCT_TITLE', producto.titulo)
            .replace('PRODUCT_DESCRIPTION', producto.descripcion)
            .replace('PRODUCT_PRICE', producto.precio);
        listaProductosHtml = listaProductosHtml + productoHtml;
    }
    return listaProductosHtml;
}

// Agrega items en carrito...
function agregarItem(idProducto) {
    let producto = productos.find(prod => prod.id == idProducto);
    if (!existe(idProducto)) {
        carrito.push(producto);
        console.log('Producto agregado...');
    } else {
        console.log('Ya existe el producto... No agregado.');
    }
}

// Quita items del carrito
function eliminarItem(idProducto) {
    if (existe(idProducto)) {
        let indiceProducto = carrito.findIndex( prod => prod.id == idProducto );
        carrito.splice(indiceProducto,1);
        console.log('Producto eliminado...');
    } else {
        console.log('El producto no se encuentra en el carrito... Nothing to do here xD');
    }
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
    let total = 0;
    console.log('Producto - Precio');
    for (producto of carrito) {
        console.log(producto.titulo + ' - $' + producto.precio);
        total = total + Number(producto.precio);
    }
    console.log('Total : $' + total);
}

// Carrito de compras
let carrito = [];

// Obtiene el contenedor de los productos y luego asigna el html generado por la función listarProductos().
const contenedor = document.getElementById('products_container');
contenedor.innerHTML = listarProductos();