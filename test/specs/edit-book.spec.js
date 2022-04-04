// const expect = require('chai').expect;
// const axios = require('axios');
// const faker = require('faker').random;

// const baseUrl = 'http://localhost:8080';
// let createdAnimal;
// let updatedAnimal;
// let response;
// describe('Given a created animal', () => {
//     before(async () => {
//         const animal = {
//             name: `Mr ${faker.words(2)}`,
//             breed: "Bengalí",
//             gender: "Female",
//             isVaccinated: true,
//             vaccines: [
//                 "rabia",
//                 "leucemia",
//                 "parvovirus"
//             ]
//         };

//         createdAnimal = (await axios.post(`${baseUrl}/animals`, animal)).data;

//     });

//     describe('When the user wants to update the animal', () => {
//         before(async () => {
//             updatedAnimal = {
//                 name: `Mr ${faker.words(2)}`,
//                 breed: "Criollo",
//                 gender: "Male",
//                 isVaccinated: false,
//                 vaccines: [
//                     "rabia"
//                 ]
//             };

//             response = await axios.put(`${baseUrl}/animals/${createdAnimal.name}`, updatedAnimal)
//         });

//         it('Then should have an OK status code', () => {
//             expect(response.status).eql(200);
//         });

//         it('Then should return an animal but the name should not change', async () => {
//             expect(response.data.name).eql(createdAnimal.name);
//         });
//         it('Then should return an animal with the breed, gender and vaccines updated', async () => {
//             const animal = response.data;
//             expect(animal.breed).eql(updatedAnimal.breed);
//             expect(animal.gender).eql(updatedAnimal.gender);
//             expect(animal.isVaccinated).eql(updatedAnimal.isVaccinated);
//             expect(animal.vaccines).eql(updatedAnimal.vaccines);
//         });
//     });
// });
