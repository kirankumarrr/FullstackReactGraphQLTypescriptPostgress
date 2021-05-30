import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import mikroOrm from "./mikro-orm.config";
const main = async()=>{
    const orm = await MikroORM.init(mikroOrm)
    orm.getMigrator().up();//run migration when started automatically
    //Creating POST 
    // const post = orm.em.create(Post,{title:'my first post'})
    // await orm.em.persistAndFlush(post)// posting now
    // await orm.em.nativeInsert(Post,{title:'my first post'})// posting now

    //Fetching posts 
    const posts = await orm.em.find(Post,{})
    console.log("posts",posts)
}
main().catch((error)=>{
    console.log(error)
})



console.log("Hello")