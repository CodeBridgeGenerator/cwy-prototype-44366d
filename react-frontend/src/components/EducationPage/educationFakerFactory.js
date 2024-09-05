
import { faker } from "@faker-js/faker";
export default (user,count,nameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
NameofInstitution: faker.datatype.number(""),
EducationLevel: faker.datatype.number(""),
FieldofStudy: faker.datatype.number(""),
startDate: faker.datatype.number(""),
endDate: faker.datatype.number(""),
Grade: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
