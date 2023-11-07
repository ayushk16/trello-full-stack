import sequelize, { DataTypes } from "sequelize";

export let cardSchema = (sequelize, DataTypes) => {
    const card = sequelize.define("card", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idBoard: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        idList: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        timestamps: false,
    })

    return card;
}
