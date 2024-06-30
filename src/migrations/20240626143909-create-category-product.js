"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("CategoryProducts", {
            categoryId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "Categories",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            productId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "Products",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("CategoryProducts");
    },
};
