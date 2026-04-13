import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-update-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-employee.html'
})
export class UpdateEmployeeComponent implements OnInit {
  updateForm: FormGroup;
  employeeId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private empService: EmployeeService
  ) {
    this.updateForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      gender: ['Male'],
      designation: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]],
      date_of_joining: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.employeeId = this.route.snapshot.paramMap.get('id') || '';
    if (this.employeeId) {
      this.empService.getEmployeeById(this.employeeId).subscribe((res: any) => {
        const emp = res.data.getEmployeeById;
        this.updateForm.patchValue(emp); // This fills the form automatically!
      });
    }
  }

  onSubmit() {
    if (this.updateForm.valid) {
      this.empService.updateEmployee(this.employeeId, this.updateForm.value).subscribe({
        next: () => this.router.navigate(['/employees']),
        error: (err) => alert('Update failed: ' + err.message)
      });
    }
  }
}