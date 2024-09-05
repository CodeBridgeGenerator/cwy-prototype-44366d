
import { faker } from "@faker-js/faker";
export default (user,count,scholarshipAppIDIds,adminIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
scholarshipAppID: scholarshipAppIDIds[i % scholarshipAppIDIds.length],
admin: adminIds[i % adminIds.length],
comments: faker.lorem.sentence(""),
approvalDate: faker.lorem.sentence(""),
approvalStatus: faker.datatype.boolean(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
