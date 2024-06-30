import BaseService from "@services/base.service";

export default class ProductService extends BaseService {
    constructor(productRepository, categoryRepository) {
        super();
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    async getProducts(options = null) {
        return await this.productRepository.getProducts(options);
    }

    async createProduct(productData, categoryIds) {
        productData.images = JSON.stringify(productData.images);
        const product = await this.productRepository.create(productData);

        const categories = await this.categoryRepository.findByIds(categoryIds);
        await product.addCategories(categories);

        return product;
    }

    async getProduct(data) {
        const { id } = data;
        return await this.productRepository.findById(id);
    }
}
