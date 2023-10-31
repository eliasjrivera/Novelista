const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            required: true,
            unique: true,
            validate: {
                is: [/.+@.+\..+/, 'Must use a valid email address'],
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false,
            validate: {
                len: [1],
            },
        },
    },
    {
        hooks: {
            beforeCreate: async (newReader) => {
                try {
                    newReader.password = await bcrypt.hash(newReader.password, 10);
                    return newReader;
                } catch (err) {
                    console.log(err);
                    return err;
                }
            },
            beforeUpdate: async (updatedReader) => {
                try {
                    updatedReader.password = await bcrypt.hash(updatedReader.password,10);
                    return updatedReader;
                } catch (err) {
                    console.log(err);
                    return err;
                };
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',    
    }
);

module.exports = User;
