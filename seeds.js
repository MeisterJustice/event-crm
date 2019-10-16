import faker from 'faker';
import Blog from './models/event';

const randomTitle = [
    'how',
    'pool party at the glass house',
    'dedicating the slays',
    'yoruba demons party',
    'drinks at the club',
    'sexual feeling',
    'remembering the old party spirit',
    'last night sober party'
]

const randomImage = [
    'https://cdn.pixabay.com/photo/2015/05/15/14/50/concert-768722__340.jpg',
    'https://cdn.pixabay.com/photo/2015/07/10/17/53/cheers-839865__340.jpg',
    'https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432__340.jpg',
    'https://cdn.pixabay.com/photo/2018/01/11/09/52/three-3075752__340.jpg',
    'https://cdn.pixabay.com/photo/2015/07/30/17/24/audience-868074__340.jpg',
    
]

const desc = "There are variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free f. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free f"


export default async() => {
    await Blog.deleteMany({});
    for(const i of new Array(30)) {
        const post = {
            title: randomTitle[Math.floor(Math.random()*randomTitle.length)],
            description: desc,
            images: {url: randomImage[Math.floor(Math.random()*randomImage.length)]},
            city: 'Lagos',
            country: 'Nigeria',
            venue: 'Links Hotel',
            eventDate: '25th December, 2019',
            eventTime: '9pm till dawn',
            author: {
                "id" : "5d91ef9299c1c21e2aef7e02",
                "username" : "justice"
            }
        }
        await Blog.create(post);
    }
    console.log('40 new Blog post created');
}
