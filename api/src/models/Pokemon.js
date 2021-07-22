const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id:{
      type:DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey:true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    special_defense:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    special_attack:{
      type: DataTypes.INTEGER,
      allowNull: true
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true,
      get(value) {
        const img = this.getDataValue(value);
        return img ? img : "https://img.icons8.com/color/50/000000/egg-pokemon.png";
      }
    }
  });

  sequelize.define('tipo', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  })

};
