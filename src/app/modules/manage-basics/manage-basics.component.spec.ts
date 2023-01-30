import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBasicsComponent } from './manage-basics.component';

describe('ManageBasicsComponent', () => {
  let component: ManageBasicsComponent;
  let fixture: ComponentFixture<ManageBasicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageBasicsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBasicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
