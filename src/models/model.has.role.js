"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    class ModelHasRole extends Model {
        static associate(models) {}
    }
    ModelHasRole.init(
        {
            modelId: DataTypes.BIGINT,
            modelType: DataTypes.STRING,
            roleId: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "ModelHasRole",
            timestamps: false,
        }
    );
    return ModelHasRole;
};
