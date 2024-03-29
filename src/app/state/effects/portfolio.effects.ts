import { Injectable } from "@angular/core";
import { createEffect, Actions,  ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import { LoadCategoryAction, LoadCategorySuccessAction, LoadCategoryFailureAction } from "../store/actions/category.action";
import { LoadAboutAction, LoadAboutSuccessAction, LoadAboutFailureAction } from "../store/actions/about.actions";
import { PortfolioActionType } from "../store/enums/enums";
import { SharedService } from "src/app/shared.service";
import { of } from "rxjs";
import { LoadWebFailureAction, LoadWebProjectsAction, LoadWebSuccessAction } from "../store/actions/web.actions";

@Injectable()
export class PortfolioEffects{
    loadCategories$ = createEffect(() => this.actions$
    .pipe(
        ofType<LoadCategoryAction>(PortfolioActionType.LOAD_CATEGORY),
        mergeMap(
            () => this.service.GetCategories()
            .pipe(
                map(data => new LoadCategorySuccessAction(data)),
                catchError(error => of(new LoadCategoryFailureAction(error)))
            )
        )
    )
    );

    loadSkills$ = createEffect(() => this.actions$
    .pipe(
        ofType<LoadAboutAction>(PortfolioActionType.LOAD_SKILLS),
        mergeMap(
            () => this.service.Skills()
            .pipe(
                map(data => new LoadAboutSuccessAction(data)),
                catchError(error => of(new LoadAboutFailureAction(error)))
            ))
    ));

    loadProjects$ = createEffect(() => this.actions$
    .pipe(
        ofType<LoadWebProjectsAction>(PortfolioActionType.LOAD_PROJECTS),
        mergeMap(
            () => this.service.GetProjects()
            .pipe(
                map(data => new LoadWebSuccessAction(data)),
                catchError(error => of(new LoadWebFailureAction(error)))
            )
        )
    ));

    constructor(private actions$:Actions, private service:SharedService){}
}