import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EntryNewsPage } from './entry-news.page';

describe('EntryNewsPage', () => {
  let component: EntryNewsPage;
  let fixture: ComponentFixture<EntryNewsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryNewsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EntryNewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
