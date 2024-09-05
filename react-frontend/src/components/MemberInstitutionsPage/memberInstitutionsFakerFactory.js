
import { faker } from "@faker-js/faker";
export default (user,count,nameIds,institutionNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: nameIds[i % nameIds.length],
institutionName: institutionNameIds[i % institutionNameIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
