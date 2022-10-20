import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalPlaceholderComponent } from "./modal-placeholder.component";
import { ModalService } from "./modal.service";

// Import styles
import "../../../styles/styles.scss";

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
        ModalPlaceholderComponent
    ],
    providers: [],
    exports: [
        ModalPlaceholderComponent
    ]
  })
  export class ModalModule {
    static forRoot(): ModuleWithProviders {
      return {
        ngModule: ModalModule,
        providers: [ ModalService ]
      }
    }
  }
  