import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Add this import
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css'
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = [];

  constructor(
    private empService: EmployeeService, 
    private router: Router,
    private cdr: ChangeDetectorRef // 2. Inject it here
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

allEmployees: any[] = [];
  
 loadEmployees() {
  this.empService.getEmployees().subscribe({
    next: (result: any) => {
      if (!result.loading && result.data) {
        this.allEmployees = result.data.getAllEmployees;
        this.employees = [...this.allEmployees]; // Initialize both
        this.cdr.detectChanges();
      }
    }
  });
}

onSearch(event: any) {
  const searchTerm = event.target.value.toLowerCase().trim();
  
  // If search is empty, show everyone
  if (!searchTerm) {
    this.employees = [...this.allEmployees];
  } else {
    this.employees = this.allEmployees.filter(emp => {
      // Check if fields exist before calling toLowerCase to avoid errors
      const designation = emp.designation ? emp.designation.toLowerCase() : '';
      const firstName = emp.first_name ? emp.first_name.toLowerCase() : '';
      const lastName = emp.last_name ? emp.last_name.toLowerCase() : '';

      return designation.includes(searchTerm) || 
             firstName.includes(searchTerm) || 
             lastName.includes(searchTerm);
    });
  }
  
  // Force the table to update visually
  this.cdr.detectChanges();
  
  console.log(`Searching for: ${searchTerm}, Found: ${this.employees.length} matches`);
}

  deleteEmployee(id: string) {
    if(confirm("Are you sure you want to delete this employee?")) {
      this.empService.deleteEmployee(id).subscribe(() => {
        this.loadEmployees(); 
      });
    }
  }

  logout() {
    localStorage.removeItem("token");
    this.router.navigate(['/login']);
  }
}