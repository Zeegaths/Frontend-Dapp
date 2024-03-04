// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MovieLists {
    string private movieTitle;
    uint private releaseYear;

    constructor(string memory _title, uint _year) {
        movieTitle = _title;
        releaseYear = _year;
    }

    // Function to update the movie title
    function updateTitle(string memory newTitle) public {
        movieTitle = newTitle;
    }

    // Function to update the movie year
    function updateYear(uint newYear) public {
        releaseYear = newYear;
    }

    // Function to retrieve the movie title and release year
    function getMovieLists() public view returns (string memory _title, uint _year) {
        return (movieTitle, releaseYear);
    }
}
