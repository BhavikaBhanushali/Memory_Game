var cards_array = [
	"AS",
	"2S",
	"3S",
	"8S",
	"9S",
	"10S",
	"JS",
	"QS",
	"KS",
	"AS",
	"2S",
	"3S",
	"8S",
	"9S",
	"10S",
	"JS",
	"QS",
	"KS"
];
var card_values = [];
var cards_flipped = 0;
var card_ids = [];
var switchCount = 0;
var playerID = null;
var player1Score = 1;
var player2Score = 1;

//To shuffle the cards_array randomly...
//Fisher-Yates (aka Knuth) Shuffle
Array.prototype.cards_shuffle = function() {
	var currentCard = this.length,
		randomCard,
		tempCard;
	while (--currentCard > 0) {
		randomCard = Math.floor(Math.random() * (currentCard + 1));
		tempCard = this[randomCard];
		this[randomCard] = this[currentCard];
		this[currentCard] = tempCard;
	}
};

//To set up a new game...
function newGame() {
	cards_flipped = 0;
	var output = "";
	cards_array.cards_shuffle();
	for (var i = 0; i < cards_array.length; i++) {
		output +=
			'<div class="card col-md-6" id="card_' +
			i +
			'" onclick="flipCards(this,\'' +
			cards_array[i] +
			"')\"></div>";
	}

	document.getElementById("mainGame").innerHTML = output;
}

//To flip the cards...
//card_values array holds the values of 2 cards that are flipped. If they match, the player's score will be incremented by 1. If they don't match, next player can play...
function flipCards(card, val) {
	console.log("Hello");
	if (card.innerHTML === "" && card_values.length < 2) {
		card.style.background = "none";
		card.innerHTML = '<img class="card-img-top" src="images/' + val + '.png"/>';

		if (card_values.length === 0) {
			card_values.push(val);
			card_ids.push(card.id);
		} else if (card_values.length === 1) {
			card_values.push(val);
			card_ids.push(card.id);

			//If two cards match...
			if (card_values[0] === card_values[1]) {
				cards_flipped += 2;
				//Clear both value and id arrays...
				card_values = [];
				card_ids = [];

				//Increase count and switch player...
				switchCount++;

				setTimeout(currentPlayer, 500);

				//Increment player's score...
				if (playerID === 1) {
					$("#player1Score").html(player1Score++);
				} else {
					$("#player2Score").html(player2Score++);
				}

				//To check if all the cards are matched.If so, declare the Winner...
				if (cards_flipped === cards_array.length) {
					if (player1Score > player2Score) {
						//alert("Player1 Won!!!");
						swal(
							{
								title: "Congratulations !!!\n Player 1 Won !!!",
								imageUrl: "images/congrats.png",
								showCancelButton: true,
								confirmButtonClass: "btn btn-success",
								confirmButtonText: "Play Again",
								closeOnConfirm: false,
								closeOnCancel: true
							},
							function(isConfirm) {
								if (isConfirm) {
									window.location.reload(true);
								}
							}
						);
					} else {
						//alert("Player1 Won!!!");
						swal(
							{
								title: "Congratulations !!!\n Player 2 Won !!!",
								imageUrl: "images/congrats.png",
								showCancelButton: true,
								confirmButtonClass: "btn btn-success",
								confirmButtonText: "Play Again",
								closeOnConfirm: false,
								closeOnCancel: true
							},
							function(isConfirm) {
								if (isConfirm) {
									window.location.reload(true);
								}
							}
						);
					}

					document.getElementById("mainGame").innerHTML = "";
					switchCount = 0;
					newGame();
				}
			}

			//If cards don't match...
			else {
				function flipBack() {
					console.log("Flipback");
					//Flip both cards...
					var card_1 = document.getElementById(card_ids[0]);
					var card_2 = document.getElementById(card_ids[1]);

					card_1.style.background = "url(images/back.jpg) no-repeat";
					card_1.innerHTML = "";

					card_2.style.background = "url(images/back.jpg) no-repeat";
					card_2.innerHTML = "";
					//Clear both value and id arrays...
					card_values = [];
					card_ids = [];
				}
				setTimeout(flipBack, 500);

				//Increase count and switch player...
				switchCount++;

				setTimeout(currentPlayer, 500);
			}
		}
	}
}

//For active player...
var currentPlayer = function() {
	if (switchCount % 2 === 0) {
		playerID = 1;
		//Highlight player 1...
		$("#player1").css({
			"font-weight": "bold",
			textShadow: "3px 3px 0px #000000"
		});

		//Remove css from player 2...
		$("#player2").css({ "font-weight": "", textShadow: "" });
		console.log(playerID);
	} else {
		playerID = 2;
		//Highlight player 2...
		$("#player2").css({
			"font-weight": "bold",
			textShadow: "3px 3px 0px #000000"
		});

		//Remove css from player 1...
		$("#player1").css({ "font-weight": "", textShadow: "" });
		console.log(playerID);
	}
};

$("#playBtn").on("click", function() {
	//To set the players name entered by players...
	var firstPlayer = $("#player1Name").val();
	var secondPlayer = $("#player2Name").val();
	var score = 0;

	//To add players name in score-div...
	//If no input, set defaulr name as "Player 1" and "Player2"...
	if (!firstPlayer) {
		$("#player1").html("Player 1");
		$("#player1Score").html(score);
	} else {
		$("#player1").html(firstPlayer);
		$("#player1Score").html(score);
	}

	if (!secondPlayer) {
		$("#player2").html("Player 2");
		$("#player2Score").html(score);
	} else {
		$("#player2").html(secondPlayer);
		$("#player2Score").html(score);
	}

	//To clear the input values...
	$("#player1").val("");
	$("#player2").val("");

	//To hide the PLAY NOW button...
	$("#playNow").hide();

	//To highlight the player1 when game starts...
	$("#player1").css({
		"font-weight": "bold",
		textShadow: "3px 3px 0px #000000"
	});

	//To start game onclick of Let's Play...
	newGame();
});

//Reset button...
$("#reset").on("click", function() {
	switchCount = 0;
	$("#player1Score").html("&nbsp");
	$("#player2Score").html("&nbsp");
	$("#player1").html("&nbsp");
	$("#player2").html("&nbsp");
	player1Score = 1;
	player2Score = 1;
	$("#playNow").show();
	$("#mainGame").html(null);
});
