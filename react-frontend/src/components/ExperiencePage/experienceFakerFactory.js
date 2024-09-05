
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
jobTitle: faker.lorem.sentence(1),
employmentType: "undefined",
companyName: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
endDate: faker.lorem.sentence(1),
Location: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
