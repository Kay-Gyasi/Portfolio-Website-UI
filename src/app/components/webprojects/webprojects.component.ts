import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { SharedService } from 'src/app/shared.service';
import { ProjectItems } from 'src/app/state/store/models/web.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/store/reducers';
import { LoadWebProjectsAction } from 'src/app/state/store/actions/web.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-webprojects',
  templateUrl: './webprojects.component.html',
  styleUrls: ['./webprojects.component.css']
})
export class WebprojectsComponent implements OnInit {

  constructor(private service:SharedService, private store: Store<AppState>,
    private route:ActivatedRoute) { }

  projects$:Observable<Array<ProjectItems>> | undefined;

  loading$:Observable<Boolean> | undefined;

  error$:Observable<Error> | undefined;

  category:string = "";

  ngOnInit(): void {
    this.GetCategory()
    this.loading$ = this.store.select((store) => store.web.loading);
    this.error$ = this.store.select((store) => store.web.error);

    this.store.dispatch(new LoadWebProjectsAction);
  }

  GetCategory(){
    this.category = this.route.snapshot.params['category'];
    this.projects$ = this.store.select((store) => store.web.list).pipe(
      map(data => data.filter(x => x.category == this.category))
    );
  }

  /* refreshProjectsList(){
    return this.service.GetProjects().subscribe(data => {
      this.projects = data;
    })
  } */
}
