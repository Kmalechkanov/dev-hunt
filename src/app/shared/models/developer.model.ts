import { Language } from './language.model';
import { Location } from './location.model'
import { Technology } from './technology.model'


export class Developer {
    id!: number;
    name!: string;
    email!: string;
    phoneNumber!: string;
    locationId!: number;
    location?: Location;
    technologyId!: number;
    technology?: Technology;
    pricePerHour!: number;
    yearsOfExperience!: number;
    nativeLanguageId!: number;
    nativeLanguage?: Language;
    profilePicture?: string;
    description?: string;
    linkedIn?: string;
}