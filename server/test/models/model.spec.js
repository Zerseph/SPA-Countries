const { Country, conn } = require('../../src/db.js');

////////////////////COUNTRY MODEL//////////////////////

describe('Country model', () => {
  // comprobar conexion a la db
  beforeAll(async () => {
    await conn.authenticate();
  });

  // se describe las pruebas 
  describe('Validators', () => {
    // Antes de cada prueba, se sincroniza el modelo Country en la base de datos, forzando la eliminacion de tablas existentes
    beforeEach(async () => {
      await Country.sync({ force: true });
    });

    // PRUEBAS PARA EL CAMPO ID
    describe('id', () => {

      it('Debe arrojar un error si id es nulo', async () => {
        expect.assertions(1);
        try {
          // Intentando crear un país sin proporcionar id
          await Country.create({
            name: 'Argentina',
            imgFlag: 'https://flagcdn.com/w320/ar.png',
            continent: 'South America',
            capital: 'Buenos Aires',
            population: 45000000,
          });
        } catch (error) {
          expect(error.name).toBe('SequelizeValidationError');
        }
      });

      it('Debe arrojar un error si id no tiene exactamente 3 letras', async () => {
        expect.assertions(1);
        try {
          await Country.create({
            id: 'ARGG',
            name: 'Argentina',
            imgFlag: 'https://flagcdn.com/w320/ar.png',
            continent: 'South America',
            capital: 'Buenos Aires',
            population: 45000000,
          });
        } catch (error) {

          expect(error.name).toBe('SequelizeValidationError');
        }
      });

      it('debe funcionar cuando id es válido', async () => {
        const country = await Country.create({
          id: 'ARG',
          name: 'Argentina',
          imgFlag: 'https://flagcdn.com/w320/ar.png',
          continent: 'South America',
          capital: 'Buenos Aires',
          population: 45000000,
        });
        expect(country.id).toBe('ARG');
      });
    });



    // PRUEBAS PARA EL CAMPO NAME
    describe('name', () => {

      it('debe arrojar un error si name es nulo', async () => {
        expect.assertions(1);
        try {
          // se intenta crear un pais sin name
          await Country.create({
            id: 'ARG',
            imgFlag: 'https://flagcdn.com/w320/ar.png',
            continent: 'South America',
            capital: 'Buenos Aires',
            population: 45000000,
          });
        } catch (error) {
          expect(error.name).toBe('SequelizeValidationError');
        }
      });


      it('debe funcionar cuando name es válido', async () => {
        // se intenta crear un país con el name válido
        const country = await Country.create({
          id: 'ARG',
          name: 'Argentina',
          imgFlag: 'https://flagcdn.com/w320/ar.png',
          continent: 'South America',
          capital: 'Buenos Aires',
          population: 45000000,
        });
        expect(country.name).toBe('Argentina');
      });
    });

  });
});
