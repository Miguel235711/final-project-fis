import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryTableComponent } from './recovery-table.component';

describe('RecoveryTableComponent', () => {
  let component: RecoveryTableComponent;
  let fixture: ComponentFixture<RecoveryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoveryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoveryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
