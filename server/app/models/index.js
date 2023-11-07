import { dbConfigurations as dbConfig } from "../config/dbConfig.js";
import Sequelize, { DataTypes } from "sequelize";

import { boardSchema } from "./boardModel.js";
import { listSchema } from './listModel.js';
import { cardSchema } from './cardModel.js';
import { checkListSchema } from './checkListModel.js';
import { checkItemSchema } from './checkItemModel.js';


const sequelize = new Sequelize(
    dbConfig.db,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
        }
    }
)

sequelize.authenticate()
    .then(() => {
        console.log('connected to database ...');
    })
    .catch(err => {
        console.log('error in connecting to database : ' + err);
    })

export const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.board = boardSchema(sequelize, DataTypes);
db.list = listSchema(sequelize, DataTypes);
db.card = cardSchema(sequelize, DataTypes);
db.checkList = checkListSchema(sequelize, DataTypes);
db.checkItem = checkItemSchema(sequelize, DataTypes);

db.board.hasMany(db.list, { foreignKey: 'idBoard', onDelete: 'cascade' });
db.list.belongsTo(db.board, { foreignKey: 'idBoard' });

db.board.hasMany(db.card, { foreignKey: 'idBoard', onDelete: 'cascade' });
db.card.belongsTo(db.board, { foreignKey: 'idBoard' });

db.board.hasMany(db.checkList, { foreignKey: 'idBoard', onDelete: 'cascade' });
db.checkList.belongsTo(db.board, { foreignKey: 'idBoard' });

db.list.hasMany(db.card, { foreignKey: 'idList', onDelete: 'cascade' });
db.card.belongsTo(db.list, { foreignKey: 'idList' });

db.card.hasMany(db.checkList, { foreignKey: 'idCard', onDelete: 'cascade' });
db.checkList.belongsTo(db.card, { foreignKey: 'idCard' });

db.checkList.hasMany(db.checkItem, { foreignKey: 'idCheckList', onDelete: 'cascade' });
db.checkItem.belongsTo(db.checkList, { foreignKey: 'idCheckList' });

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('synced to db ...');
    })
    .catch((err) => {
        console.log("failed to sync db : " + err);
    })