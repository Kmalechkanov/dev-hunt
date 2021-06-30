import { Language } from './language.model';
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
    locationId?: number;
    location?: Location;
    technologyId?: number;
    technology?: Technology;
    pricePerHour?: number;
    yearsOfExperience?: number;
    nativeLanguageId?: number;
    nativeLanguage?: Language;
    profilePicture?: string;
    description?: string;
    linkedIn?: string;
}