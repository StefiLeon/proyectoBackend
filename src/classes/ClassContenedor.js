import fs from 'fs';

export default class Contenedor {
    
    async save(producto) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', "utf-8")
            let productos = JSON.parse(data);
            let id = productos[productos.length-1].id+1;
            producto = Object.assign({id:id}, producto);
            productos.push(producto);
            console.log(producto.id);
            try {
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify(productos, null, 2));
                return {status:"success",message:"Producto registrado"}
            } catch(err) {
                return {status:"Error", message: "No se creo el producto."}
            }
        } catch {
            producto = Object.assign({id:1}, producto);
            try {
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify([dataProductos], null, 2))
                return {status: "success", message: "Producto creado con exito."}
            } catch(err) {
                console.log("No se pudo crear el producto.");
                return {status: "error", message: `No se pudo crear, ${err}`}
            }
        }
    }

    async getByID(id) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let producto = productos.find(i => i.id === id)
            if(producto) {
                console.log(producto);
                return {status: "success", producto: producto, message: "Producto encontrado"}
            } else {
                console.log("Producto no encontrado");
                return {status:"error", message:"Producto no encontrado"}
            }
        } catch(err) {
            console.log("No se puede leer el archivo");
            return {status: "error", message:"No se puede leer el archivo"}
        }
    }

    async getRandom() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let random = Math.floor(Math.random() * productos.length+1);
            let producto = productos.find(i => i.id === random)
            return {status: "success", producto: producto, message: "Producto random"}
        } catch(err) {
            console.log("No se puede leer el archivo");
            return {status: "error", message:"No hay producto random"}
        }
    }

    async getAll() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            if(productos) {
                return {status: "success", lista: productos}
            }
        } catch(err) {
            return {status:"error", message:`No se puede leer el archivo ${err}`}
        }
    }

    async deleteById(id) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            let newArray = productos.filter(i => i.id !== id)
            await fs.promises.writeFile('./files/productos.txt', JSON.stringify(newArray, null, 2));
        } catch(err) {
            console.log("No anda");
            return {status: "error", message: "No se puede leer el archivo para borrar el producto"}
        }
    }

    async deleteAll() {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let newArray = [];
            await fs.promises.writeFile('./files/productos.txt', newArray, null, 2)
        } catch(err) {
            console.log("No anda");
            return {status: "error", message:"No se pudieron borrar los elementos."}
        }
    }

    async updateById(id,body) {
        try {
            let data = await fs.promises.readFile('./files/productos.txt', 'utf-8');
            let productos = JSON.parse(data);
            if(!productos.some(producto => producto.id===id)) return {
                status:"Error", message:"No hay producto con ese ID."
            }
            let result = productos.map(producto => {
                if(producto.id === id){
                    body = Object.assign(body)
                    return body;
                } else {
                    return producto;
                }
            })
            try {
                await fs.promises.writeFile('./files/productos.txt', JSON.stringify(result, null, 2));
                return {status: "success", message:"Producto actualizado."}
            } catch(err) {
                return {status: `error ${err}`, message: "No se pudo actualizar"}
            }
        }
        catch(error){
            console.log(error);
            return {status:"Error", message:"Fallo al actualizar el producto"}
        }
    }
}