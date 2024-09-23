// src/types/prisma.ts

export interface User {
    id: number;
    email: string;
    name: string | undefined;
    fullname: string | undefined;
    bio: string | undefined;
    socials: Social[];
    links: Link[];
    experiences: Experience[];
    skills: Skill[];
    educations: Education[];
    projects: Project[];
    achievements: Achievement[];
  }

  export interface Education {
    id: number;
    school: string | undefined;
    degree: string | undefined;
    field: string | undefined;
    description: string | undefined;
    start_date: Date | undefined;
    end_date: Date | undefined;
    userId: number;
    user: User;
  }

  export interface Project {
    id: number;
    name: string | undefined;
    description: string | undefined;
    url: string | undefined;
    userId: number;
    user: User;
  }

  export interface Achievement {
    id: number;
    title: string | undefined;
    description: string | undefined;
    date: Date | undefined;
    url: string | undefined;
    userId: number;
    user: User;
  }
  
  export interface Social {
    id: number;
    platform: string | undefined;
    url: string | undefined;
    userId: number;
    user: User;
  }
  
  export interface Link {
    id: number;
    name: string | undefined;
    url: string | undefined;
    userId: number;
    user: User;
  }
  
  export interface Experience {
    id: number;
    name: string | undefined;
    description: string | undefined;
    place: string | undefined;
    location: string | undefined;
    type: string | undefined;
    start_time: Date | undefined;
    end_time: Date | undefined;
    userId: number;
    user: User;
  }
  
  export interface Skill {
    id: number;
    name: string | undefined;
    description: string | undefined;
    userId: number;
    user: User;
  }
  
  // Utility types for create and update operations
  export type CreateUserInput = Omit<User, 'id' | 'socials' | 'links' | 'experiences' | 'skills'>;
  export type UpdateUserInput = Partial<CreateUserInput>;
  
  export type CreateSocialInput = Omit<Social, 'id' | 'user'>;
  export type UpdateSocialInput = Partial<CreateSocialInput>;
  
  export type CreateLinkInput = Omit<Link, 'id' | 'user'>;
  export type UpdateLinkInput = Partial<CreateLinkInput>;
  
  export type CreateExperienceInput = Omit<Experience, 'id' | 'user'>;
  export type UpdateExperienceInput = Partial<CreateExperienceInput>;
  
  export type CreateSkillInput = Omit<Skill, 'id' | 'user'>;
  export type UpdateSkillInput = Partial<CreateSkillInput>;