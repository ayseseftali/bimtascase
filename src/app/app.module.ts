import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
//import { LeafletModule } from '@asymmetrik/ngx-leaflet';
//import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    //LeafletModule,
    //LeafletMarkerClusterModule,
    ToastrModule.forRoot()
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
