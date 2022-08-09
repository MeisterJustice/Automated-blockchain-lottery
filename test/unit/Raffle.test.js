const { assert, expect } = require("chai")
const { network, getNamedAccounts, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Raffle", async () => {
          let raffle, vrfCoordinatorV2Mock, raffleEntranceFee, deployer, interval
          const chainId = network.config.chainId

          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              raffle = await ethers.getContract("Raffle", deployer)
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock", deployer)
              raffleEntranceFee = await raffle.getEntranceFee()
              interval = await raffle.getInterval()
          })

          describe("constructor", async () => {
              it("initializes the raffle correctly", async () => {
                  const raffleState = await raffle.getRaffleState()
                  const interval = await raffle.getInterval()

                  assert.equal(raffleState.toString(), "0")
                  assert.equal(interval.toString(), networkConfig[chainId]["interval"])
              })
          })

          describe("Enter raffle", async () => {
              it("reverts when you don't pay enough", async () => {
                  await expect(raffle.enterRaffle()).to.be.revertedWith(
                      "Raffle__NotEnoughETHEntered"
                  )
              })
              it("records players when they enter", async () => {
                  await raffle.enterRaffle({ value: raffleEntranceFee })
                  const playerFromContract = await raffle.getPlayer(0)

                  assert.equal(playerFromContract, deployer)
              })
              it("emits event on enter", async () => {
                  await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.emit(
                      raffle,
                      "RaffleEnter"
                  )
              })
              //   it("doesn't allow entrance when raffle is calculating", async () => {
              //       await raffle.enterRaffle({ value: raffleEntranceFee })
              //       // for a documentation of the methods below, go here: https://hardhat.org/hardhat-network/reference
              //       await network.provider.send("evm_increaseTime", [interval.toNumber() + 1])
              //       await network.provider.request({ method: "evm_mine", params: [] })
              //       // we pretend to be a keeper for a second
              //       await raffle.performUpkeep([]) // changes the state to calculating for our comparison below
              //       await expect(raffle.enterRaffle({ value: raffleEntranceFee })).to.be.revertedWith(
              //           // is reverted as raffle is calculating
              //           "Raffle__RaffleNotOpen"
              //       )
              //   })
          })
      })
