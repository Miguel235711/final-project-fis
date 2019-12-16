import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageContextPlaceholderComponent } from './image-context-placeholder.component';

describe('ImageContextPlaceholderComponent', () => {
  let component: ImageContextPlaceholderComponent;
  let fixture: ComponentFixture<ImageContextPlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageContextPlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageContextPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
