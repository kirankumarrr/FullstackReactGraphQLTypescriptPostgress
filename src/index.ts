import { MikroORM } from "@mikro-orm/core";
// import { Post } from "./entities/Post";
import mikroOrm from "./mikro-orm.config";
import express from "express";
import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from "type-graphql";
import { HelloReslover } from "./resolvers/hello";
import { PostReslover } from "./resolvers/post";
import { UserReslover } from "./resolvers/user";

const main = async()=>{
    const orm = await MikroORM.init(mikroOrm)
    orm.getMigrator().up();//run migration when started automatically
    
    const app =express()

    app.get('/',(_,res)=>{
        res.send('Hello')
    })


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers :[HelloReslover, PostReslover,UserReslover],
            validate : false
        }),
        context:()=>({ em:orm.em }) //passing orm for posting data into db
    })

    apolloServer.applyMiddleware({app})

    app.listen(4000,()=>{
        console.log("port started on 4000")
    })
}
main().catch((error)=>{
    console.log(error)
})



console.log("Hello")