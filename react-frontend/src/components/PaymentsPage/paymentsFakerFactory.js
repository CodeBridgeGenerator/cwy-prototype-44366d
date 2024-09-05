
import { faker } from "@faker-js/faker";
export default (user,count,payeeNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
paymentID: faker.lorem.sentence(""),
payeeName: payeeNameIds[i % payeeNameIds.length],
paymentStatus: faker.lorem.sentence(""),
paymentMethod: faker.lorem.sentence(""),
receiptURL: faker.lorem.sentence(""),
paymentDate: faker.lorem.sentence(""),
paymentamount: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
