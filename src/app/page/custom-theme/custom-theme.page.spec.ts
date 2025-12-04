import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CustomThemePage } from './custom-theme.page';

describe('CustomThemePage', () => {
  let component: CustomThemePage;
  let fixture: ComponentFixture<CustomThemePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomThemePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
