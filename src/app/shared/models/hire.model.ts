import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { Developer } from './developer.model';
import { User } from './user.model';

export class Hire {
    id!: number;
    userId!: User;
    user?: User;
    developerId!: Developer;
    developer?: Developer
    startDate!: number;
    endDate!: number;
}