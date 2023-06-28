import { NavigationService } from './navigation.service';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';

describe('Navigation Service', () => {
  let service: NavigationService;
  let routerSpy: jasmine.SpyObj<Router>;
  let locationSpy: jasmine.SpyObj<Location>;
  let eventsSubject = new Subject();

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj<Router>('routerSpy', ['navigateByUrl'], {
      events: eventsSubject.asObservable() as Observable<any>
    });
    locationSpy = jasmine.createSpyObj<Location>('locationSpy', ['back']);
    service = new NavigationService(routerSpy, locationSpy);
  });

  // what am I missing here?
  xit('should go back to the most recent item in location history', () => {
    const fakeEvent = Object.create(NavigationEnd.prototype);
    fakeEvent.urlAfterRedirects = 'test/url';
    eventsSubject.next(fakeEvent);

    service.back();
    expect(locationSpy.back).toHaveBeenCalled();

    eventsSubject.unsubscribe();
  });

  it('should return to the root route if no item exists in location history', () => {
    service.back();
    expect(locationSpy.back).not.toHaveBeenCalled();
    expect(routerSpy.navigateByUrl).toHaveBeenCalledTimes(1)
  });
})