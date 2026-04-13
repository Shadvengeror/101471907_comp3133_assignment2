import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apollo: Apollo) {}

  signup(data: any) {
    return this.apollo.mutate({
      mutation: gql`
        mutation Signup($username: String!, $email: String!, $password: String!) {
          signup(username: $username, email: $email, password: $password) {
            _id
            username
            email
          }
        }
      `,
      variables: {
        username: data.username,
        email: data.email,
        password: data.password
      }
    });
  }

  login(data: any) {
    return this.apollo.query({
      query: gql`
        query Login($username: String, $email: String, $password: String!) {
          login(username: $username, email: $email, password: $password) {
            token
            user {
              _id
              username
              email
            }
          }
        }
      `,
      variables: {
        username: data.username,
        password: data.password
      }
    });
  }
}