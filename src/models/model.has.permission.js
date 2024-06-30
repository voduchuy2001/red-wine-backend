"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    class ModelHasPermission extends Model {
        static associate(models) {}
    }
    ModelHasPermission.init(
        {
            modelId: DataTypes.BIGINT,
            modelType: DataTypes.STRING,
            permissionId: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "ModelHasPermission",
            timestamps: false,
        }
    );
    return ModelHasPermission;
};
