
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
scholarshipID: faker.date.past(""),
scholarshipName: faker.date.past(""),
scholarshipDescription: faker.date.past(""),
eligibilityCriteria: faker.date.past(""),
applicationDeadline: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
