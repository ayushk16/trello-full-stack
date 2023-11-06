import sequelize, { DataTypes } from "sequelize";

export let checkItemSchema = (sequelize, DataTypes) => {
    const checkItem = sequelize.define("checkItem", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCheckList: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })

    return checkItem;
}
