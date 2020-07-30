import { AchievementModel } from './AchievementModel';
import { RoleModel } from './RoleModel';

export interface UserModel {
  id: number;
  name: string;
  email: string;
  points: number;
  roles: Array<RoleModel>;
  achievements: Array<AchievementModel>;
  created_at: Date;
  updated_at: Date;
}
