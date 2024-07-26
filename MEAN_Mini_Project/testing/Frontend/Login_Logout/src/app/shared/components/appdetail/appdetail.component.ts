import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { appInterface } from '../../../features/appinterface';
import { ApplicationsService } from '../../../core/services/applications.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from '../../../features/footer/footer.component';
import { CustomdashboardDirective } from '../../directive/customdashboard.directive';
import { CustomdashboardPipe } from '../../pipe/customdashboard.pipe';

@Component({
  selector: 'app-appdetail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    FooterComponent,
    RouterModule,
    CustomdashboardDirective,
    CustomdashboardPipe,
  ],
  templateUrl: './appdetail.component.html',
  styleUrls: ['./appdetail.component.css'],
})
export class AppdetailComponent implements OnInit {
  application: appInterface[] = [];
  apps?: appInterface;

  constructor(
    private appService: ApplicationsService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getappdetail();
  }

  getappdetail(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    // console.log(id);
    this.appService.getdetail(id).subscribe((app) => (this.apps = app));
  }
  delete(app: appInterface): void {
    if (app.id !== undefined) {
      this.application = this.application.filter((s) => s !== app);
      this.appService.delete(app.id).subscribe();
      this.router.navigate(['/dashboard']);
    }
  }
  getBack(): void {
    this.location.back();
  }
}
