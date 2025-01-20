import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HousesSlideComponent } from './houses-slide.component';

describe('HousesSlideComponent', () => {
  let component: HousesSlideComponent;
  let fixture: ComponentFixture<HousesSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HousesSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HousesSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
