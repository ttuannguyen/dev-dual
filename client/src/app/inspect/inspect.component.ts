import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';
import { HttpErrorResponse } from '@angular/common/http';


interface User {
  username: string,
  name: string, 
  location: string,
  titles: string[],
  favLanguage: string,
  totalStars: number,
  highestStarCount: number,
  publicRepos: number,
  perfectRepos: number,
  followers: number,
  following: number,
  bio: string,
  avatarUrl: string
}

@Component({
  selector: 'app-inspect',
  templateUrl: './inspect.component.html',
  styleUrls: ['./inspect.component.css']
})
export class InspectComponent implements OnInit {

  username: string = ""
  // userData: any;
  userData!: User // had to use definite assignment assertion operator to resolve error (telling TS we're sure the property will be initialized before it's used)
  errorMessage: string = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  async onSubmit() {

    try {
      const userData = await this.userService.inspectUser(this.username); // binding the userData property to the returned result
      console.log(userData)
      if (userData !== undefined) {
        this.userData = userData as User;
        this.errorMessage = "";
      } else {
        console.error("User data is undefined");
      } 
    } catch (error) {
      // To access the messag property in the error object
      if (error instanceof HttpErrorResponse && error.error.message) {
        console.error(error.error.message);
      } else {
        console.error(error)
      }
      this.errorMessage = "Please ensure the username is provided and valid!"
    }

  }
}
