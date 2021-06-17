import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BracketComponent } from './bracket.component';

describe('BracketComponent', () => {
  let component: BracketComponent;
  let fixture: ComponentFixture<BracketComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BracketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BracketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
