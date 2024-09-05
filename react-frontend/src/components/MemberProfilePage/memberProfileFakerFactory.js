
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
dateOfBirth: faker.lorem.sentence(""),
gender: faker.lorem.sentence(""),
phonenumber: faker.lorem.sentence(""),
address: faker.lorem.sentence(""),
educationlevel: faker.lorem.sentence(""),
nationality: faker.lorem.sentence(""),
IDnumber: faker.lorem.sentence(""),
previousInstituteName: faker.lorem.sentence(""),
employmentStatus: faker.lorem.sentence(""),
skills: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
