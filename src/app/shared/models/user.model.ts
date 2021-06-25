import { Location } from './location.model'
import { Technology } from './technology.model'


export class User {
    id!: number;
    email!: string;
    firstName!: string;
    lastName!: string;
    role!: string;
    phoneNumber?: string;
    // locationId?: number;
    // technologyId?: number;
    location?: Location;
    technology?: Technology;
    pricePerHour?: number;
    yearsOfExperience?: number;
    nativeLanguageId?: number;
    profilePicture?: string;
    description?: string;
    linkedIn?: string;
}