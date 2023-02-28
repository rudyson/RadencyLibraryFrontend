import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBookPaneComponent } from './new-book-pane.component';

describe('NewBookPaneComponent', () => {
  let component: NewBookPaneComponent;
  let fixture: ComponentFixture<NewBookPaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewBookPaneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBookPaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
