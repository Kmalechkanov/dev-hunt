import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../shared/models/location.model';
import { environment as env } from 'src/environments/environment';
import { Technology } from 'src/app/shared/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';
import { Language } from 'src/app/shared/models/language.model';
import { EnumService } from 'src/app/services/enum.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/shared/models/developer.model';
import { SnackbarComponent } from 'src/app/snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-update-developer',
    templateUrl: './update-developer.component.html',
    styleUrls: ['./crud-developer.component.scss']
})
export class UpdateDeveloperComponent implements OnInit {
    missingLocation: boolean = false;
    lockLocation: boolean = false;
    form!: FormGroup;
    locations!: Location[];
    technologies!: Technology[];
    languages!: Language[];
    filteredLocations!: Observable<Location[]>;
    filteredTechnologies!: Observable<Technology[]>;

    constructor(
        private fb: FormBuilder,
        public snackBar: MatSnackBar,
        private locationService: LocationService,
        private technologyServeice: TechnologyService,
        private developerService: DeveloperService,
        private enumService: EnumService,
        public dialogRef: MatDialogRef<UpdateDeveloperComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Developer
    ) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
        this.form = this.fb.group(
            {
                name: [this.data.name, Validators.required],
                email: [this.data.email, Validators.compose([Validators.email, Validators.required])],
                linkedIn: [this.data.linkedIn, Validators.pattern(env.urlRegex)],
                description: [this.data.description],
                profilePicture: [this.data.profilePicture, Validators.pattern(env.urlRegex)],
                phoneNumber: [this.data.phoneNumber, Validators.compose([Validators.required, Validators.pattern(env.phoneNumberRegex)])],
                location: [this.data.location, Validators.required],
                mapUrl: [{ value: this.data.location?.mapUrl, disabled: true }, Validators.pattern(env.urlRegex)],
                technology: [this.data.technology, Validators.required],
                imageUrl: [{ value: this.data.technology?.imageUrl, disabled: true }, Validators.pattern(env.urlRegex)],
                nativeLanguage: [this.data.nativeLanguage?.id, Validators.required],
                pricePerHour: [this.data.pricePerHour, Validators.compose(
                    [Validators.required, Validators.min(0)])],
                yearsOfExperience: [this.data.yearsOfExperience, Validators.compose(
                    [Validators.required, Validators.min(0)])],
            }
        );

        this.locationService.getAll$().pipe(take(1)).subscribe(locations => this.subscribeLocations(locations));

        this.technologyServeice.getAll$().pipe(take(1)).subscribe(technologies => this.subscribeTechnologies(technologies));

        this.enumService.getLanguages$().pipe(take(1)).subscribe(languages => this.languages = languages);
    }

    onSubmitClick(): void {
        if (this.form.valid && this.form.errors == null) {
            let creating: boolean = false;

            const locValue = this.form.get('location')?.value;
            if (locValue != "" && this.form.get('location')?.touched) {
                console.log("in", locValue);
                if (!this.locations.includes(locValue)) {
                    const locMapUrl = this.form.get('mapUrl')?.value;
                    this.locationService.create$(locValue, locMapUrl)
                        .pipe(take(1)).subscribe(res => {
                            this.data.locationId = res.id;
                            this.locations.push(res);
                            this.form.get('location')?.setValue(res);
                        });
                    creating = true;
                    console.log('Adding\' location and updateing profile.')
                }
                else {
                    this.data.locationId = locValue.id;
                    console.log('Updating\' profile')
                }
            }

            const techValue = this.form.get('technology')?.value;
            if (techValue != "" && this.form.get('technology')?.touched) {
                console.log("in", techValue);
                if (!this.technologies.includes(techValue)) {
                    const techImageUrl = this.form.get('mapUrl')?.value;
                    this.technologyServeice.create$(techValue, techImageUrl)
                        .pipe(take(1)).subscribe(res => {
                            this.data.technologyId = res.id;
                            this.technologies.push(res);
                            this.form.get('technology')?.setValue(res);
                        });
                    creating = true;
                    console.log('Adding\' technology and updateing profile.')
                }
                else {
                    this.data.technologyId = techValue.id
                    console.log('Updating\' profile')
                }
            }

            const phoneNumber = this.form.get('phoneNumber')?.value;
            if (phoneNumber != "" && this.form.get('phoneNumber')?.touched) {
                this.data.phoneNumber = phoneNumber;
            }

            const pricePerHour = this.form.get('pricePerHour')?.value;
            if (pricePerHour != "" && this.form.get('pricePerHour')?.touched) {
                this.data.pricePerHour = pricePerHour;
            }

            const yearsOfExperience = this.form.get('yearsOfExperience')?.value;
            if (yearsOfExperience != "" && this.form.get('yearsOfExperience')?.touched) {
                this.data.yearsOfExperience = yearsOfExperience;
            }

            const nativeLanguage = this.form.get('nativeLanguage')?.value;
            if (nativeLanguage != "" && this.form.get('nativeLanguage')?.touched) {
                this.data.nativeLanguageId = nativeLanguage;
            }

            const name = this.form.get('name')?.value;
            if (name != "" && this.form.get('name')?.touched) {
                this.data.name = name;
            }

            const email = this.form.get('email')?.value;
            if (email != "" && this.form.get('email')?.touched) {
                this.data.email = email;
            }

            this.data.description = this.form.get('description')?.value;

            this.data.profilePicture = this.form.get('profilePicture')?.value;

            this.data.linkedIn = this.form.get('linkedIn')?.value;

            console.log('Creating:', creating);
            if (creating) {
                creating = false;
            } else {
                console.log("dev value", this.data);
                this.developerService.update$(this.data).subscribe(res => {

                    this.snackBar.openFromComponent(SnackbarComponent, {
                        data: "Successfully updated developer!"
                    });
                    this.dialogRef.close(res);
                });
            }
        }
    }

    subscribeLocations(locations: Location[]) {
        this.locations = locations;

        this.filteredLocations = this.form.controls['location'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._mapValue(value)),
                map(name => {
                    const result = name ? this._filterLocations(name) : this.locations.slice();

                    if (this.locations.some(l => l.name == name)) {
                        const mapUrl = this.locations.find(x => x.name == name)?.mapUrl;
                        this.form.controls.mapUrl.disable();
                        this.form.controls.mapUrl.setValue(mapUrl ? mapUrl : "");
                    }
                    else {
                        this.form.controls.mapUrl.enable();
                        this.form.controls.mapUrl.setValue("");
                    }
                    return result;
                })
            );
    }

    subscribeTechnologies(technologies: Technology[]) {
        this.technologies = technologies;

        this.filteredTechnologies = this.form.controls['technology'].valueChanges
            .pipe(
                startWith(''),
                map(value => this._mapValue(value)),
                map(name => {
                    const result = name ? this._filterTechnolgy(name) : this.technologies.slice();

                    if (this.technologies.some(l => l.name == name)) {
                        const imageUrl = this.technologies.find(x => x.name == name)?.imageUrl;
                        this.form.controls.imageUrl.disable();
                        this.form.controls.imageUrl.setValue(imageUrl ? imageUrl : "");
                    }
                    else {
                        this.form.controls.imageUrl.enable();
                        this.form.controls.imageUrl.setValue("");
                    }
                    return result;
                })
            );
    }

    displayLocationFn(location: Location): string {
        return location && location.name ? location.name : '';
    }

    displayTechnologyFn(technology: Technology): string {
        return technology && technology.name ? technology.name : '';
    }

    private _mapValue = (value: any) => typeof value === 'string' ? value : value.name;

    //todo make it with interface
    private _filterLocations(name: string): Location[] {
        const filterValue = name.toLowerCase();
        return this.locations.filter(location => location.name.toLowerCase().includes(filterValue));
    }

    private _filterTechnolgy(name: string): Technology[] {
        const filterValue = name.toLowerCase();
        return this.technologies.filter(technology => technology.name.toLowerCase().includes(filterValue));
    }
}
