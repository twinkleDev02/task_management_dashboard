import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEdit } from './add-or-edit';

describe('AddOrEdit', () => {
  let component: AddOrEdit;
  let fixture: ComponentFixture<AddOrEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddOrEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
