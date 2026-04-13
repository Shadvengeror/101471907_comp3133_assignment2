import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Import this
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-employee.html'
})
export class ViewEmployeeComponent implements OnInit {
  employee: any;

  constructor(
    private route: ActivatedRoute,
    private empService: EmployeeService,
    private cdr: ChangeDetectorRef // 2. Inject it here
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.empService.getEmployeeById(id).subscribe({
        next: (res: any) => {
          // 3. Ensure the path matches your schema (getEmployeeById)
          this.employee = res.data.getEmployeeById;
          // 4. Force the UI to refresh
          this.cdr.detectChanges(); 
        },
        error: (err) => console.error('Error fetching details:', err)
      });
    }
  }
}