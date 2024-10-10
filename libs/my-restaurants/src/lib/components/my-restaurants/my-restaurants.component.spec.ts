import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyRestaurantsComponent } from './my-restaurants.component';

describe('MyRestaurantsComponent', () => {
  let component: MyRestaurantsComponent;
  let fixture: ComponentFixture<MyRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRestaurantsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MyRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
