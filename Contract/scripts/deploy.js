const hre = require("hardhat");

async function main() {
  const movieTitle = "Boss baby"
  const releaseYear = 2022

  const movieLists = await hre.ethers.deployContract("MovieLists", [
    movieTitle,
    releaseYear
  ])

  await movieLists.waitForDeployment();

  console.log(`MovieLists has been deployed to: ${movieLists.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
