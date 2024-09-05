
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
InstitutionName: faker.lorem.sentence(""),
Location: faker.lorem.sentence(""),
name: nameIds[i % nameIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
