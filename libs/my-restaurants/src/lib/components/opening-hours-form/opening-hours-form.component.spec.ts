import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OpeningHoursFormComponent } from './opening-hours-form.component';

describe('OpeningHoursFormComponent', () => {
  let component: OpeningHoursFormComponent;
  let fixture: ComponentFixture<OpeningHoursFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpeningHoursFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OpeningHoursFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
