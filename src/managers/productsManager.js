import {productsModel} from "../db/models/products.model.js"

class ProductsManager {
    async findAggregation (){
        /*
        const result = await productsModel.aggregate([
            {$match :{
                $and: [{stock: {$gt: 2}}, {stock:{$lt:8}}],
                },
            },
            {$sort: { price: -1}},
        ]);
        */
        const {limit = 10, page = 1, ...filter} = obj
        const result = await productsModel.paginate(
            filter, {limit ,page}
        );
        const info = {
            count: result.totalDocs,
            pages: result.totalPages,
            next: result.hasNextPage ? `http://localhost:8080/api/products?page=${result.nextPage}` : null,
            preview: result.hasPrevPage ? `http://localhost:8080/api/products?page=${result.prevPage}` : null,
        };

        return result;
    }

    async findAll(){
        const result = await productsModel.find().lean();
        return result;
    }
    async findById(id){
        const result = await productsModel.findById(id);
        return result;
    }
    async createOne(obj){
        const result = await productsModel.create(obj);
        return result;
    }
    async updateOne(id, obj){
        const result = await productsModel.updateOne({_id: id}, obj);
        return result;
    }
    async deleteOne(id){
        const result = await productsModel.deleteOne({_id: id});
        return result;
    }
}

export const productsManager = new ProductsManager();


/*

Código anterior de FileSystem (ProductManager.js)

    import { existsSync, promises } from "fs";
    const path = "ProductsFile.json";

    class ProductsManager {
    async getProducts(queryObj = {}) {
        const { limit } = queryObj;

        try {
        if (existsSync(path)) {
            const productsFile = await promises.readFile(path, "utf-8");
            console.log("productsFile", productsFile);
            const productsData = JSON.parse(productsFile);
            return limit ? productsData.slice(0, +limit) : productsData;
        } else {
            console.log("no existe el archivo");
            return [];
        }
        } catch (error) {
        console.log("error", error);
        return error;
        }
    }

    async createProduct(product) {
        try {
        const products = await this.getProducts({});
        let id;
        if (!products.length) {
            id = 1;
        } else {
            id = products[products.length - 1].id + 1;
        }
        const newProduct = { id, ...product, status: true };
        products.push(newProduct);
        await promises.writeFile(path, JSON.stringify(products));
        return newProduct;
        } catch (error) {
        return error;
        }
    }

    async getProductById(id) {
        try {
        const products = await this.getProducts();
        console.log("products", products);
        const product = products.find((u) => u.id === id);
        console.log("product", product);
        return product;
        } catch (error) {
        console.log("error catch");
        throw new Error(error.message);
        }
    }

    async deleteProduct(id) {
        try {
        const products = await this.getProducts({});
        const product = products.find((u) => u.id === id);
        if (product) {
            const newArrayProducts = products.filter((u) => u.id !== id);
            await promises.writeFile(path, JSON.stringify(newArrayProducts));
        }
        return product;
        } catch (error) {
        return error;
        }
    }

    async updateProduct(id, obj) {
        try {
        const products = await this.getProducts({});
        const index = products.findIndex((u) => u.id === id);
        if (index === -1) {
            return null;
        }
        const updateProduct = { ...products[index], ...obj };
        products.splice(index, 1, updateProduct);
        await promises.writeFile(path, JSON.stringify(products));
        return updateProduct;
        } catch (error) {
        return error;
        }
    }
    }

    export const productsManager = new ProductsManager();
*/

/*

Código anterior de FileSystem (ProductManager.js)

    import { existsSync, promises } from "fs";
    const path = "ProductsFile.json";

    class ProductsManager {
    async getProducts(queryObj = {}) {
        const { limit } = queryObj;

        try {
        if (existsSync(path)) {
            const productsFile = await promises.readFile(path, "utf-8");
            console.log("productsFile", productsFile);
            const productsData = JSON.parse(productsFile);
            return limit ? productsData.slice(0, +limit) : productsData;
        } else {
            console.log("no existe el archivo");
            return [];
        }
        } catch (error) {
        console.log("error", error);
        return error;
        }
    }

    async createProduct(product) {
        try {
        const products = await this.getProducts({});
        let id;
        if (!products.length) {
            id = 1;
        } else {
            id = products[products.length - 1].id + 1;
        }
        const newProduct = { id, ...product, status: true };
        products.push(newProduct);
        await promises.writeFile(path, JSON.stringify(products));
        return newProduct;
        } catch (error) {
        return error;
        }
    }

    async getProductById(id) {
        try {
        const products = await this.getProducts();
        console.log("products", products);
        const product = products.find((u) => u.id === id);
        console.log("product", product);
        return product;
        } catch (error) {
        console.log("error catch");
        throw new Error(error.message);
        }
    }

    async deleteProduct(id) {
        try {
        const products = await this.getProducts({});
        const product = products.find((u) => u.id === id);
        if (product) {
            const newArrayProducts = products.filter((u) => u.id !== id);
            await promises.writeFile(path, JSON.stringify(newArrayProducts));
        }
        return product;
        } catch (error) {
        return error;
        }
    }

    async updateProduct(id, obj) {
        try {
        const products = await this.getProducts({});
        const index = products.findIndex((u) => u.id === id);
        if (index === -1) {
            return null;
        }
        const updateProduct = { ...products[index], ...obj };
        products.splice(index, 1, updateProduct);
        await promises.writeFile(path, JSON.stringify(products));
        return updateProduct;
        } catch (error) {
        return error;
        }
    }
    }

    export const productsManager = new ProductsManager();
*/