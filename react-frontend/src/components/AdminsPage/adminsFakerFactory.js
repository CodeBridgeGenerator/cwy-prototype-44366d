
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
AdminID: faker.lorem.sentence(""),
username: faker.lorem.sentence(""),
email: faker.lorem.sentence(""),
password: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
