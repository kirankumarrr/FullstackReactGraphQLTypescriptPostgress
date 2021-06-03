 import { Query, Resolver } from 'type-graphql'


//  Graph QL Query
 @Resolver()
 export class HelloReslover {
    @Query(()=>String)
    hello(){
        return 'hello Test'
    }
 }