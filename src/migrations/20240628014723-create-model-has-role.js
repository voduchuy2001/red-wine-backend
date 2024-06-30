"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("ModelHasRoles", {
            roleId: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "Roles",
                    key: "id",
                },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
            },
            modelType: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            modelId: {
                type: Sequelize.BIGINT,
                allowNull: false,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("ModelHasRoles");
    },
};
