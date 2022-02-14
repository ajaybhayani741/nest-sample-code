import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FileUpload } from 'graphql-upload';
import fs from "fs";
import { Model, Mongoose, Schema } from 'mongoose';
import { Users } from 'src/users/interface/users.interface';
import { UserInput } from './Input/users.input';
@Injectable()
export class UsersService {
    constructor(@InjectModel('users') private usersModel: Model<Users>) { }

    async getUsers() {
        try {
            return await this.usersModel.find({}).exec();
        } catch (error) {
            throw error;
        }
    }

    async getUserById(_id: Schema.Types.ObjectId) {
        try {
            return await this.usersModel.findById(_id).exec();
        } catch (error) {
            throw error;
        }
    }

    async addUser(payload: UserInput) {
        try {
            const emailExist = await this.usersModel.findOne({ email: payload.email })
            if (emailExist) throw new Error('User Already Exist')
            return await this.usersModel.create(payload);
        } catch (error) {
            throw error;
        }
    }

    async deleteUser(_id: Schema.Types.ObjectId) {
        try {
            return await this.usersModel.findOneAndDelete({ _id }).lean().exec();
        } catch (error) {
            throw error;
        }
    }

    async editUser(payload: UserInput, _id: Schema.Types.ObjectId) {
        try {
            return await this.usersModel.findOneAndUpdate({ _id }, { $set: payload }, { new: true });
        } catch (error) {
            throw error;
        }
    }
}
