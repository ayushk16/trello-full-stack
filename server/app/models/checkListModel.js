import sequelize, { DataTypes } from "sequelize";

export let checkListSchema = (sequelize, DataTypes) => {
    const checkList = sequelize.define("checkList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCard: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idBoard: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })

    return checkList;
}
