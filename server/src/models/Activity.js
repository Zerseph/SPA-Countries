const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Activity", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.ENUM("1", "2", "3", "4", "5"),
            allowNull: false,
            defaultValue: '1',
        },
        duration: {
            type: DataTypes.INTEGER,
        },
        season: {
            type: DataTypes.ENUM("Summer", "Autumn", "Winter", "Spring"),
            allowNull: false,
        },
    }, {
        timestamps: false
    }
    )
};