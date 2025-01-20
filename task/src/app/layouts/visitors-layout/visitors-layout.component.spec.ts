import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitorsLayoutComponent } from './visitors-layout.component';

describe('VisitorsLayoutComponent', () => {
  let component: VisitorsLayoutComponent;
  let fixture: ComponentFixture<VisitorsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisitorsLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitorsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
