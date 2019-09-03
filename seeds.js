import faker from 'faker';
import Blog from './models/blog';


export default async() => {
    await Blog.remove({});
    for(const i of new Array(40)) {
        const post = {
            title: faker.lorem.word(),
            description: faker.lorem.text(),
            author: {
                "id" : "5d6e5a7248a08f455933595e",
                "username" : "kin"
            }
        }
        await Blog.create(post);
    }
    console.log('40 new blog post created');
}
