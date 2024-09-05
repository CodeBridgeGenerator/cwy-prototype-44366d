
import { faker } from "@faker-js/faker";
export default (user,count,jobAppIDIds,adminIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
jobAppID: jobAppIDIds[i % jobAppIDIds.length],
admin: adminIds[i % adminIds.length],
comments: faker.lorem.sentence(""),
approvalDate: faker.lorem.sentence(1),
approvalStatus: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
