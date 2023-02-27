import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewbookformComponent } from './newbookform.component';

describe('NewbookformComponent', () => {
  let component: NewbookformComponent;
  let fixture: ComponentFixture<NewbookformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewbookformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewbookformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
