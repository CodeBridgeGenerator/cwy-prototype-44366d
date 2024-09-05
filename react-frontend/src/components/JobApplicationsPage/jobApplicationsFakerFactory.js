
import { faker } from "@faker-js/faker";
export default (user,count,NameIds,jobNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
jobApplicationID: faker.lorem.sentence(""),
Name: NameIds[i % NameIds.length],
jobName: jobNameIds[i % jobNameIds.length],
jobApplicationDate: faker.lorem.sentence(""),
resumeURL: faker.lorem.sentence(""),
coverLetter: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
