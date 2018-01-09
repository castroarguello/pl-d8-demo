import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComposerComponent } from './composer.component';

describe('ComposerComponent', () => {
  let component: ProductionDetailComponent;
  let fixture: ComponentFixture<ProductionDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComposerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComposerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
