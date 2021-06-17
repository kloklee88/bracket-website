import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DeveloperToolsComponent } from './developer-tools.component';

describe('DeveloperToolsComponent', () => {
  let component: DeveloperToolsComponent;
  let fixture: ComponentFixture<DeveloperToolsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeveloperToolsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
