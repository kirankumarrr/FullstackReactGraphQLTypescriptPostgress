import { Post } from '../entities/Post'
import { MyContext } from 'src/types'
import { Arg, Ctx, Int, Mutation, Query, Resolver } from 'type-graphql'


/***
 * @Query : Fetching data
 * @Mutation : Updating/Creating data
*/

//  Graph QL Query
 @Resolver()
 export class PostReslover {
    @Query(()=>[Post])
    posts(@Ctx() { em } : MyContext): Promise<Post []>{
        return em.find(Post,{})
    }

    
    @Query(()=>Post, { nullable:true})
    post(
        @Arg('id',()=>Int) id:number,
        @Ctx() { em } : MyContext): Promise<Post | null>{
        return em.findOne(Post,{id})
    }

    @Mutation(()=>Post) //createPost
    async createPost(
        @Arg('title') title:string,
        @Ctx() { em } : MyContext): Promise<Post>{
            const post =  em.create(Post,{title})
            await em.persistAndFlush(post)
        return post
    }

    @Mutation(()=>Post, { nullable:true}) //Updating
    async updatePost(
        @Arg('id') id:number,
        @Arg('title',()=>String,{nullable:true}) title:string, // making field to update as optional using nullable key
        @Ctx() { em } : MyContext): Promise<Post | null>{
            const post = await em.findOne(Post,{id})
            if(!post){
                return null
            }
            if(typeof title!=='undefined'){
                post.title = title;
                await em.persistAndFlush(post)
            }
        return post
    }

    @Mutation(()=> Boolean) //Delete
    async deletePost(
        @Arg('id') id:number,
        @Ctx() { em } : MyContext): Promise<Boolean>{
        await em.nativeDelete(Post,{id})
        return true
    }
 }