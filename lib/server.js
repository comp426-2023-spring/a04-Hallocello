export {rps_function, rpsls_function}

//This first function will work for rock paper scissors only and throw an error for rpsls
function rps_function(player_attack){
	
	const options = ['rock', 'paper', 'scissors']; //Choices in rps
	const enemy_attack = options[Math.floor(Math.random() * options.length)]; //Randomly choose an option for the opponent

	//Give a random option if the player didn't choose anything
	if (player_attack == null){
		return {'player': options[Math.floor(Math.random() * options.length)]};
	}

	let message; //Initialize the return message to be blank
/*	
	//If the player gave something totally wrong, throw an error
	if(!hand.includes(player_attack)){
          console.log("Argument out of range!");
          console.error();
	}
*/	
	if (player_attack === enemy_attack){
		//In the case of a tie, the message will say "tie"
		message = "It's a tie";
	}
	else if ((player_attack === 'rock' && enemy_attack === 'scissors') ||
		(player_attack === 'scissors' && enemy_attack === 'paper') ||
		(player_attack === 'paper' && enemy_attack === 'rock')) {
			//In case of a victory, the message will be 'win
			message = 'You win';
	}
		else {
			//In all other cases, the player lost
			message = 'You lose';
	}
	
	//Return message
	return `You chose ${player_attack}, while the enemy chose ${enemy_attack}. ${message}`;
}

//rpsls will be very similar, just with a few added bits for lizard and spock
function rpsls_function(player_attack) {

    const options = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
    let message;

    if(player_attack == null){
      return{'player': options[Math.floor(Math.random() * options.length)]};
    }
    const opponent_attack = options[Math.floor(Math.random() * options.length)];
  /*  
    if(!hand.includes(player_attack)){
          console.log('Argument out of range!');
          console.error();
    }
    */
    if (player_attack === opponent_attack) {

        message = "It's a tie";
      } else if (
        (player_attack === 'rock' && (opponent_attack === 'scissors' || opponent_attack === "lizard")) ||
	(player_attack === 'paper' && (opponent_attack === 'rock' || opponent_attack === "spock")) ||
        (player_attack === 'scissors' && (opponent_attack === 'paper' || opponent_attack === "lizard")) ||
        (player_attack === "lizard" && (opponent_attack === "paper" || opponent_attack === "spock")) ||
        (player_attack === "spock" && (opponent_attack === "rock" || opponent_attack === "scissors"))
      ) {

        message = "You win";
      } else {

        message = "You lose";
      }

      return `You chose ${player_attack}, while the enemy chose ${opponent_attack}. ${message}`;
    } 
