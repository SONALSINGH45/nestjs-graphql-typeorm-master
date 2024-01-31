// user.repo.ts

import { EntityRepository, Repository } from 'typeorm';
import { User } from "../entites/user.entity"

@EntityRepository(User)
export class UserRepository extends Repository<User> { }
