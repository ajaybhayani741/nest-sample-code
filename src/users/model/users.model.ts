import { Field, ID, Int, ObjectType } from "@nestjs/graphql";
// import { Document } from "mongoose";

@ObjectType()
export class UsersModelGQL {
    @Field(() => ID)
    _id: String

    @Field(() => String)
    name?: String

    @Field(() => String)
    email?: String

    @Field(() => Int)
    age?: Number

    @Field(() => String)
    password?: String

    @Field(() => String)
    role?: String

    @Field(() => String)
    technology?: String

    @Field(() => String, { nullable: true })
    token?: String

    @Field(() => Boolean)
    status: Boolean
}

// @ObjectType()
// export class FileUploadData {
//     @Field(() => String, { nullable: true })
//     filename?: String

//     @Field(() => String, { nullable: true })
//     mimetype?: String

//     @Field(() => String, { nullable: true })
//     encoding?: String

// }