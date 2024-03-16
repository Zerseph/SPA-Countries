const server = require('../../src/server.js'); //rutas y las solicitudes HTTP 
const session = require('supertest');
const agent = session(server);

describe("Test de RUTAS", () => {


    describe('GET /countries/:idPais', () => {

        //id correcto
        it("Debe responder con status: 200", async () => {
            await agent.get('/countries/ARG').expect(200);
        });

        it('Debe responder con un objeto con las propiedades: id, name, imgFlag, continent, capital, subRegion, area, population, Activities', async () => {
            const { body } = await agent.get('/countries/ARG');
            expect(body).toHaveProperty(
                'id' &&
                'name' &&
                'imgFlag' &&
                'continent' &&
                'capital' &&
                'subRegion' &&
                'population' &&
                'Activities'
            );
        });

        //comparar propiedades obtenidas
        it('Debe devolver un objeto con propiedades específicas y valores correctos', async () => {
            const { body } = await agent.get('/countries/ARG');
            expect(body).toHaveProperty('id', 'ARG');
            expect(body).toHaveProperty('name', 'Argentina');
            expect(body).toHaveProperty('imgFlag', 'https://flagcdn.com/w320/ar.png');
            expect(body).toHaveProperty('continent', 'South America');
            expect(body).toHaveProperty('capital', 'Buenos Aires');
            expect(body).toHaveProperty('subRegion', 'South America');
            expect(body).toHaveProperty('area', 2780400);
            expect(body).toHaveProperty('population', 45376763);
        });

        //ERRORES
        //id incompleto
        it('Si el parámetro de ruta "idPais" no tiene exactamente 3 caracteres', async () => {
            await agent.get('/countries/AR').expect(400, 'Country code must be exactly 3 letters.');
        });

        //id no encontrado
        it('Si hay un error responde con estatus: 404', async () => {
            await agent.get('/countries/ZZZ').expect(404);
        });
    });



    describe('GET /countries/name/', () => {

        it('Debe devolver un array con dos objetos, cada uno con las propiedades id, name, imgFlag, continent, capital, subRegion, area y population', async () => {
            const { body } = await agent.get('/countries/name?name=africa');

            // debe ser array
            expect(Array.isArray(body)).toBe(true);

            // debe ser exactamente dos objetos en el array
            expect(body.length).toBe(2);

            // iteracion en cada pais para comprar las propiedades
            body.forEach(country => {
                expect(country).toHaveProperty('id');
                expect(country).toHaveProperty('name');
                expect(country).toHaveProperty('imgFlag');
                expect(country).toHaveProperty('continent');
                expect(country).toHaveProperty('capital');
                expect(country).toHaveProperty('subRegion');
                expect(country).toHaveProperty('area');
                expect(country).toHaveProperty('population');
            });
        });

        //ERRORES
        it('Devuelve un msj indicando que no encuentra el pais con ese nombre', async () => {
            await agent.get('/countries/name?name=nonexistent').expect(404, {
                "message": "No countries found with the provided name."
            });

        });

        it('Responde con un código de estado 400 si el nombre del país contiene caracteres no permitidos', async () => {
            await agent.get('/countries/name?name=invalid!@#').expect(404, {
                "message": "No countries found with the provided name."
            });

        });

        //
        it('Maneja el caso en el que el parámetro de consulta "name" no está presente', async () => {
            await agent.get('/countries/name').expect(400, { error: 'Query parameter "name" is required.' });
        });



    })

});