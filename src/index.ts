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

import redis from 'redis';
import session from 'express-session';
import connectRedis from 'connect-redis'
import { __prod__ } from "./constants";
import { MyContext } from "./types";



const main = async()=>{
    const orm = await MikroORM.init(mikroOrm)
    orm.getMigrator().up();//run migration when started automatically
    
    const app =express()

    //Order is import : add befor apollo
    let RedisStore = connectRedis(session)
    let redisClient = redis.createClient()

    app.use(
    session({
        store: new RedisStore({ 
            client: redisClient,
            disableTouch:true
         }),//telling express session that we are using redis 
        cookie:{
            maxAge:1000 * 60 * 24 * 365 * 10, //10years
            httpOnly:true,
            sameSite:'lax', // csrf (Learn more about it)
            secure:__prod__ // cookie only works in https
        },
         saveUninitialized: false,
        secret: 'nsldkfsdlf', //move to env
        resave: false,
        name:'qid'
    })
    )

    app.get('/',(_,res)=>{
        res.send('Hello')
    })


    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers :[HelloReslover, PostReslover,UserReslover],
            validate : false
        }),
        context:({req,res}): MyContext=>({ em:orm.em, req,res}) //passing orm for posting data into db
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