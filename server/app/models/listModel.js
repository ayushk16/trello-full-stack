import sequelize, { DataTypes } from "sequelize";

export let listSchema = (sequelize, DataTypes) => {
    const list = sequelize.define("list", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idBoard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })

    return list;
}
