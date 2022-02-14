import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LoginInput, UserInput } from 'src/users/Input/users.input';
import { Users } from 'src/users/interface/users.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private usersModel: Model<Users>,
    private jwtService: JwtService,
  ) {}
  async signUp(payload: UserInput) {
    try {
      if (
        !(payload.role === 'Management' || payload.role === 'Project Manager')
      ) {
        throw new UnauthorizedException('Unauthorized user');
      }
      // Check Email
      const emailExist = await this.usersModel.findOne({
        email: payload.email,
      });
      if (emailExist) throw new Error('User Already Exist');

      return await this.usersModel.create(payload);
    } catch (error) {
      throw error;
    }
  }

  async loginUser(payload: LoginInput) {
    try {
      console.log('payload :>> ', payload);
      const { email, password } = payload;
      if (!(email && password)) throw new Error('Please Enter Data');

      const userData: any = await this.usersModel.findOne({ email });
      if (!userData) throw new Error('User not Found');

      //         const comparePassword = await bcrypt.compare(password, userData.password)
      //         if (!comparePassword) {
      //             return res.json({ statusCode: 400, message: "Invalid Password", data: null })
      //         }

      const token = await this.createToken(
        userData.email,
        userData.role,
        userData._id,
      );
      userData.token = token.accessToken;
      await userData.save();

      return userData;
    } catch (error) {
      throw error;
    }
  }

  async createToken(userEmail: string, userRole: string, userId: string) {
    const payload = { email: userEmail, role: userRole, _id: userId };
    return { accessToken: this.jwtService.sign(payload) };
  }

  async validateUser(user: any) {
    return await this.usersModel.findOne({ email: user.email });
  }
}
