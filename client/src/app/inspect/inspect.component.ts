import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsername(valueEmitted: string) {
    this.username = valueEmitted;
  }

  async onSubmit() {
    const userData = await this.userService.inspectUser(this.username); // binding the userData property to the returned result
    if (userData !== undefined) {
      this.userData = userData as User;
    } else {
      console.error("User data is undefined");
    }
    
  }
}
