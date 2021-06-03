import { User } from '../entities/User'
import { MyContext } from 'src/types'
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from 'type-graphql'
import argon2 from 'argon2' //Used for hasing (Alternative for bycrpt)

@InputType()
class UsernamePasswordInput{
    @Field()
    username: string

    @Field()
    password:string
}

@ObjectType()
class FieldError{
    @Field()
    field: string

    @Field()
    message:string
}

@ObjectType()
class UserResponse{
    @Field(()=>[FieldError],{nullable:true})
    errors?: FieldError[]

    @Field(()=>User,{nullable:true})
    user?:User
}


//  Graph QL Query
 @Resolver()
 export class UserReslover {

    @Query(()=>User,{nullable:true})
    async me( @Ctx() {em, req} : MyContext){
        //your not logged in
        //below we set userId during login route
        console.log("session::::",req.session)
        if(!req.session.userId){
            return null
        }

        const user = await em.findOne(User,{id:req.session.userId})
        return user;

    }
    

    @Mutation(()=>UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ):Promise<UserResponse>{

        if(options.username.length<=2){
            return {
                errors:[{field:'username',message:'length must be grater then 2'}]
            }
        }

        if(options.password.length<=3){
            return {
                errors:[{field:'password',message:'length must be grater then 3'}]
            }
        }

        const hasedPassword =await argon2.hash(options.password)
        const user = em.create(User, {username:options.username,password:hasedPassword})
        try{
            await em.persistAndFlush(user)
        }catch(error){
            //duplicate username error
            if(error.code==='23505' || error.detail.includes('already exists')){
                return {
                    errors:[{field:'username',message:'username already exists'}]
                }
            }
        }

        //store user id in session
        // this will set a cookie on the user
        //keep them logged in
        req.session.userId = user.id 

        return {user}
    }

    @Mutation(()=>UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() {em, req}: MyContext
    ):Promise<UserResponse>{

        const user = await em.findOne(User, {username:options.username})

        if(!user){
            return {
                errors:[{field:'username',message:'username does not exist'}]
            }
        }

        const valid =await argon2.verify(user.password, options.password)
        
        if(!valid){
            return {
                errors:[{field:'password',message:'incorrect password'}]
            }
        }

        req.session.userId = user.id 
        
        return {
            user
        }
    }
 }