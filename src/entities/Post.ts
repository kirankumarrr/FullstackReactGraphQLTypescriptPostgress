//DB Table

import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity() // this is db table
export class Post {

  @PrimaryKey() 
  id!: number;

  @Property({type:'date'})//regular column
  createdAt: Date = new Date();

  @Property({ type:'date', onUpdate: () => new Date() }) // hook to get new date
  updatedAt: Date = new Date();

  @Property({type:'text'})
  title!: string;

}