import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Amplify } from 'aws-amplify';
import { AmplifyAuthenticatorModule } from '@aws-amplify/ui-angular';
import { getCurrentUser, FetchUserAttributesOutput, UserAttributeKey } from 'aws-amplify/auth';
import * as auth from 'aws-amplify/auth';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AmplifyAuthenticatorModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'amplify-app';
  user = currentAuthenticatedUser();
  attributes = auth.fetchUserAttributes();

}

async function currentAuthenticatedUser() {
  try {

    const user = await auth.getCurrentUser();

    console.log(user);

    const  userAttributes  = await auth.fetchUserAttributes();
    
    //let attributes: FetchUserAttributesOutput = userAttributes as FetchUserAttributesOutput;

    console.log(`The attributes: ${userAttributes['custom:tenant_id']}`);
    

    const { username, userId, signInDetails } = await getCurrentUser();

    console.log(`The username: ${username}`);
    console.log(`The userId: ${userId}`);
    console.log(`The signInDetails: ${signInDetails}`);
    console.log(`The email: ${userAttributes}`);
  } catch (err) {
    console.log(err);
  }
}