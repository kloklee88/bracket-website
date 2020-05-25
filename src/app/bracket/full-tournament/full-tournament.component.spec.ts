import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTournamentComponent } from './full-tournament.component';

describe('FullTournamentComponent', () => {
  let component: FullTournamentComponent;
  let fixture: ComponentFixture<FullTournamentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTournamentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTournamentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
