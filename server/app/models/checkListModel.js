import sequelize, { DataTypes } from "sequelize";

export let checkListSchema = (sequelize, DataTypes) => {
    const checkList = sequelize.define("checkList", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idCard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idBoard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })

    return checkList;
}
