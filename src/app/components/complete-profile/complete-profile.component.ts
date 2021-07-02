import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';
import { Location } from '../../shared/models/location.model';
import { environment as env } from 'src/environments/environment';
import { Technology } from 'src/app/shared/models/technology.model';
import { TechnologyService } from 'src/app/services/technology.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user.model';
import { Language } from 'src/app/shared/models/language.model';
import { EnumService } from 'src/app/services/enum.service';
import { DeveloperService } from 'src/app/services/developer.service';
import { Developer } from 'src/app/shared/models/developer.model';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss']
})
export class CompleteProfileComponent implements OnInit {
  @Input() developer!: Developer;

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
    private locationService: LocationService,
    private technologyServeice: TechnologyService,
    private userService: UserService,
    private developerService: DeveloperService,
    private enumService: EnumService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        phoneNumber: ['', Validators.pattern(env.phoneNumberRegex)],
        location: ['', Validators.required],
        mapUrl: [{ value: '', disabled: false }, Validators.pattern(env.urlRegex)],
        technology: ['', Validators.required],
        imageUrl: [{ value: '', disabled: false }, Validators.pattern(env.urlRegex)],
        nativeLanguage: ['', Validators.required],
        pricePerHour: ['', Validators.compose(
          [Validators.required, Validators.min(0)])],
        yearsOfExperience: ['', Validators.compose(
          [Validators.required, Validators.min(0)])],
      }
    );

    console.log('Developer', this.developer.nativeLanguageId);

    this.locationService.getAll$().subscribe(locations => this.subscribeLocations(locations));

    this.technologyServeice.getAll$().subscribe(technologies => this.subscribeTechnologies(technologies));

    this.enumService.getLanguages$().subscribe(languages => this.languages = languages);
  }

  onSubmit() {
    if (this.form.valid || this.form.errors == null) {

      const locValue = this.form.get('location')?.value;
      if (locValue != "" && this.form.get('location')?.touched) {
        console.log("in", locValue);
        let id: number;
        if (!this.locations.includes(locValue)) {
          const locMapUrl = this.form.get('mapUrl')?.value;
          this.locationService.create$(locValue, locMapUrl)
            .subscribe(res =>
              this.developerService.updateLocation$(this.developer.id, res.id).subscribe()
            );
          console.log('Adding\' location and updateing profile.')
        }
        else {
          this.developerService.updateLocation$(this.developer.id, locValue.id).subscribe();
          console.log('Updating\' profile')
        }
      }

      const techValue = this.form.get('technology')?.value;
      if (techValue != "" && this.form.get('technology')?.touched) {
        console.log("in", techValue);
        let id: number;
        if (!this.technologies.includes(techValue)) {
          const techImageUrl = this.form.get('mapUrl')?.value;
          this.technologyServeice.create$(techValue, techImageUrl)
            .subscribe(res =>
              this.developerService.updateTechnology$(this.developer.id, res.id).subscribe()
            );
          console.log('Adding\' technology and updateing profile.')
        }
        else {
          this.developerService.updateTechnology$(this.developer.id, techValue.id).subscribe();
          console.log('Updating\' profile')
        }
      }

      const phoneNumber = this.form.get('phoneNumber')?.value;
      if (phoneNumber != "" && this.form.get('technology')?.touched) {
        console.log("in", phoneNumber)
        this.developerService.updatePhoneNumber$(this.developer.id, phoneNumber).subscribe();
      }

      const pricePerHour = this.form.get('pricePerHour')?.value;
      if (pricePerHour != "" && this.form.get('pricePerHour')?.touched) {
        console.log("in", pricePerHour)
        this.developerService.updatePrice$(this.developer.id, pricePerHour).subscribe();
      }

      const usersOfExperience = this.form.get('yearsOfExperience')?.value;
      if (usersOfExperience != "" && this.form.get('usersOfExperience')?.touched) {
        console.log("in", usersOfExperience)
        this.developerService.updateExperience$(this.developer.id, usersOfExperience).subscribe();
      }

      const nativeLanguage = this.form.get('nativeLanguage')?.value;
      if (nativeLanguage != "" && this.form.get('nativeLanguage')?.touched) {
        console.log("in", nativeLanguage)
        this.developerService.updateNativeLanguage$(this.developer.id, nativeLanguage).subscribe();
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
