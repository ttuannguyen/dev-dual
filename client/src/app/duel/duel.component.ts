import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';


interface User {

}


@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  users: any[] = []


  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  async onSubmit() {

    try {
      const dualData = await this.userService.duelUsers(this.usernameOne, this.usernameTwo);
      if (Array.isArray(dualData)) {
      // Assuming dualData is an array of User objects
      this.users = dualData;
    } else {
      console.error("Invalid data received from server:", dualData);
    }
  } catch (error) {
    console.error("Error fetching duel data:", error);
  }

  console.log(this.users[0])

  }


  // async onSubmit() {
  //   const dualData = await this.userService.duelUsers(this.usernameOne, this.usernameTwo);
  //   this.users = dualData;
  // }
}
