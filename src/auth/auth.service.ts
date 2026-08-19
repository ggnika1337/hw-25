import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dtos/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dtos/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('user') private userModel: Model<User>,
        private jwtService: JwtService
    ) { }

    async signUp({ age, email, fullName, password }: SignUpDto) {
        const existUser = await this.userModel.findOne({ email })

        if (existUser) {
            throw new BadRequestException('User already exists')
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await this.userModel.create({
            email,
            age,
            fullName,
            password: hashedPassword
        })

        return {
            success: true,
            message: "user created successfully"
        }
    }

    async signIn({ password, email }: SignInDto) {
        const existUser = await this.userModel.findOne({ email }).select('password')

        if (!existUser) {
            throw new BadRequestException('Email or password is invalid')
        }

        const isPassEqual = await bcrypt.compare(password, existUser.password)
        if (!isPassEqual) {
            throw new BadRequestException('Email or password is invalid')
        }

        const payLoad = {
            userId: existUser._id,
        }
        const token = await this.jwtService.sign(payLoad, { expiresIn: '1h' })
        return { token }
    }

    async getCurrentUser(userId) {
        return this.userModel.findById(userId)
    }

