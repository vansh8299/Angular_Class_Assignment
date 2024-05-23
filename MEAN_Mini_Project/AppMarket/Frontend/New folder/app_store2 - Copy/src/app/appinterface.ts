import { commentInterface } from './commentInterface';

export interface AppInterface {
  id?: number;
  imageurl?: string;
  user_id?: string;
  app_name: string;
  description: string;
  release_date: Date;
  version: number;
  genre: string;
  visibility: boolean;
  downloadCount?: number;
  comments?: commentInterface[];
  averageRating?: number;
}
