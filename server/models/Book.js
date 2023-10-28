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
        // i have deleted the [] that goes around {type: DataTypes.STRING, allowNull: false,}; look at MERN example for how it was
        authors: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        // saved book id from GoogleBooks
        bookId: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        buy: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
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
