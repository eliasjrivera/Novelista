const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Book extends Model {}

// if i want the google price, i believe ill have to add it in this model to retrieve that info

Book.init(
    {
        // id might not be needed here
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        authors: [
            {
            type: DataTypes.STRING,
            },
        ],
        description: {
            type: DataTypes.STRING,
            required: true,
        },
        // saved book id from GoogleBooks
        bookId: {
            type: DataTypes.STRING,
            required: true,
        },
        image: {
            type: DataTypes.STRING,
        },
        link: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'book',
    }
);

module.exports = Book;
