// logged-in.guard.ts
import { Injectable , ViewContainerRef, Injector, Compiler, ComponentRef,
    ReflectiveInjector,ComponentFactory } from "@angular/core";
import { Observable, ReplaySubject, BehaviorSubject } from "rxjs/Rx";


@Injectable()
export class ModalService {

    private viewContainerRef: ViewContainerRef;
    private injector: Injector;
    public activeInstances: number = 0;
    public active = new BehaviorSubject(false);

    constructor(private compiler: Compiler) {}

    registerViewContainerRef(viewContainerRef: ViewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }

    registerInjector(injector: Injector) {
        this.injector = injector;
    }

    createFromFactory<T>(componentFactory: ComponentFactory<T>, parameters?: Object): Observable<ComponentRef<T>> {
        let componentRefSubject = new ReplaySubject();
        const childInjector = ReflectiveInjector.resolveAndCreate([], this.injector);
        let componentRef = this.viewContainerRef.createComponent(componentFactory, 0, childInjector);
        Object.assign(componentRef.instance, parameters);
        this.activeInstances++;
        this.active.next(true);
        componentRef.instance["componentIndex"] = this.activeInstances;
        componentRef.instance["destroy"] = () => {
            this.activeInstances--;
            if(this.activeInstances < 1) {
                this.active.next(false);
            }
            componentRef.destroy();
        }
        componentRefSubject.next(componentRef);
        componentRefSubject.complete();
        return componentRefSubject.asObservable();
    }
}