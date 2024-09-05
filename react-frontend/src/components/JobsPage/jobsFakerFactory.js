
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
jobID: faker.lorem.sentence(""),
jobTitle: faker.lorem.sentence(""),
jobDescription: faker.lorem.sentence(""),
jobRequirements: faker.lorem.sentence(""),
companyName: faker.lorem.sentence(""),
location: faker.lorem.sentence(""),
salary: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
