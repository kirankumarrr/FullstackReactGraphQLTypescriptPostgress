//DB Table

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";


@ObjectType()//Converted to object type entity
@Entity() // this is db table
export class User {

  @Field(()=>Int)
  @PrimaryKey() 
  id!: number;
  
  @Field(()=>String)
  @Property({type:'date'})//regular column
  createdAt: Date = new Date();
  
  @Field(()=>String)
  @Property({ type:'date', onUpdate: () => new Date() }) // hook to get new date
  updatedAt: Date = new Date();
  
  @Field()
  @Property({type:'text',unique:true}) // unique username
  username!: string;

  @Property({type:'text'})  // Removed field becaues we are going to hash when saving.
  password!: string;

}