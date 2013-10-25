// ## Towers of Hanoi
//
// Use divs to store three piles. Inside, use divs to store the discs.
//
// Write a `TowersUI` class. This should have a `#render` method that
// builds the DOM and displays the current game state.
//
// Your `TowersUI` class should install a click handler on the pile
// divs. On the first click to a pile, get the pile number and store this
// in an instance variable. On the second click (which you can identify
// by the ivar being set), perform the move. Reset the ivar after.
//
// After each move, call `render` to redraw the board.
//
// To improve UX, somehow highlight a pile so that it is clear which pile
// has been clicked first.
//
// Make sure to be toggling CSS classes throughout. All CSS should go in
// a `.css` file; don't do any CSS manipulation in JavaScript beside
// toggling classes.

$(function ()	{

	var hanoi_game = new Hanoi.Game();

	Hanoi.Game.prototype.run = function (callback)
		{
  		var game = this;
			var move_pegs = [];

			$("div.peg").on("click", function(event) {

				move_pegs.push($(event.currentTarget));
				if (move_pegs.length == 2) {
					var peg1 = $(move_pegs[0][0])
					var peg2 = $(move_pegs[1][0])

					move_pegs = [];
					moved = game.takeTurn(pegNo(peg1), pegNo(peg2));
					if (moved) {
	 					movePiece(peg1, peg2);
						console.log(game.towers[1].length)
	 				} else {
	 					alert("NO");
	 				}
					 if (game.isWon()) { alert("You win!") };
				}
			});

		}
	hanoi_game.run();
});

var pegNo = function (peg) {
	return peg.attr("data-id")[10]-1;
}

var movePiece = function (peg1, peg2) {
		disc_to_move = findTopDisc(peg1);
		to_place_on = findPutPlace(peg2);
		$(disc_to_move).remove()
		$(to_place_on).append(disc_to_move)
}

var findTopDisc = function (peg) {
	//Iterate through cells until we find a disc
	cells = peg.children();

	for (var i = 0; i < cells.length ; i++) {
		if ($(cells[i]).has("div").length > 0) {
			return $(cells[i]).children();
		}
	}
	return [];
}

var findPutPlace = function (peg) {
	//find hole
	cells = peg.children();
	for (var i = cells.length - 1; i >= 0 ; i--) {
		if ($(cells[i]).has("div").length === 0) {
			return $(cells[i]);
		}
	}

}
