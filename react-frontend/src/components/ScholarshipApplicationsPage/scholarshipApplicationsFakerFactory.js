
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,scholarshipNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
scholarshipApplicationID: faker.lorem.sentence(""),
name: nameIds[i % nameIds.length],
scholarshipName: scholarshipNameIds[i % scholarshipNameIds.length],
scholarshipApplicationDate: faker.lorem.sentence(""),
essayURL: faker.lorem.sentence(""),
recommendationLetterURL: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
