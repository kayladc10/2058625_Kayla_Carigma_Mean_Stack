import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamMaterialComponent } from './exam-material.component';

describe('ExamMaterialComponent', () => {
  let component: ExamMaterialComponent;
  let fixture: ComponentFixture<ExamMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
