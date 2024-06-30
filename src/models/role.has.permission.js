"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
    class RoleHasPermission extends Model {
        static associate(models) {}
    }
    RoleHasPermission.init(
        {
            permissionId: DataTypes.BIGINT,
            roleId: DataTypes.BIGINT,
        },
        {
            sequelize,
            modelName: "RoleHasPermission",
            timestamps: false,
        }
    );
    return RoleHasPermission;
};
