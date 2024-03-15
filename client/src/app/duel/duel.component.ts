import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/user.service';

interface User {
  username: string,
  name: string, 
  location: string,
  titles: string[],
  'favorite-language': string,
  'total-stars': number,
  'highest-starred': number,
  'public-repos': number,
  'perfect-repos': number,
  followers: number,
  following: number,
  bio: string,
  avatar_url: string
}

@Component({
  selector: 'app-duel',
  templateUrl: './duel.component.html',
  styleUrls: ['./duel.component.css']
})
export class DuelComponent implements OnInit {
  usernameOne: string = ""
  usernameTwo: string = ""
  users: User[] = []
  winner: string = ""

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  receiveUsernameOne(valueEmitted: string) {
    this.usernameOne = valueEmitted;
  }

  receiveUsernameTwo(valueEmitted: string) {
    this.usernameTwo = valueEmitted;
  }

  // determineWinner(dualData: User[]) {
  // }


  async onSubmit() {

    try {
      const dualData = await this.userService.duelUsers(this.usernameOne, this.usernameTwo);
      if (Array.isArray(dualData)) {
      // dualData is an array of User objects
      this.users = dualData;

      // determining the winner based on # of public repos
      const userOne = dualData.find(user => user.username === this.usernameOne);
      const userTwo = dualData.find(user => user.username === this.usernameTwo);


      if ((userOne['public-repos']) > userTwo['public-repos']) {
        this.winner = userOne.username;
        console.log(this.winner);
      } else if ((userTwo['public-repos']) > userOne['public-repos']) {
        this.winner = userTwo.username;
        console.log(this.winner);
      } else {
        console.log("It's a tie!")
      }

    } else {
      console.error("Invalid data received from server:", dualData);
    }
  } catch (error) {
    console.error("Error fetching duel data:", error);
  }


  }

}
