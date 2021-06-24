import { NumberSymbol } from "@angular/common";

export class User {
    id!: number;
    email!: string;
    firstName!: string;
    lastName!: string;
    role!: string;
    phoneNumber?: string;
    locationId?: number;
    technologyId?: number;
    pricePerHour?: number;
    yearsOfExperience?: number; 
    nativeLanguageId?: NumberSymbol;
    profilePicture?: string;
    description?: string;
    linkedIn?: string;
}