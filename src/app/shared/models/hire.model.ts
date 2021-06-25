import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { User } from './user.model';

export class Hire {
    id!: number;
    boss!: User;
    employee!: User;
    startDate?: number;
    endDate?: number;
}