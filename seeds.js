import faker from 'faker';
import Blog from './models/event';


export default async() => {
    await Blog.deleteMany({});
    // for(const i of new Array(30)) {
    //     const post = {
    //         title: faker.lorem.words(),
    //         description: faker.lorem.paragraphs(),
    //         // mainImage: faker.random.avatar_url(),
    //         city: faker.address.city(),
    //         venue: faker.address.streetAddress(),
    //         author: {
    //             "id" : "5d6e5a7248a08f455933595e",
    //             "username" : "kin"
    //         }
    //     }
    //     await Blog.create(post);
    // }
    // console.log('40 new Blog post created');
}
