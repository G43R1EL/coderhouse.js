// lista de productos >> Sera reemplazada por lista obtenida desde base de datos firebase por medio de API REST.
const productos = [
    {
        id: '100001',
        imagen: '../assets/no-image.png',
        titulo: 'Primer producto',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 1500
    },
    {
        id: '100002',
        imagen: '../assets/no-image.png',
        titulo: 'Segundo producto',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 2400
    },
    {
        id: '100003',
        imagen: '../assets/no-image.png',
        titulo: 'Tercer producto',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 1800
    },
    {
        id: '100004',
        imagen: '../assets/no-image.png',
        titulo: 'Cuarto producto',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, rerum!',
        precio: 1200
    }

];

// Toma la variable productos y genera con ella el html necesario para armar tarjetas de producto.
function listarProductos() {
    let listaProductosHtml = '';
    for  ( producto of productos ) {
        let productoHtml = '<div class="product_card" id="pPRODUCT_ID">\n'+
                           '<img src="PRODUCT_IMAGE" alt="no_image">\n'+
                           '<h2>PRODUCT_TITLE</h2>\n'+
                           '<p>PRODUCT_DESCRIPTION</p>\n'+
                           '<span><b>Precio:</b> $PRODUCT_PRICE-</span>\n'+
                           '<button onClick="agregarItem(this.id)" id="PRODUCT_ID">Agregar</button>\n'+
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

// Agrega items en presupuesto... A desarrollar...
function agregarItem(idProducto) {
    let producto = productos.find(prod => prod.id == idProducto);
    if (producto.precio > 0) {
        presupuesto = presupuesto + producto.precio;
        notificacion(idProducto);
    } else {
        console.log('No se puede agregar item sin valor');
    }
}

// Notifica en consola el producto agregado y el monto del presupuesto... Luego se implementara notificación en el html.
function notificacion(idProducto) {
    let producto = productos.find(prod => prod.id == idProducto);
    console.log('Se agrego el producto: ' + producto.titulo + ' 💸\nEl presupuesto asciende a: $' + presupuesto);
}

// Almacena el monto del presupuesto
let presupuesto = 0;

// Obtiene el contenedor de los productos y luego asigna el html generado por la función listarProductos().
const contenedor = document.getElementById('products_container');
contenedor.innerHTML = listarProductos();