import db from "@models";
import BaseRepository from "@repositories/base.repository";

export default class ProductRepository extends BaseRepository {
    constructor() {
        super(db.Product);
    }

    async getProducts(options = null) {
        const { page, paginate, search, categoryIds } = options;
        const whereClause = search ? { name: { [db.Sequelize.Op.like]: `%${search}%` } } : {};
        const includeQuery = categoryIds ? [{ model: db.Category, as: "categories", where: { id: categoryIds } }] : [];
        const modifiedOptions = {
            where: { ...whereClause },
            page,
            paginate,
            include: includeQuery,
        };

        return await this.paginate(modifiedOptions);
    }

    async createProduct(options) {
        return this.create(options);
    }

    async setCategoriesToProduct(product, categories) {
        return await product.setCategories(categories);
    }

    async updateProduct(id, data) {
        const product = await this.findById(id);
        return await product.update(data);
    }
}
