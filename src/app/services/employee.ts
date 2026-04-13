import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  // Fetch all employees
  getEmployees() {
  return this.apollo.watchQuery({
    query: gql`
      query GetEmployees {
        getAllEmployees {
          _id
          first_name
          last_name
          email
          designation
        }
      }
    `,
    fetchPolicy: 'network-only' // This ensures it doesn't show an old empty cache
  }).valueChanges;
}

  addEmployee(data: any) {
  return this.apollo.mutate({
    mutation: gql`
      mutation AddEmployee($first_name: String!, $last_name: String!, $email: String!, $gender: String, $designation: String!, $salary: Float!, $date_of_joining: String!, $department: String!, $employee_photo: String) {
        addEmployee(
          first_name: $first_name, 
          last_name: $last_name, 
          email: $email, 
          gender: $gender, 
          designation: $designation, 
          salary: $salary, 
          date_of_joining: $date_of_joining, 
          department: $department,
          employee_photo: $employee_photo
        ) {
          _id
          first_name
        }
      }
    `,
    variables: {
      ...data,
      salary: parseFloat(data.salary),
      // If photo is empty, send null
      employee_photo: data.employee_photo || null 
    }
  });
}

getEmployeeById(id: string) {
  return this.apollo.query({
    query: gql`
      query GetEmployeeById($id: ID!) {
        getEmployeeById(id: $id) {
          _id
          first_name
          last_name
          email
          gender
          designation
          salary
          date_of_joining
          department
        }
      }
    `,
    variables: { id }
  });
}

updateEmployee(id: string, data: any) {
  return this.apollo.mutate({
    mutation: gql`
      mutation UpdateEmployee($id: ID!, $input: UpdateEmployeeInput!) {
        updateEmployee(id: $id, input: $input) {
          _id
          first_name
        }
      }
    `,
    variables: {
      id: id,
      input: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        gender: data.gender,
        designation: data.designation,
        salary: parseFloat(data.salary),
        date_of_joining: data.date_of_joining,
        department: data.department
      }
    }
  });
}

  // Delete an employee by ID
  deleteEmployee(id: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id) {
            message
          }
        }
      `,
      variables: {
        id: id
      }
    });
  }
}