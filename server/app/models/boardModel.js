import sequelize, { DataTypes } from "sequelize";

export let boardSchema = (sequelize, DataTypes) => {
    const board = sequelize.define("board", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        backgroundImage: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        backgroundColor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    }, {
        timestamps: false,
    })

    return board;
}
