import { fakerES_MX as faker } from '@faker-js/faker';

function generateRandomLatLong() {
  let minLat = 14.5288, maxLat = 14.6643;
  let minLong = -90.6052, maxLong = -90.4065;
  let lat = faker.location.latitude({ min: minLat, max: maxLat, precision: 10 });
  let long = faker.location.longitude({max: maxLong, min: minLong, precision: 10});
  return {
    latitude: lat,
    longitude: long,
		map: `https://www.google.com/maps?q=${lat},${long}`
  }
}

function generateNameAndGender(){
	const genders = ['male', 'female'];
	const random = Math.floor(Math.random() * genders.length);
	const gender = genders[random];
	const name = `${faker.person.firstName(gender)} ${faker.person.lastName(gender)}`
	return {
		gender: gender == 'male' ? 'M' : 'F',
		name
	}
}

export {
	generateRandomLatLong,
	generateNameAndGender
};